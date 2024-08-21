package com.springboot.board.balancegame.mapper;

import com.springboot.board.balancegame.dto.BalanceGameVoteDto;
import com.springboot.board.balancegame.entity.BalanceGame;
import com.springboot.board.balancegame.entity.BalanceGameVote;
import com.springboot.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedSourcePolicy = ReportingPolicy.IGNORE)
public interface BalanceGameVoteMapper {
    default BalanceGameVote balanceGameVotePostToBalanceGameVote(BalanceGameVoteDto.Post requestBody) {
        Member member = new Member();
        member.setMemberId(requestBody.getMemberId());

        BalanceGame balanceGame = new BalanceGame();
        balanceGame.setBalanceGameId(requestBody.getBalanceGameId());

        BalanceGameVote balanceGameVote = new BalanceGameVote();
        balanceGameVote.setMember(member);
        balanceGameVote.setBalanceGame(balanceGame);
        balanceGameVote.setVoteItem(requestBody.getVoteItem());
        return balanceGameVote;
    }
}
