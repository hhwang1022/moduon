package com.springboot.board.post.mapper;

import com.springboot.board.post.dto.PostLikeDto;
import com.springboot.board.post.entity.PostLike;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PostLikeMapper {

    @Mapping(source = "memberId", target = "member.memberId")
    PostLike postLikePostDtoToPostLike(PostLikeDto.Post requestBody);
}
