package com.springboot.board.photo.controller;

import com.springboot.board.photo.dto.PhotoLikeDto;
import com.springboot.board.photo.entity.PhotoLike;
import com.springboot.board.photo.mapper.PhotoLikeMapper;
import com.springboot.board.photo.mapper.PhotoMapper;
import com.springboot.board.photo.service.PhotoLikeService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

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
    public void postPhotoLike(@Valid @RequestBody PhotoLikeDto.Post requestBody) {
        PhotoLike photoLike = mapper.photoLikePostDtoToPhotoLike(requestBody);
        photoLikeService.checkLike(requestBody);
    }
}
