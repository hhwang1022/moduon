package com.springboot.board.post.controller;

import com.springboot.board.post.dto.PostReplyDto;
import com.springboot.board.post.entity.PostReply;
import com.springboot.board.post.mapper.PostReplyMapper;
import com.springboot.board.post.service.PostReplyService;
import com.springboot.dto.SingleResponseDto;
import com.springboot.utils.UriCreator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.print.DocFlavor;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;

@RestController
@RequestMapping("/posts/{post-id}/reply")
public class PostReplyController {
    private final static String POST_REPLY_DEFAULT_URL = "/reply";
    private final PostReplyService postReplyService;
    private final PostReplyMapper mapper;

    public PostReplyController(PostReplyService postReplyService,
                               PostReplyMapper mapper) {
        this.postReplyService = postReplyService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postPostReply(@Valid @RequestBody PostReplyDto.Post requestBody) throws IllegalAccessException {
        PostReply postReply = mapper.postReplyPostDtoToPostReply(requestBody);
        PostReply createPostReply = postReplyService.createPostReply(postReply);
        URI location = UriCreator.createUri(POST_REPLY_DEFAULT_URL, createPostReply.getPostReplyId());
        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{reply-id}")
    public ResponseEntity patchPostReply(@PathVariable("reply-id") @Positive long postReplyId,
                                         @Valid @RequestBody PostReplyDto.Patch requestBody) {
        requestBody.setPostReply(postReplyId);
        PostReply updatePostReply = mapper.postReplyPatchDtoToPostReply(requestBody);
        PostReply postReply = postReplyService.updatePostReply(updatePostReply);
        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.postReplyToPostReplyResponseDto(postReply)), HttpStatus.OK);
    }

    @DeleteMapping("/{reply-id}")
    public ResponseEntity deletePostReply(@PathVariable("reply-id") @Positive long postReplyId) {
        postReplyService.deletePostReply(postReplyId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
