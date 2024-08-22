package com.springboot.board.post.mapper;

import com.springboot.board.post.dto.PostDto;
import com.springboot.board.post.entity.Post;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring", uses = {PostReplyMapper.class})
public interface PostMapper {

    @Mapping(source = "memberEmail", target = "member.email")
    Post postPostDtoToPost(PostDto.Post requestBody);

    @Mapping(source = "memberEmail", target = "member.email")
    Post postPatchDtoToPost(PostDto.Patch requestBody);

    @Mapping(source = "member.memberId", target = "memberId")
    @Mapping(source = "member.nickname", target = "nickname")
    @Mapping(target = "postReplyList", qualifiedByName = "postReplyToPostReplyResponse")
    PostDto.Response postToPostResponseDto(Post post);

    List<PostDto.Response> postsToPostResponseDtos(List<Post> posts);
}
