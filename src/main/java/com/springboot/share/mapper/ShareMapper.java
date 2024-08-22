package com.springboot.share.mapper;

import com.springboot.board.balancegame.entity.BalanceGame;
import com.springboot.member.entity.Member;
import com.springboot.share.dto.ShareDto;
import com.springboot.share.entity.Share;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedSourcePolicy = ReportingPolicy.IGNORE)
public interface ShareMapper {
    default Share sharePostToShare(ShareDto.Post requestBody) {
        Member member = new Member();
        member.setEmail(requestBody.getMemberEmail());

        BalanceGame balanceGame = new BalanceGame();
        balanceGame.setBalanceGameId(requestBody.getBalanceGameId());

        Share share = new Share();
        share.setMember(member);
        share.setBalanceGame(balanceGame);
        share.setShareType(requestBody.getShareType());

        return share;
    }
}
