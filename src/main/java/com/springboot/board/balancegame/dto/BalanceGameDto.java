package com.springboot.board.balancegame.dto;

import com.springboot.board.balancegame.entity.BalanceGame;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

public class BalanceGameDto {
	@Getter
	@AllArgsConstructor
	public static class Post {
		@NotBlank(message = "title 오류")
		private String title;

		@NotBlank(message = "voteItem1 오류")
		private String voteItem1;

		@NotBlank(message = "voteItem2 오류")
		private String voteItem2;

		@NotBlank(message = "voteImage1 오류")
		private String voteImage1;

		@NotBlank(message = "voteImage2 오류")
		private String voteImage2;

		private List<Integer> createDateList;

		private List<Integer> endDateList;

		private BalanceGame.GenerateCategory category;
	}
}
