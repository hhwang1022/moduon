package com.springboot.board.balancegame.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

public class BalanceGameReplyDto {
    @Getter
    @AllArgsConstructor
    public static class Post {
        @NotBlank
    }
}
