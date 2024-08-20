package com.springboot.board.post.repository;

import com.springboot.board.post.entity.Post;
import com.springboot.board.post.entity.PostLike;
import com.springboot.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {
   // Page<Post> findByTitleContainingOrBodyContainingAndCategory(Pageable pageable, String titleKeyword, String bodyKeyword, Post.Category category);

    //    Optional<PostLike> findAllByMemberAndPost(Member member, Post post);
    Page<Post> findByCategory(Pageable pageable, Post.Category category);

    @Query("SELECT p FROM Post p WHERE (p.title LIKE %:keyword% OR p.body LIKE %:keyword%) AND p.category = :category")
    Page<Post> searchByTitleOrBodyAndCategory(Pageable pageable, @Param("keyword") String keyword, @Param("category") Post.Category category);


}
