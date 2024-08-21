package com.springboot.board.balancegame.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

public class BalanceGameVoteDto {
    @Getter
    @AllArgsConstructor
    public static class Post {
        private Long memberId;

        private Long balanceGameId;

        private String voteItem;
    }
}
