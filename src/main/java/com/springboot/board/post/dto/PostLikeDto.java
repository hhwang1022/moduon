package com.springboot.board.post.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class PostLikeDto {
    @Getter
    @AllArgsConstructor
    public static class Post{
        private long memberId;
        private long postId;
    }
}
