package com.springboot.board.post.service;

import com.springboot.board.post.entity.Post;
import com.springboot.board.post.entity.PostReply;
import com.springboot.board.post.repository.PostReplyRepository;
import com.springboot.exception.BusinessLogicException;
import com.springboot.exception.ExceptionCode;
import com.springboot.member.entity.Member;
import com.springboot.member.service.MemberService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Transactional
@Service
public class PostReplyService {
    private final PostService postService;
    private final MemberService memberService;
    private final PostReplyRepository postReplyRepository;

    public PostReplyService(PostService postService,
                            MemberService memberService,
                            PostReplyRepository postReplyRepository) {
        this.postService = postService;
        this.memberService = memberService;
        this.postReplyRepository = postReplyRepository;
    }

    public PostReply createPostReply(PostReply postReply) throws IllegalAccessException {
        Post post = postService.findVerifiedPost(postReply.getPost().getPostId());
        Member member = memberService.findVerifiedMember(postReply.getMember().getEmail());
//        if (member.getMemberGeneration() == Member.Generation.GENERATION_8090) {
//            if (post.getCategory() != Post.Category.CATEGORY_8090 &&
//                    post.getCategory() != Post.Category.CATEGORY_9000) {
//                throw new IllegalAccessException("8090세대 회원은 8090 또는 9000 카테고리의 게시물에만 댓글을 작성할 수 있습니다.");
//            }
//        } else if (member.getMemberGeneration() == Member.Generation.GENERATION_9000) {
//            if (post.getCategory() == Post.Category.CATEGORY_1020) {
//                throw new IllegalAccessException("9000세대 회원은 8090,9000,0010 카테고리의 게시물에만 댓글을 작성할 수 있습니다.");
//            }
//        } else if (member.getMemberGeneration() == Member.Generation.GENERATION_0010) {
//            if (post.getCategory() == Post.Category.CATEGORY_8090) {
//                throw new IllegalAccessException("0010세대 회원은 9000,0010,1020 카테고리의 게시물에만 댓글을 작성할 수 있습니다.");
//
//            }
//        } else {
//            if (post.getCategory() != Post.Category.CATEGORY_0010 &&
//                    post.getCategory() != Post.Category.CATEGORY_1020) {
//                throw new IllegalAccessException("1020세대 회원은 0010 또는 1020 카테고리의 게시물에만 댓글을 작성할 수 있습니다. ");
//            }
//        }

        Map<Member.Generation, List<Post.Category>> allowCategoriesMap = Map.of(
                Member.Generation.GENERATION_8090, List.of(Post.Category.CATEGORY_8090, Post.Category.CATEGORY_9000),
                Member.Generation.GENERATION_9000, List.of(Post.Category.CATEGORY_8090, Post.Category.CATEGORY_9000, Post.Category.CATEGORY_0010),
                Member.Generation.GENERATION_0010, List.of(Post.Category.CATEGORY_9000, Post.Category.CATEGORY_0010, Post.Category.CATEGORY_1020),
                Member.Generation.GENERATION_1020, List.of(Post.Category.CATEGORY_0010, Post.Category.CATEGORY_1020)
        );

        List<Post.Category> allowCategories = allowCategoriesMap.get(member.getMemberGeneration());

        if (!allowCategories.contains(post.getCategory())) {
            throw new IllegalAccessException(
                    String.format("%s세대 회원은 %s카테고리의 게시물에만 댓글을 작성할 수 있습니다.",
                            member.getMemberGeneration().getGeneration(),
                            allowCategories.stream().map(Enum::name).collect(Collectors.joining(","))));
        }

        postReply.setPost(post);
        postReply.setMember(member);

        return postReplyRepository.save(postReply);
    }

    public PostReply updatePostReply(PostReply postReply) {
        PostReply findPostReply = findVerifiedPostReply(postReply.getPostReplyId());
        memberService.findVerifiedMember(postReply.getMember().getEmail());
        Optional.ofNullable(postReply.getBody())
                .ifPresent(body -> findPostReply.setBody(body));
        return postReplyRepository.save(findPostReply);
    }

    public Page<PostReply> findPostReplies(int page, int size) {
        return postReplyRepository.findAll(PageRequest.of(page, size, Sort.by("postReplyId").descending()));
    }

    public void deletePostReply(long postReplyId) {
        PostReply findPostReply = findVerifiedPostReply(postReplyId);
        postReplyRepository.delete(findPostReply);
    }

    public PostReply findVerifiedPostReply(long postReplyId) {
        Optional<PostReply> optionalPostReply = postReplyRepository.findById(postReplyId);
        PostReply findPostReply = optionalPostReply.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.POST_REPLY_NOT_FOUND));
        return findPostReply;
    }
}
