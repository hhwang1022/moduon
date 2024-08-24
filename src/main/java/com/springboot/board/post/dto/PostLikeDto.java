package com.springboot.board.post.dto;

import com.springboot.dto.SingleResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashMap;
import java.util.Map;

public class PostLikeDto {
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Post{
        private long memberId;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Response {
        private Map<String, Boolean> data;

        public Response(Boolean isLike) {
            this.data = new HashMap<>();
            this.data.put("isLike", isLike);
        }

        public Map<String, Boolean> getData() {
            return data;
        }
    }
}
