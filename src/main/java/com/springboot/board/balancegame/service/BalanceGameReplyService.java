package com.springboot.board.balancegame.service;

import com.springboot.board.balancegame.entity.BalanceGame;
import com.springboot.board.balancegame.entity.BalanceGameReply;
import com.springboot.board.balancegame.repository.BalanceGameReplyRepository;
import com.springboot.board.balancegame.repository.BalanceGameRepository;
import com.springboot.exception.BusinessLogicException;
import com.springboot.exception.ExceptionCode;
import com.springboot.member.entity.Member;
import com.springboot.member.service.MemberService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Service
public class BalanceGameReplyService {
    private final BalanceGameReplyRepository balanceGameReplyRepository;
    private final BalanceGameRepository balanceGameRepository;
    private final BalanceGameService balanceGameService;
    private final MemberService memberService;

    public BalanceGameReplyService(BalanceGameReplyRepository balanceGameReplyRepository,
                                   BalanceGameRepository balanceGameRepository, BalanceGameService balanceGameService, MemberService memberService) {
        this.balanceGameReplyRepository = balanceGameReplyRepository;
        this.balanceGameRepository = balanceGameRepository;
        this.balanceGameService = balanceGameService;
        this.memberService = memberService;
    }

    public BalanceGameReply createBalanceGameReply(BalanceGameReply balanceGameReply) {
        balanceGameReply.setMember(memberService.findVerifiedMember(balanceGameReply.getMember().getEmail()));
        balanceGameReply.setBalanceGame(balanceGameService.findVerifiedBalanceGame(balanceGameReply.getBalanceGame().getBalanceGameId()));

        BalanceGameReply savedBalanceGameReply = balanceGameReplyRepository.save(balanceGameReply);

        return savedBalanceGameReply;
    }

    public BalanceGameReply updateBalanceGameReply(BalanceGameReply balanceGameReply) {
        BalanceGameReply findBalanceGameReply = findVerifiedBalanceGameReply(balanceGameReply.getBalanceGameReplyId());

        Optional.ofNullable(balanceGameReply.getBody())
                .ifPresent(body -> findBalanceGameReply.setBody(body));

        return balanceGameReplyRepository.save(findBalanceGameReply);
    }

    public void deleteBalanceGameReply(Long balanceGameReplyId, String memberEmail) {
        balanceGameReplyRepository.findById(balanceGameReplyId).ifPresent(balanceGameReply -> {
            if (balanceGameReply.getMember().getEmail().equals(memberEmail)) {
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
