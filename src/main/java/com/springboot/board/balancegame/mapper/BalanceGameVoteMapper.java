package com.springboot.board.balancegame.mapper;

import com.springboot.board.balancegame.dto.BalanceGameVoteDto;
import com.springboot.board.balancegame.entity.BalanceGame;
import com.springboot.board.balancegame.entity.BalanceGameVote;
import com.springboot.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedSourcePolicy = ReportingPolicy.IGNORE)
public interface BalanceGameVoteMapper {
    @Mapping(source = "memberEmail", target = "member.email")
    @Mapping(source = "balanceGameId", target = "balanceGame.balanceGameId")
    BalanceGameVote balanceGameVotePostToBalanceGameVote(BalanceGameVoteDto.Post requestBody);

    @Mapping(source = "member.nickname", target = "memberNickname")
    @Mapping(source = "balanceGame.balanceGameId", target = "balanceGameId")
    BalanceGameVoteDto.Response balanceGameVoteToBalanceGameVoteResponse(BalanceGameVote balanceGameVote);
}
