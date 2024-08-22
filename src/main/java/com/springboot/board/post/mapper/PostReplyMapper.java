package com.springboot.board.post.mapper;

import com.springboot.board.post.dto.PostLikeDto;
import com.springboot.board.post.dto.PostReplyDto;
import com.springboot.board.post.entity.PostReply;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PostReplyMapper {

    @Mapping(source = "memberEmail", target = "member.email")
    PostReply postReplyPostDtoToPostReply(PostReplyDto.Post requestBody);

    @Mapping(source = "memberEmail", target = "member.email")
    PostReply postReplyPatchDtoToPostReply(PostReplyDto.Patch requestBody);

    @Mapping(source = "member.memberId", target = "memberId")
    @Mapping(source = "post.postId", target = "postId")
    @Mapping(source = "member.nickname", target = "memberNickname")
    PostReplyDto.Response postReplyToPostReplyResponseDto(PostReply postReply);

    @Named("postReplyToPostReplyResponse")
    List<PostReplyDto.Response> postRepliesToPostReplyResponseDtos(List<PostReply> postReplies);
}
