package com.springboot.board.balancegame.controller;

import com.springboot.board.balancegame.dto.BalanceGameReplyDto;
import com.springboot.board.balancegame.entity.BalanceGameReply;
import com.springboot.board.balancegame.mapper.BalanceGameReplyMapper;
import com.springboot.board.balancegame.service.BalanceGameReplyService;
import com.springboot.board.balancegame.service.BalanceGameService;
import com.springboot.dto.SingleResponseDto;
import com.springboot.member.entity.Member;
import com.springboot.member.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/balancegames/{balance-game-id}/reply")
public class BalanceGameReplyController {
    private final static String BALANCE_GAME_REPLIER_URL = "/balancegames/{balance-game-id}/reply";
    private final BalanceGameReplyMapper replyMapper;
    private final BalanceGameReplyService replyService;
    private final MemberService memberService;
    private final BalanceGameService balanceGameService;
    private final BalanceGameReplyService balanceGameReplyService;

    public BalanceGameReplyController(BalanceGameReplyMapper replyMapper, BalanceGameReplyService replyService,
                                      MemberService memberService, BalanceGameService balanceGameService, BalanceGameReplyService balanceGameReplyService) {
        this.replyMapper = replyMapper;
        this.replyService = replyService;
        this.memberService = memberService;
        this.balanceGameService = balanceGameService;
        this.balanceGameReplyService = balanceGameReplyService;
    }

    @PostMapping
    public ResponseEntity postBalanceGameReply(@PathVariable("balance-game-id") @Positive long balanceGameId,
                                               @AuthenticationPrincipal Object principal,
                                               @Validated @RequestBody BalanceGameReplyDto.Post postDto) {
        postDto.setBalanceGameId(balanceGameId);
        postDto.setMemberEmail(principal.toString());
        BalanceGameReply balanceGameReply = replyMapper.balanceGameReplyPostToBalanceGameReply(postDto);
        BalanceGameReply createReply = replyService.createBalanceGameReply(balanceGameReply);
        BalanceGameReplyDto.Response response = replyMapper.balanceGameToBalanceGameResponse(createReply);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response),
                HttpStatus.OK);
    }

    @PatchMapping("/{balance-game-reply-id}")
    public ResponseEntity patchBalanceGameReply(@PathVariable("balance-game-reply-id") Long balanceGameReplyId,
                                                @PathVariable("balance-game-id") Long balanceGameId,
                                                @AuthenticationPrincipal Object principal,
                                                @Validated @RequestBody BalanceGameReplyDto.Patch patchDto) {
        patchDto.setBalanceGameReplyId(balanceGameReplyId);
        patchDto.setBalanceGameId(balanceGameId);
        patchDto.setMemberEmail(principal.toString());

        BalanceGameReply reply =
                replyService.updateBalanceGameReply(replyMapper.balanceGameReplyPatchToBalanceGameReply(patchDto));

        return new ResponseEntity<>(
                new SingleResponseDto<>(reply),
                HttpStatus.OK);
    }


    @DeleteMapping("/{balance-game-reply-id}")
    public ResponseEntity deleteBalanceGameReply(@PathVariable("balance-game-reply-id") Long balanceGameReplyId,
                                                 @AuthenticationPrincipal Object principal) {
        balanceGameReplyService.deleteBalanceGameReply(balanceGameReplyId, principal.toString());

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
