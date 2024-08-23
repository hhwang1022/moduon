package com.springboot.board.photo.controller;

import com.springboot.board.photo.dto.PhotoLikeDto;
import com.springboot.board.photo.entity.PhotoLike;
import com.springboot.board.photo.mapper.PhotoLikeMapper;
import com.springboot.board.photo.mapper.PhotoMapper;
import com.springboot.board.photo.service.PhotoLikeService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/photos/{photo-id}/like")
@Validated
public class PhotoLikeController {
    private final PhotoLikeService photoLikeService;
    private final PhotoLikeMapper mapper;

    public PhotoLikeController(PhotoLikeService photoLikeService,
                               PhotoLikeMapper mapper) {
        this.photoLikeService = photoLikeService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postPhotoLike(@PathVariable("photo-id") @Positive long photoId,
                                        @AuthenticationPrincipal Object principal) {
        photoLikeService.checkLike(principal.toString(), photoId);
        return ResponseEntity.ok().build();
    }
}
