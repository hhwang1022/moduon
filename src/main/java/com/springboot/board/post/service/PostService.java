package com.springboot.board.post.service;

import com.springboot.board.post.entity.Post;
import com.springboot.board.post.repository.PostRepository;
import com.springboot.exception.BusinessLogicException;
import com.springboot.exception.ExceptionCode;
import com.springboot.member.entity.Member;
import com.springboot.member.service.MemberService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.swing.plaf.PanelUI;
import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Transactional
@Service
public class PostService {
    private final PostRepository postRepository;
    private final MemberService memberService;

    public PostService(PostRepository postRepository,
                       MemberService memberService) {
        this.postRepository = postRepository;
        this.memberService = memberService;
    }


    public Post createPost(Post post) throws IllegalAccessException {
       Member member = memberService.findVerifiedMember(post.getMember().getEmail());
       post.setMember(member);

        Map<Member.Generation, List<Post.Category>> allowCategoriesMap = Map.of(
                Member.Generation.GENERATION_8090, List.of(Post.Category.CATEGORY_8090, Post.Category.CATEGORY_9000),
                Member.Generation.GENERATION_9000, List.of(Post.Category.CATEGORY_8090, Post.Category.CATEGORY_9000, Post.Category.CATEGORY_0010),
                Member.Generation.GENERATION_0010, List.of(Post.Category.CATEGORY_9000, Post.Category.CATEGORY_0010, Post.Category.CATEGORY_1020),
                Member.Generation.GENERATION_1020, List.of(Post.Category.CATEGORY_0010, Post.Category.CATEGORY_1020)
        );

        List<Post.Category> allowCategories = allowCategoriesMap.get(member.getMemberGeneration());

        if (!allowCategories.contains(post.getCategory())) {
            throw new IllegalAccessException(
                    String.format("%세대 회원은 %s카테고리만 글쓰기가 가능합니다.",
                            member.getMemberGeneration().getGeneration(), allowCategories.stream()
                                    .map(Enum::name)
                                    .collect(Collectors.joining(",")))
            );
        }
        return postRepository.save(post);
    }

    public Post updatePost(Post post) {
        Post findPost = findVerifiedPost(post.getPostId());
        memberService.findVerifiedMember(post.getMember().getEmail());

        Optional.ofNullable(post.getTitle())
                .ifPresent(title -> findPost.setTitle(title));
        Optional.ofNullable(post.getBody())
                .ifPresent(body -> findPost.setBody(body));
        Optional.ofNullable(post.getIsNotice())
                .ifPresent(isNotice -> findPost.setIsNotice(isNotice));
        Optional.ofNullable(post.getCategory())
                .ifPresent(category -> findPost.setCategory(category));
        Optional.ofNullable(post.getImage1())
                .ifPresent(image1 -> findPost.setImage1(image1));
        Optional.ofNullable(post.getImage2())
                .ifPresent(image2 -> findPost.setImage2(image2));
        Optional.ofNullable(post.getImage3())
                .ifPresent(image3 -> findPost.setImage3(image3));
        Optional.ofNullable(post.getImage4())
                .ifPresent(image4 -> findPost.setImage4(image4));
        Optional.ofNullable(post.getImage5())
                .ifPresent(image5 -> findPost.setImage5(image5));


        return postRepository.save(findPost);
    }

    public Post findPost(long postId) {
        Post findPost = findVerifiedPost(postId);
        findPost.setView(findPost.getView() + 1);
        return findPost;
    }

    public Page<Post> findPopularPosts(int page, int size) {
        return postRepository.findAll(PageRequest.of(page, size,
                Sort.by("likeCount").descending()));
    }

    public Page<Post> findPostsSort(int page, int size, Sort sort, Post.Category category) {
        Pageable pageable = PageRequest.of(page, size, sort);
        return postRepository.findByCategory(pageable, category);
    }

    public Page<Post> search(Pageable pageable, String keyword, Post.Category category) {
        Page<Post> postsList = postRepository.searchByTitleOrBodyAndCategory(pageable, keyword, category);
        return postsList;
    }

    public void deletePost(long postId, String email) {
        Post findPost = findVerifiedPost(postId);

        if (findPost.getMember().getEmail().equals(email)) {
            postRepository.delete(findPost);
        } else {
            throw new BusinessLogicException(ExceptionCode.POST_NOT_FOUND);
        }
    }

    public Post findVerifiedPost(long postId) {
        Optional<Post> optionalPost = postRepository.findById(postId);
        Post findPost = optionalPost.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));
        return findPost;
    }

    public Post findPostById(long postId) {
        return postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Post not found for id : " + postId));
    }
}
