package com.springboot.board.balancegame.dto;

import com.springboot.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

public class BalanceGameReplyDto {
    @Getter
    @AllArgsConstructor
    public static class Post {
        @Setter
        private String memberEmail;

        @Setter
        private Long balanceGameId;

        @NotBlank
        private String body;
    }

    @Getter
    @AllArgsConstructor
    public static class Patch {
        @Setter
        private String memberEmail;
        @Setter
        private Long balanceGameReplyId;

        @Setter
        private Long balanceGameId;

        private String body;
    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private long memberId;
        private long balanceGameReplyId;
        private String body;
    }
}
