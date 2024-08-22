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

import java.util.List;
import java.util.Map;
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
        Member member = memberService.findVerifiedMember(balanceGameReply.getMember().getEmail());
        balanceGameReply.setMember(member);
        balanceGameReply.setBalanceGame(balanceGameService.findVerifiedBalanceGame(balanceGameReply.getBalanceGame().getBalanceGameId()));

        Map<Member.Generation, List<BalanceGame.Generation>> allowGenerationMap = Map.of(
                Member.Generation.GENERATION_8090, List.of(BalanceGame.Generation.GENERATION_8090, BalanceGame.Generation.GENERATION_9000),
                Member.Generation.GENERATION_9000, List.of(BalanceGame.Generation.GENERATION_8090, BalanceGame.Generation.GENERATION_9000, BalanceGame.Generation.GENERATION_0010),
                Member.Generation.GENERATION_0010, List.of(BalanceGame.Generation.GENERATION_9000, BalanceGame.Generation.GENERATION_0010, BalanceGame.Generation.GENERATION_1020),
                Member.Generation.GENERATION_1020, List.of(BalanceGame.Generation.GENERATION_0010, BalanceGame.Generation.GENERATION_1020)
        );

        List<BalanceGame.Generation> allowGenerations = allowGenerationMap.get(member.getMemberGeneration());

        if (allowGenerations.contains(balanceGameReply.getBalanceGame().getBalanceGameGeneration())) {
            return balanceGameReplyRepository.save(balanceGameReply);
        } else {
            throw new BusinessLogicException(ExceptionCode.BALANCEGAMEREPLY_ERROR);
        }
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
