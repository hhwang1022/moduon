package com.springboot.board.post.controller;

import com.springboot.board.photo.dto.PhotoReplyDto;
import com.springboot.board.post.dto.PostLikeDto;
import com.springboot.board.post.entity.PostLike;
import com.springboot.board.post.mapper.PostLikeMapper;
import com.springboot.board.post.service.PostLikeService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

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
    public ResponseEntity PostLike(@PathVariable("post-id") @Positive long postId,
                                   @AuthenticationPrincipal Object principal) {

        postLikeService.checkLike(principal.toString(), postId);
        return ResponseEntity.ok().build();

    }
}
