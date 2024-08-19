package com.springboot.board.post.repository;

import com.springboot.board.post.entity.Post;
import com.springboot.board.post.entity.PostLike;
import com.springboot.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PostLikeRepository extends JpaRepository<PostLike, Long> {
    Optional<PostLike> findAllByMemberAndPost(Member member, Post post);
}
