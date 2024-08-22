package com.springboot.board.balancegame.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

public class BalanceGameVoteDto {
    @Getter
    @AllArgsConstructor
    public static class Post {
        @Setter
        private String memberEmail;
        @Setter
        private Long balanceGameId;

        private String voteItem;
    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private String memberNickname;
        private Long balanceGameId;
        private String voteItem;
    }
}
