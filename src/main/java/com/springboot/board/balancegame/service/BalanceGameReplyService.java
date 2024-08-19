package com.springboot.board.balancegame.service;

import com.springboot.board.balancegame.entity.BalanceGame;
import com.springboot.board.balancegame.entity.BalanceGameReply;
import com.springboot.board.balancegame.repository.BalanceGameReplyRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class BalanceGameReplyService {
    private final BalanceGameReplyRepository balanceGameReplyRepository;

    public BalanceGameReplyService(BalanceGameReplyRepository balanceGameReplyRepository) {
        this.balanceGameReplyRepository = balanceGameReplyRepository;
    }

    public BalanceGameReply createBalanceGameReply(BalanceGameReply balanceGameReply) {
        BalanceGameReply savedBalanceGameReply = balanceGameReplyRepository.save(balanceGameReply);

        return savedBalanceGameReply;
    }


}
