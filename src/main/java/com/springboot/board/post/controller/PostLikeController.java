package com.springboot.board.post.controller;

import com.springboot.board.post.dto.PostLikeDto;
import com.springboot.board.post.entity.PostLike;
import com.springboot.board.post.mapper.PostLikeMapper;
import com.springboot.board.post.service.PostLikeService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/posts/{post-id}/like")
@Validated
public class PostLikeController {
    private final PostLikeService postLikeService;
    private final PostLikeMapper mapper;

    public PostLikeController(PostLikeService postLikeService,
                              PostLikeMapper mapper) {
        this.postLikeService = postLikeService;
        this.mapper = mapper;
    }

    @PostMapping
    public void PostLike(@Valid @RequestBody PostLikeDto.Post requestBody) {
        PostLike postLike = mapper.postLikePostDtoToPostLike(requestBody);
        postLikeService.checkLike(requestBody);

    }
}
