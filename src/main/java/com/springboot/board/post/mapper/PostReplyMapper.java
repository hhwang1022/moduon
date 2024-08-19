package com.springboot.board.post.mapper;

import com.springboot.board.post.dto.PostLikeDto;
import com.springboot.board.post.dto.PostReplyDto;
import com.springboot.board.post.entity.PostReply;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PostReplyMapper {

    @Mapping(source = "memberId", target = "member.memberId")
    @Mapping(source = "postId", target = "post.postId")
    PostReply postReplyPostDtoToPostReply(PostReplyDto.Post requestBody);

    PostReply postReplyPatchDtoToPostReply(PostReplyDto.Patch requestBody);

    @Mapping(source = "member.memberId", target = "memberId")
    @Mapping(source = "post.postId", target = "postId")
    PostReplyDto.Response postReplyToPostReplyResponseDto(PostReply postReply);

    List<PostReplyDto.Response> postRepliesToPostReplyResponseDtos(List<PostReply> postReplies);
}