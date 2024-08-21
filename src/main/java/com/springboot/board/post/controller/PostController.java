package com.springboot.board.post.controller;

import com.springboot.board.post.dto.PostDto;
import com.springboot.board.post.entity.Post;
import com.springboot.board.post.mapper.PostMapper;
import com.springboot.board.post.service.PostService;
import com.springboot.dto.MultiResponseDto;
import com.springboot.dto.SingleResponseDto;
import com.springboot.utils.UriCreator;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/posts")
public class PostController {
    private final static String POST_DEFAULT_URL = "/posts";
    private final PostService postService;
    private final PostMapper mapper;

    public PostController(PostService postService,
                          PostMapper mapper) {
        this.postService = postService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postPost(@Valid @RequestBody PostDto.Post requestBody) throws IllegalAccessException {
        Post post = mapper.postPostDtoToPost(requestBody);
        Post creatPost = postService.createPost(post);
        URI location = UriCreator.createUri(POST_DEFAULT_URL, creatPost.getPostId());
        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{post-id}")
    public ResponseEntity patchPost(@PathVariable("post-id") @Positive long postId,
                                    @Valid @RequestBody PostDto.Patch requestBody) {

        requestBody.setPostId(postId);
        Post post = postService.updatePost(mapper.postPatchDtoToPost(requestBody));
        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.postToPostResponseDto(post)), HttpStatus.OK);
    }

    @GetMapping("/{post-id}")
    public ResponseEntity getPost(@PathVariable("post-id") @Positive long postId) {
        Post post = postService.findPost(postId);
        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.postToPostResponseDto(post)), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getPosts(@Positive @RequestParam int page, @Positive @RequestParam int size,
                                   @RequestParam String sort,
                                   @RequestParam String category) {
        Sort sortOrder = Sort.by(sort.split("_")[0]).ascending();
        if (sort.split("_")[1].equalsIgnoreCase("desc")) {
            sortOrder = sortOrder.descending();
        }

        Post.Category postCategory;
        try {
            postCategory = Post.Category.valueOf(category);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity(" 유효하지 않은 카테고리입니다.", HttpStatus.BAD_REQUEST);
        }

        Page<Post> pagePost = postService.findPostsSort(page - 1, size, sortOrder, postCategory);
        List<Post> posts = pagePost.getContent();
        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.postsToPostResponseDtos(posts), pagePost), HttpStatus.OK);
    }

    @GetMapping("/popular")
    public ResponseEntity getPopularPosts(@Positive @RequestParam int page, @Positive @RequestParam int size) {
        Page<Post> pagePost = postService.findPopularPosts(page - 1, size);
        List<Post> posts = pagePost.getContent();
        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.postsToPostResponseDtos(posts), pagePost), HttpStatus.OK
        );
    }


    @GetMapping("/search")
    public ResponseEntity search (@RequestParam String keyword,
                          Model model,
                          @PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable pageable,
                          @RequestParam String category) {
        // 카테고리를 enum으로 변환
        Post.Category postCategory;
        try {
            postCategory = Post.Category.valueOf(category);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>("Invalid category provided", HttpStatus.BAD_REQUEST);
        }
        Page<Post> searchList = postService.search(pageable, keyword, postCategory);
        List<PostDto.Response> responsesList = searchList.stream()
                .map(mapper::postToPostResponseDto)
                .collect(Collectors.toList());
        return new ResponseEntity<>(new MultiResponseDto<>(responsesList, searchList), HttpStatus.OK);
    }

    @DeleteMapping("/{post-id}")
    public ResponseEntity deletePost(@PathVariable("post-id") @Positive long postId) {
        postService.deletePost(postId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
