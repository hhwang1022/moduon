package com.springboot.board.balancegame.service;

import com.springboot.board.balancegame.entity.BalanceGame;
import com.springboot.board.balancegame.entity.BalanceGameVote;
import com.springboot.board.balancegame.repository.BalanceGameRepository;
import com.springboot.board.balancegame.repository.BalanceGameVoteRepository;
import com.springboot.board.post.entity.Post;
import com.springboot.exception.BusinessLogicException;
import com.springboot.exception.ExceptionCode;
import com.springboot.member.entity.Member;
import com.springboot.member.repository.MemberRepository;
import com.springboot.member.service.MemberService;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;

@Transactional
@Service
public class BalanceGameVoteService {
    private final BalanceGameVoteRepository balanceGameVoteRepository;
    private final BalanceGameService balanceGameService;
    private final BalanceGameRepository balanceGameRepository;
    private final MemberService memberService;
    private final MemberRepository memberRepository;

    public BalanceGameVoteService(BalanceGameVoteRepository balanceGameVoteRepository, BalanceGameService balanceGameService,
                                  BalanceGameRepository balanceGameRepository, MemberService memberService,
                                  MemberRepository memberRepository) {
        this.balanceGameVoteRepository = balanceGameVoteRepository;
        this.balanceGameService = balanceGameService;
        this.balanceGameRepository = balanceGameRepository;
        this.memberService = memberService;
        this.memberRepository = memberRepository;
    }

    public BalanceGameVote createBalanceGameVote(BalanceGameVote balanceGameVote) {
        BalanceGame balanceGame = balanceGameService.findVerifiedBalanceGame(balanceGameVote.getBalanceGame().getBalanceGameId());
        Member member = memberService.findVerifiedMember(balanceGameVote.getMember().getEmail());
        balanceGameVote.setBalanceGame(balanceGame);
        balanceGameVote.setMember(member);

        Map<Member.Generation, List<BalanceGame.Generation>> allowGenerationMap = Map.of(
                Member.Generation.GENERATION_8090, List.of(BalanceGame.Generation.GENERATION_8090, BalanceGame.Generation.GENERATION_9000),
                Member.Generation.GENERATION_9000, List.of(BalanceGame.Generation.GENERATION_8090, BalanceGame.Generation.GENERATION_9000, BalanceGame.Generation.GENERATION_0010),
                Member.Generation.GENERATION_0010, List.of(BalanceGame.Generation.GENERATION_9000, BalanceGame.Generation.GENERATION_0010, BalanceGame.Generation.GENERATION_1020),
                Member.Generation.GENERATION_1020, List.of(BalanceGame.Generation.GENERATION_0010, BalanceGame.Generation.GENERATION_1020)
        );

        List<BalanceGame.Generation> allowGenerations = allowGenerationMap.get(member.getMemberGeneration());

        System.out.println(balanceGameVote.getVoteItem());
        System.out.println(balanceGameVote.getMember().getVotingRights());

        if ((balanceGameVote.getVoteItem().equals("point1") || balanceGameVote.getVoteItem().equals("point2"))
                && balanceGameVote.getMember().getVotingRights() > 0
                && allowGenerations.contains(balanceGameVote.getBalanceGame().getBalanceGameGeneration())) {
            member.setVotingRights(member.getVotingRights() - 1);
            balanceGameVote.setMember(member);
            return balanceGameVoteRepository.save(balanceGameVote);
        }
        else {
            throw new BusinessLogicException(ExceptionCode.BALANCEGAME_VOTE_ERROR);
        }
    }
}
