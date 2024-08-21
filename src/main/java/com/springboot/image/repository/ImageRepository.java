package com.springboot.image.repository;

import com.springboot.image.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImageRepository extends JpaRepository<Image, Long> {
    //해당 포스트의 모든 그림
    List<Image> findAllByPostId(long postid);
}
