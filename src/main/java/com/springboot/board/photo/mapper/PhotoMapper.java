package com.springboot.board.photo.mapper;

import com.springboot.board.photo.dto.PhotoDto;
import com.springboot.board.photo.entity.Photo;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring", uses = {PhotoReplyMapper.class})
public interface PhotoMapper {

    @Mapping(source = "memberId", target = "member.memberId")
    Photo photoPostDtoToPhoto(PhotoDto.Post requestBody);

    Photo photoPatchDtoToPhoto(PhotoDto.Patch requestBody);

    @Mapping(source = "member.memberId", target = "memberId")
    @Mapping(target = "photoReplyList", qualifiedByName = "photoReplyToPhotoReplyResponse")
    PhotoDto.Response photoToPhotoResponseDto(Photo photo);

    List<PhotoDto.Response> photosToPhotoResponseDtos(List<Photo> photos);
}
