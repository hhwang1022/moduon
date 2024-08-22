package com.springboot.share.service;

import com.springboot.board.balancegame.repository.BalanceGameRepository;
import com.springboot.board.balancegame.service.BalanceGameService;
import com.springboot.member.entity.Member;
import com.springboot.member.service.MemberService;
import com.springboot.share.entity.Share;
import com.springboot.share.repository.ShareRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Transactional
@Service
public class ShareService {
    private final ShareRepository shareRepository;
    private final MemberService memberService;
    private final BalanceGameService balanceGameService;
    private final BalanceGameRepository balanceGameRepository;

    public ShareService(ShareRepository shareRepository, MemberService memberService,
                        BalanceGameService balanceGameService, BalanceGameRepository balanceGameRepository) {
        this.shareRepository = shareRepository;
        this.memberService = memberService;
        this.balanceGameService = balanceGameService;
        this.balanceGameRepository = balanceGameRepository;
    }

    public Share createShare(Share share) {
        Member member = memberService.findVerifiedMember(share.getMember().getMemberId());
        if (member.getShareDate() == null) {
            member.setShareDate(LocalDate.now());
        }
        if (member.getShareCount() < 3 && member.getShareDate().isEqual(LocalDate.now())) {
            member.setShareCount(member.getShareCount() + 1);
            member.setVotingRights(member.getVotingRights() + 1);
        } else if (member.getShareDate().isAfter(LocalDate.now())) {
            member.setShareCount(0L);
            member.setShareDate(LocalDate.now());
        }
        share.setMember(member);

        share.setBalanceGame(
                balanceGameService.findVerifiedBalanceGame(
                        share.getBalanceGame().getBalanceGameId())
        );

        Share savedShare = shareRepository.save(share);

        return savedShare;
    }
}
