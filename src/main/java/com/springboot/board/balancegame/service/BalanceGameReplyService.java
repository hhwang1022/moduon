package com.springboot.board.balancegame.service;

import com.springboot.board.balancegame.entity.BalanceGameReply;
import com.springboot.board.balancegame.repository.BalanceGameReplyRepository;
import com.springboot.board.balancegame.repository.BalanceGameRepository;
import com.springboot.exception.BusinessLogicException;
import com.springboot.exception.ExceptionCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

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

    public BalanceGameReply updateBalanceGameReply(BalanceGameReply balanceGameReply) {
        BalanceGameReply findBalanceGameReply = findVerifiedBalanceGameReply(balanceGameReply.getBalanceGameReplyId());

        Optional.ofNullable(balanceGameReply.getBody())
                .ifPresent(body -> findBalanceGameReply.setBody(body));

        return balanceGameReplyRepository.save(findBalanceGameReply);
    }

    public void deleteBalanceGameReply(Long balanceGameReplyId, Long memberId) {
        balanceGameReplyRepository.findById(balanceGameReplyId).ifPresent(balanceGameReply -> {
            if (balanceGameReply.getMember().getMemberId().equals(memberId)) {
                balanceGameReply.setReplyStatus(BalanceGameReply.BalanceGameReplyStatus.DELETED);
                balanceGameReplyRepository.save(balanceGameReply);
            }
            else {
                throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
            }
        });
    }

    public BalanceGameReply findVerifiedBalanceGameReply(long balanceGameReplyId) {
        Optional<BalanceGameReply> optionalBalanceGameReply =
                balanceGameReplyRepository.findById(balanceGameReplyId);
        BalanceGameReply findBalnaceGameReply =
                optionalBalanceGameReply.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.BALANCEGAMEREPLY_NOT_FOUND));
        return findBalnaceGameReply;
    }

}
