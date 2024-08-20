package com.springboot.board.balancegame.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

public class BalanceGameVoteDto {
    @Getter
    @AllArgsConstructor
    public static class Post {
        @NotBlank
        private Long memberId;

        @NotBlank
        private Long balanceGameId;

        @NotBlank
        private String voteItem;
    }
}
