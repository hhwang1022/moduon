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
		@NotBlank(message = "title이 공백이면 안됩니다.")
		private String title;

		@NotBlank(message = "투표주제1이 공백이면 안됩니다.")
		private String voteItem1;

		@NotBlank(message = "투표주제2가 공백이면 안됩니다.")
		private String voteItem2;

		@NotBlank(message = "투표이미지1이 공백이면 안됩니다.")
		private String voteImage1;

		@NotBlank(message = "투표이미지2가 공백이면 안됩니다.")
		private String voteImage2;

		private List<Integer> createDateList;

		private List<Integer> endDateList;

		private String generation;
	}
}
