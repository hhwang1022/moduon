package com.springboot.board.balancegame.mapper;

import com.springboot.board.balancegame.dto.BalanceGameDto;
import com.springboot.board.balancegame.entity.BalanceGame;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.time.LocalDateTime;
import java.util.List;

@Mapper(componentModel = "spring", unmappedSourcePolicy = ReportingPolicy.IGNORE, uses = {BalanceGameReplyMapper.class})
public interface BalanceGameMapper {
	default BalanceGame balanceGamePostToBalanceGame(BalanceGameDto.Post requestBody) {
		BalanceGame balanceGame = new BalanceGame();

		balanceGame.setTitle(requestBody.getTitle());
		balanceGame.setVoteItem1(requestBody.getVoteItem1());
		balanceGame.setVoteItem2(requestBody.getVoteItem2());
		balanceGame.setVoteImage1(requestBody.getVoteImage1());
		balanceGame.setVoteImage2(requestBody.getVoteImage2());
		balanceGame.setBalanceGameGeneration(
				BalanceGame.Generation.valueOfGeneration(requestBody.getGeneration())
		);

		balanceGame.setCreateDate(createLocalDateTime(requestBody.getCreateDateList()));
		balanceGame.setEndDate(createLocalDateTime(requestBody.getEndDateList()));

		return balanceGame;
	}

	default BalanceGame balanceGamePatchToBalanceGame(BalanceGameDto.Patch requestBody) {
		BalanceGame balanceGame = new BalanceGame();

		balanceGame.setBalanceGameId(requestBody.getBalanceGameId());
		balanceGame.setTitle(requestBody.getTitle());
		balanceGame.setVoteItem1(requestBody.getVoteItem1());
		balanceGame.setVoteItem2(requestBody.getVoteItem2());
		balanceGame.setVoteImage1(requestBody.getVoteImage1());
		balanceGame.setVoteImage2(requestBody.getVoteImage2());
		balanceGame.setBalanceGameGeneration(
				BalanceGame.Generation.valueOfGeneration(requestBody.getGeneration())
		);

		balanceGame.setCreateDate(createLocalDateTime(requestBody.getCreateDateList()));
		balanceGame.setEndDate(createLocalDateTime(requestBody.getEndDateList()));

		return balanceGame;
	}

	List<BalanceGameDto.Response> balanceGameToBalanceGameDtoList(List<BalanceGame> balanceGames);

	private LocalDateTime createLocalDateTime(List<Integer> dateList) {
		if (dateList == null || dateList.isEmpty()) {
			return null;
		}
		return LocalDateTime.of(
				dateList.get(0),
				dateList.get(1),
				dateList.get(2),
				dateList.get(3),
				dateList.get(4)
		);
	}


	@Mapping(target = "balanceGameReplesiList", qualifiedByName = "balanceGameToBalanceGameResponse")
	BalanceGameDto.Response balanceGameToBalanceGameResponseDto(BalanceGame balanceGame);
}
