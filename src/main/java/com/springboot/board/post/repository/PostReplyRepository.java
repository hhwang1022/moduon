package com.springboot.board.post.repository;

import com.springboot.board.post.entity.PostReply;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostReplyRepository extends JpaRepository<PostReply, Long> {
}
