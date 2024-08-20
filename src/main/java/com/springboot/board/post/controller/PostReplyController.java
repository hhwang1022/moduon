package com.springboot.board.post.controller;

import com.springboot.board.post.dto.PostReplyDto;
import com.springboot.board.post.entity.Post;
import com.springboot.board.post.entity.PostReply;
import com.springboot.board.post.mapper.PostReplyMapper;
import com.springboot.board.post.service.PostReplyService;
import com.springboot.board.post.service.PostService;
import com.springboot.dto.MultiResponseDto;
import com.springboot.dto.SingleResponseDto;
import com.springboot.utils.UriCreator;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.print.DocFlavor;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/posts/{post-id}/reply")
public class PostReplyController {
    private final static String POST_REPLY_DEFAULT_URL = "/posts/{post-id}/reply";
    private final PostReplyService postReplyService;
    private final PostService postService;
    private final PostReplyMapper mapper;

    public PostReplyController(PostReplyService postReplyService,
                               PostService postService,
                               PostReplyMapper mapper) {
        this.postReplyService = postReplyService;
        this.postService = postService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postPostReply(@PathVariable("post-id") @Positive long postId,
                                        @Valid @RequestBody PostReplyDto.Post requestBody) throws IllegalAccessException {
        PostReply postReply = mapper.postReplyPostDtoToPostReply(requestBody);

        Post post = postService.findPostById(postId);
        postReply.setPost(post);

        PostReply createPostReply = postReplyService.createPostReply(postReply);

        URI location = UriCreator.createUri(POST_REPLY_DEFAULT_URL.replace("{post-id}", String.valueOf(postId)), createPostReply.getPostReplyId());
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

    @GetMapping
    public ResponseEntity getPostReplies(@Positive @RequestParam int page, @Positive @RequestParam int size) {
        Page<PostReply> pagePostReplies = postReplyService.findPostReplies(page - 1, size);
        List<PostReply> postReplies = pagePostReplies.getContent();
        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.postRepliesToPostReplyResponseDtos(postReplies), pagePostReplies), HttpStatus.OK);
    }
}
