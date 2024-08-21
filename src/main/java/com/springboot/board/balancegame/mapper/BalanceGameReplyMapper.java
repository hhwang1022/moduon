package com.springboot.board.balancegame.mapper;

import com.springboot.board.balancegame.dto.BalanceGameReplyDto;
import com.springboot.board.balancegame.entity.BalanceGame;
import com.springboot.board.balancegame.entity.BalanceGameReply;
import com.springboot.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedSourcePolicy = ReportingPolicy.IGNORE)
public interface BalanceGameReplyMapper {
    default BalanceGameReply balanceGameReplyPostToBalanceGameReply(BalanceGameReplyDto.Post requestBody) {
        Member member = new Member();
        member.setMemberId(requestBody.getMemberId());
        BalanceGame balanceGame = new BalanceGame();
        balanceGame.setBalanceGameId(requestBody.getBalanceGameId());

        BalanceGameReply balanceGameReply = new BalanceGameReply();
        balanceGameReply.setMember(member);
        balanceGameReply.setBalanceGame(balanceGame);
        balanceGameReply.setBody(requestBody.getBody());

        return balanceGameReply;
    }
    BalanceGameReplyDto.Response balanceGameToBalanceGameResponse(BalanceGameReply balanceGameReply);
    BalanceGameReply balanceGameReplyPatchToBalanceGameReply(BalanceGameReplyDto.Patch requestBody);
}
