package com.springboot.board.balancegame.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

public class BalanceGameDto {
	@Getter
	@AllArgsConstructor
	public static class Post {
		@NotBlank
		private String title;


	}
}
