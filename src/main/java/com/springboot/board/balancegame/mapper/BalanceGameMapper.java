package com.springboot.board.balancegame.mapper;

import com.springboot.board.balancegame.dto.BalanceGameDto;
import com.springboot.board.balancegame.entity.BalanceGame;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.time.LocalDateTime;

@Mapper(componentModel = "spring", unmappedSourcePolicy = ReportingPolicy.IGNORE)
public interface BalanceGameMapper {
	default BalanceGame balanceGamePostToBalanceGame(BalanceGameDto.Post requestBody) {
		BalanceGame balanceGame = new BalanceGame();

		balanceGame.setTitle(requestBody.getTitle());
		balanceGame.setVoteItem1(requestBody.getVoteItem1());
		balanceGame.setVoteItem2(requestBody.getVoteItem2());
		balanceGame.setVoteImage1(requestBody.getVoteImage1());
		balanceGame.setVoteImage2(requestBody.getVoteImage2());
		balanceGame.setBalanceGameGeneration(
				BalanceGame.Generation.valueOfGeneration(requestBody.getGeneration()));

		balanceGame.setCreateDate(LocalDateTime.of(
				requestBody.getCreateDateList().get(0),
				requestBody.getCreateDateList().get(1),
				requestBody.getCreateDateList().get(2),
				requestBody.getCreateDateList().get(3),
				requestBody.getCreateDateList().get(4)
		));
		balanceGame.setEndDate(LocalDateTime.of(
				requestBody.getEndDateList().get(0),
				requestBody.getEndDateList().get(1),
				requestBody.getEndDateList().get(2),
				requestBody.getEndDateList().get(3),
				requestBody.getEndDateList().get(4)
		));

		return balanceGame;
	}
}
