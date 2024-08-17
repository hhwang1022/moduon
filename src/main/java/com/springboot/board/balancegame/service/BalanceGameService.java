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

}
