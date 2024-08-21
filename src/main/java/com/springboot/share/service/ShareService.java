package com.springboot.share.service;

import com.springboot.board.balancegame.service.BalanceGameService;
import com.springboot.member.service.MemberService;
import com.springboot.share.entity.Share;
import com.springboot.share.repository.ShareRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class ShareService {
    private final ShareRepository shareRepository;
    private final MemberService memberService;
    private final BalanceGameService balanceGameService;

    public ShareService(ShareRepository shareRepository, MemberService memberService,
                        BalanceGameService balanceGameService) {
        this.shareRepository = shareRepository;
        this.memberService = memberService;
        this.balanceGameService = balanceGameService;
    }

    public Share createShare(Share share) {
        System.out.println(share.getMember().getMemberId());
        share.setMember(
                memberService.findVerifiedMember(share.getMember().getMemberId())
        );

        share.setBalanceGame(
                balanceGameService.findVerifiedBalanceGame(
                        share.getBalanceGame().getBalanceGameId())
        );

        Share savedShare = shareRepository.save(share);

        return savedShare;
    }
}
