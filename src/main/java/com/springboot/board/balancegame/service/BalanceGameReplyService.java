package com.springboot.board.balancegame.service;

import com.springboot.board.balancegame.entity.BalanceGameReply;
import com.springboot.board.balancegame.repository.BalanceGameReplyRepository;
import com.springboot.board.balancegame.repository.BalanceGameRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class BalanceGameReplyService {
    private final BalanceGameReplyRepository balanceGameReplyRepository;
    private final BalanceGameRepository balanceGameRepository;

    public BalanceGameReplyService(BalanceGameReplyRepository balanceGameReplyRepository,
                                   BalanceGameRepository balanceGameRepository) {
        this.balanceGameReplyRepository = balanceGameReplyRepository;
        this.balanceGameRepository = balanceGameRepository;
    }

    public BalanceGameReply createBalanceGameReply(BalanceGameReply balanceGameReply) {
        BalanceGameReply savedBalanceGameReply = balanceGameReplyRepository.save(balanceGameReply);

        return savedBalanceGameReply;
    }


}
