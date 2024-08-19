package com.springboot.board.balancegame.controller;

import com.springboot.board.balancegame.entity.BalanceGameReply;
import com.springboot.board.balancegame.mapper.BalanceGameReplyMapper;
import com.springboot.board.balancegame.repository.BalanceGameReplyRepository;
import com.springboot.board.balancegame.service.BalanceGameReplyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/balancegames")
public class BalanceGameReplyController {
    private final static String BALANCE_GAME_REPLIER_URL = "/balancegames";
    private final BalanceGameReplyMapper mapper;
    private final BalanceGameReplyService replyService;

    public BalanceGameReplyController(BalanceGameReplyMapper mapper, BalanceGameReplyService replyService) {
        this.mapper = mapper;
        this.replyService = replyService;
    }

    @PostMapping
    public ResponseEntity postBalanceGameReply(@RequestBody BalanceGameReply reply) {

    }
}
