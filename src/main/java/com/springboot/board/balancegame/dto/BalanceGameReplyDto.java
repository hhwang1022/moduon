package com.springboot.board.balancegame.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

public class BalanceGameReplyDto {
    @Getter
    @AllArgsConstructor
    public static class Post {
        @NotBlank
        private Long memberId;

        @NotBlank
        private Long balanceGameId;

        @NotBlank
        private String body;
    }

    @Getter
    @AllArgsConstructor
    public static class Patch {
        private Long memberId;
        @Setter
        private Long balanceGameReplyId;
        private String body;
    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private Long memberId;
        private Long balanceGameReplyId;
        private String body;
    }
}
