package com.springboot.board.post.service;

import com.springboot.board.post.dto.PostLikeDto;
import com.springboot.board.post.entity.Post;
import com.springboot.board.post.entity.PostLike;
import com.springboot.board.post.mapper.PostLikeMapper;
import com.springboot.board.post.repository.PostLikeRepository;
import com.springboot.board.post.repository.PostRepository;
import com.springboot.member.entity.Member;
import com.springboot.member.service.MemberService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PostLikeService {
    private final PostService postService;
    private final MemberService memberService;
    private final PostLikeRepository postLikeRepository;
    private final PostLikeMapper postLikeMapper;
    private final PostRepository postRepository;

    public PostLikeService(PostService postService,
                           MemberService memberService,
                           PostLikeRepository postLikeRepository,
                           PostLikeMapper postLikeMapper,
                           PostRepository postRepository) {
        this.postService = postService;
        this.memberService = memberService;
        this.postLikeRepository = postLikeRepository;
        this.postLikeMapper = postLikeMapper;
        this.postRepository = postRepository;
    }


    public void checkLike(PostLikeDto.Post likeDto) {
        Post post = postService.findVerifiedPost(likeDto.getPostId());
        Member member = memberService.findVerifiedMember(likeDto.getMemberId());
        Optional<PostLike> optionalPostLike = postLikeRepository.findAllByMemberAndPost(member, post);

        if (optionalPostLike.isPresent()) {
            PostLike existLike = optionalPostLike.get();
            postLikeRepository.deleteById(existLike.getPostLikeId());
            post.setLikeCount(post.getLikeCount() -1);
        }

        else {
            PostLike postLike = postLikeMapper.postLikePostDtoToPostLike(likeDto);
            postLikeRepository.save(postLike);
            post.setLikeCount(post.getLikeCount() +1);
        }
        postRepository.save(post);
    }
}
