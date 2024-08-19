package com.springboot.board.balancegame.controller;

import com.springboot.board.balancegame.mapper.BalanceGameReplyMapper;
import com.springboot.board.balancegame.repository.BalanceGameReplyRepository;
import com.springboot.board.balancegame.service.BalanceGameReplyService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/balancegame-reply")
public class BalanceGameReplyController {
    private final static String BALANCE_GAME_REPLIER_URL = "/balancegame-reply";
    private final BalanceGameReplyRepository replyRepository;
    private final BalanceGameReplyMapper mapper;
    private final BalanceGameReplyService replyService;

    public BalanceGameReplyController(BalanceGameReplyRepository replyRepository, BalanceGameReplyMapper mapper, BalanceGameReplyService replyService) {
        this.replyRepository = replyRepository;
        this.mapper = mapper;
        this.replyService = replyService;
    }
}
