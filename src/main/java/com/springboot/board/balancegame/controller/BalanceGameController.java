package com.springboot.board.balancegame.controller;

import com.springboot.board.balancegame.entity.BalanceGame;
import com.springboot.board.balancegame.mapper.BalanceGameMapper;
import com.springboot.board.balancegame.service.BalanceGameService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
@Validated
@Slf4j
public class BalanceGameController {
	private final BalanceGameService balanceGameService;
	private final BalanceGameMapper balanceGameMapper;

	public BalanceGameController(BalanceGameService balanceGameService, BalanceGameMapper balanceGameMapper) {
		this.balanceGameService = balanceGameService;
		this.balanceGameMapper = balanceGameMapper;
	}


}
@PostMapping
public ResponseEntity addBalanceGame(@Validated @RequestBody BalanceGame balanceGame) {}
