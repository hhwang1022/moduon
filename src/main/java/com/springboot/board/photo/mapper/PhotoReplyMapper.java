package com.springboot.board.photo.mapper;

import com.springboot.board.photo.dto.PhotoLikeDto;
import com.springboot.board.photo.dto.PhotoReplyDto;
import com.springboot.board.photo.entity.PhotoReply;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PhotoReplyMapper {

    @Mapping(source = "memberEmail", target = "member.email")
    PhotoReply photoReplyPostDtoToPhotoReply(PhotoReplyDto.Post requestBody);

    @Mapping(source = "memberEmail", target = "member.email")
    PhotoReply photoReplyPatchDtoToPhotoReply(PhotoReplyDto.Patch requestBody);

    @Mapping(source = "member.nickname", target = "memberNickname")
    @Mapping(source = "photo.photoId", target = "photoId")
    PhotoReplyDto.Response photoReplyToPhotoReplyResponseDto(PhotoReply photoReply);

    @Named("photoReplyToPhotoReplyResponse")
    List<PhotoReplyDto.Response> photoReplyToPhotoReplyResponseDtos(List<PhotoReply> photoReplies);
}
