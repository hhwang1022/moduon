package com.springboot.board.balancegame.service;

import com.springboot.board.balancegame.entity.BalanceGame;
import com.springboot.board.balancegame.repository.BalanceGameRepository;
import com.springboot.exception.BusinessLogicException;
import com.springboot.exception.ExceptionCode;
import com.springboot.member.service.MemberService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Service
public class BalanceGameService {
	private final BalanceGameRepository balanceGameRepository;

	public BalanceGameService(BalanceGameRepository balanceGameRepository) {
		this.balanceGameRepository = balanceGameRepository;
	}

	public BalanceGame createBalanceGame(BalanceGame balanceGame) {
		BalanceGame savedBalanceGame = balanceGameRepository.save(balanceGame);

		return savedBalanceGame;
	}

	public BalanceGame updateBalanceGame(BalanceGame balanceGame) {
		BalanceGame findBalanceGame = findVerifiedBalanceGame(balanceGame.getBalanceGameId());

		Optional.ofNullable(balanceGame.getTitle())
				.ifPresent(title -> findBalanceGame.setTitle(title));
		Optional.ofNullable(balanceGame.getVoteItem1())
				.ifPresent(voteItem1 -> findBalanceGame.setVoteItem1(voteItem1));
		Optional.ofNullable(balanceGame.getVoteItem2())
				.ifPresent(voteItem2 -> findBalanceGame.setVoteItem2(voteItem2));
		Optional.ofNullable(balanceGame.getVoteImage1())
				.ifPresent(voteImage1 -> findBalanceGame.setVoteImage1(voteImage1));
		Optional.ofNullable(balanceGame.getVoteImage2())
				.ifPresent(voteImage2 -> findBalanceGame.setVoteImage2(voteImage2));
		Optional.ofNullable(balanceGame.getCreateDate())
				.ifPresent(createDate -> findBalanceGame.setCreateDate(createDate));
		Optional.ofNullable(balanceGame.getEndDate())
				.ifPresent(endDate -> findBalanceGame.setEndDate(endDate));
		Optional.ofNullable(balanceGame.getBalanceGameGeneration())
				.ifPresent(balanceGameGeneration -> findBalanceGame.setBalanceGameGeneration(balanceGameGeneration));

		return balanceGameRepository.save(findBalanceGame);
	}

	public void deleteBalanceGame(long balanceGameId) {
		BalanceGame findBalanceGame = findVerifiedBalanceGame(balanceGameId);
		findBalanceGame.setBalanceGameStatus(BalanceGame.BalanceGameStatus.DELETED);

		balanceGameRepository.save(findBalanceGame);
	}

	public BalanceGame findVerifiedBalanceGame(long balanceGameId) {
		Optional<BalanceGame> optionalBalanceGame = balanceGameRepository.findByBalanceGameId(balanceGameId);

		BalanceGame findBalanceGame =
				optionalBalanceGame.orElseThrow(() ->
						new BusinessLogicException(ExceptionCode.BALANCEGAME_NOT_EXISTS));

		return findBalanceGame;
	}
}
