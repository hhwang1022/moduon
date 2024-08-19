package com.springboot.board.photo.mapper;

import com.springboot.board.photo.dto.PhotoLikeDto;
import com.springboot.board.photo.dto.PhotoReplyDto;
import com.springboot.board.photo.entity.PhotoReply;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PhotoReplyMapper {

    @Mapping(source = "memberId", target = "member.memberId")
    @Mapping(source = "photoId", target = "photo.photoId")
    PhotoReply photoReplyPostDtoToPhotoReply(PhotoReplyDto.Post requestBody);

    PhotoReply photoReplyPatchDtoToPhotoReply(PhotoReplyDto.Patch requestBody);

    @Mapping(source = "member.memberId", target = "memberId")
    @Mapping(source = "photo.photoId", target = "photoId")
    PhotoReplyDto.Response photoReplyToPhotoReplyResponseDto(PhotoReply photoReply);

    List<PhotoReplyDto.Response> photoReplyToPhotoReplyResponseDtos(List<PhotoReply> photoReplies);
}
