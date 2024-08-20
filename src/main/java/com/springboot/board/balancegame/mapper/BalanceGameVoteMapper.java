package com.springboot.board.balancegame.mapper;

import com.springboot.board.balancegame.dto.BalanceGameVoteDto;
import com.springboot.board.balancegame.entity.BalanceGameVote;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedSourcePolicy = ReportingPolicy.IGNORE)
public interface BalanceGameVoteMapper {
    BalanceGameVote balanceGameVotePostToBalanceGameVote(BalanceGameVoteDto.Post requestBody);
}
