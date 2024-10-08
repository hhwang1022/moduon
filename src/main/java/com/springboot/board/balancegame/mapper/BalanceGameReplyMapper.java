package com.springboot.board.balancegame.mapper;

import com.springboot.board.balancegame.dto.BalanceGameReplyDto;
import com.springboot.board.balancegame.entity.BalanceGame;
import com.springboot.board.balancegame.entity.BalanceGameReply;
import com.springboot.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring")
public interface BalanceGameReplyMapper {
    @Mapping(source = "memberEmail", target = "member.email")
    @Mapping(source = "balanceGameId", target = "balanceGame.balanceGameId")
    BalanceGameReply balanceGameReplyPostToBalanceGameReply(BalanceGameReplyDto.Post requestBody);

    @Mapping(source = "member.nickname", target = "memberNickname")
    BalanceGameReplyDto.Response balanceGameToBalanceGameResponse(BalanceGameReply balanceGameReply);

    @Mapping(source = "memberEmail", target = "member.email")
    @Mapping(source = "balanceGameId", target = "balanceGame.balanceGameId")
    BalanceGameReply balanceGameReplyPatchToBalanceGameReply(BalanceGameReplyDto.Patch requestBody);

    @Named("balanceGameToBalanceGameResponseDtos")
    List<BalanceGameReplyDto.Response> balanceGamesToBalanceGameResponseDtos(List<BalanceGameReply> balanceGameReplies);
}
