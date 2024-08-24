package com.springboot.board.photo.repository;

import com.springboot.board.photo.entity.Photo;
import com.springboot.board.photo.entity.PhotoLike;
import com.springboot.board.post.entity.PostLike;
import com.springboot.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PhotoLikeRepository extends JpaRepository<PhotoLike, Long> {
    Optional<PhotoLike> findAllByMemberAndPhoto(Member member, Photo photo);
    Optional<PhotoLike> findPhotoLikeByMemberEmailAndPhotoPhotoId(String memberEmail, Long photoId);
}
