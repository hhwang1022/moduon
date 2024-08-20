package com.springboot.board.photo.mapper;

import com.springboot.board.photo.dto.PhotoDto;
import com.springboot.board.photo.dto.PhotoLikeDto;
import com.springboot.board.photo.entity.PhotoLike;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PhotoLikeMapper {

    @Mapping(source = "memberId", target = "member.memberId")
    PhotoLike photoLikePostDtoToPhotoLike(PhotoLikeDto.Post requestBody);

}
