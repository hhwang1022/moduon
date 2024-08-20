package com.springboot.board.balancegame.mapper;

import com.springboot.board.balancegame.dto.BalanceGameReplyDto;
import com.springboot.board.balancegame.entity.BalanceGameReply;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedSourcePolicy = ReportingPolicy.IGNORE)
public interface BalanceGameReplyMapper {
    BalanceGameReply balanceGameReplyPostToBalanceGameReply(BalanceGameReplyDto.Post requestBody);
    BalanceGameReplyDto.Response balanceGameToBalanceGameResponse(BalanceGameReply balanceGameReply);
}
