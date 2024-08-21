package com.springboot.board.balancegame.controller;

import com.springboot.board.balancegame.dto.BalanceGameVoteDto;
import com.springboot.board.balancegame.entity.BalanceGameVote;
import com.springboot.board.balancegame.mapper.BalanceGameVoteMapper;
import com.springboot.board.balancegame.service.BalanceGameVoteService;
import com.springboot.dto.SingleResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/votes")
public class BalanceGameVoteController {
    private final static String VOTE_DEFAULT_URL = "/votes";
    private final BalanceGameVoteMapper voteMapper;
    private final BalanceGameVoteService voteService;

    public BalanceGameVoteController(BalanceGameVoteMapper voteMapper, BalanceGameVoteService voteService) {
        this.voteMapper = voteMapper;
        this.voteService = voteService;
    }

    @PostMapping
    public ResponseEntity postBalanceGameVote(@Validated @RequestBody BalanceGameVoteDto.Post requestBody) {
        BalanceGameVote balanceGameVote = voteMapper.balanceGameVotePostToBalanceGameVote(requestBody);
        BalanceGameVote createVote = voteService.createBalanceGameVote(balanceGameVote);

        return new ResponseEntity<>(
                new SingleResponseDto<>(createVote),
                HttpStatus.OK);
    }
}
