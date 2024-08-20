package com.springboot.board.balancegame.service;

import com.springboot.board.balancegame.repository.BalanceGameVoteRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Transactional
@Service
public class BalanceGameVoteService {
    private final BalanceGameVoteRepository balanceGameVoteRepository;

    public BalanceGameVoteService(BalanceGameVoteRepository balanceGameVoteRepository) {
        this.balanceGameVoteRepository = balanceGameVoteRepository;
    }
}
