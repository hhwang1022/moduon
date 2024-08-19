package com.springboot.board.photo.repository;

import com.springboot.board.photo.entity.Photo;
import com.springboot.board.post.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PhotoRepository extends JpaRepository<Photo, Long> {

    @Query("SELECT ph FROM Photo ph WHERE (ph.title LIKE %:keyword% OR ph.body LIKE %:keyword%) AND ph.category = :category")
    Page<Photo> searchByTitleOrBodyAndCategory(Pageable pageable, @Param("keyword") String keyword, @Param("category")Photo.Category category);


}
