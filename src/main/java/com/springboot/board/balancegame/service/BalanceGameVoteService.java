package com.springboot.board.balancegame.service;

import com.springboot.board.balancegame.entity.BalanceGame;
import com.springboot.board.balancegame.entity.BalanceGameVote;
import com.springboot.board.balancegame.repository.BalanceGameRepository;
import com.springboot.board.balancegame.repository.BalanceGameVoteRepository;
import com.springboot.exception.BusinessLogicException;
import com.springboot.exception.ExceptionCode;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Transactional
@Service
public class BalanceGameVoteService {
    private final BalanceGameVoteRepository balanceGameVoteRepository;
    private final BalanceGameService balanceGameService;
    private final BalanceGameRepository balanceGameRepository;

    public BalanceGameVoteService(BalanceGameVoteRepository balanceGameVoteRepository, BalanceGameService balanceGameService, BalanceGameRepository balanceGameRepository) {
        this.balanceGameVoteRepository = balanceGameVoteRepository;
        this.balanceGameService = balanceGameService;
        this.balanceGameRepository = balanceGameRepository;
    }

    public BalanceGameVote createBalanceGameVote(BalanceGameVote balanceGameVote) {
        balanceGameService.findVerifiedBalanceGame(balanceGameVote.getBalanceGame().getBalanceGameId());
        if (balanceGameVote.getVoteItem().equals("point1") || balanceGameVote.getVoteItem().equals("point2")) {
            return balanceGameVoteRepository.save(balanceGameVote);
        }
        else {
            throw new BusinessLogicException(ExceptionCode.BALANCEGAME_VOTEITEM_NOT_FOUND);
        }
    }
}
