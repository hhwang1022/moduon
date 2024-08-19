package com.springboot.board.post.mapper;

import com.springboot.board.post.dto.PostDto;
import com.springboot.board.post.entity.Post;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PostMapper {

    @Mapping(source = "memberId", target = "member.memberId")
    Post postPostDtoToPost(PostDto.Post requestBody);

    Post postPatchDtoToPost(PostDto.Patch requestBody);

    @Mapping(source = "member.memberId", target = "memberId")
    PostDto.Response postToPostResponseDto(Post post);

    List<PostDto.Response> postsToPostResponseDtos(List<Post> posts);
}
