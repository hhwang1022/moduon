package com.springboot.board.balancegame.controller;

import com.springboot.board.balancegame.dto.BalanceGameDto;
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

import java.net.URI;

@RestController
@RequestMapping("/balancegames")
@Validated
@Slf4j
public class BalanceGameController {
	private final BalanceGameService balanceGameService;
	private final BalanceGameMapper mapper;

	public BalanceGameController(BalanceGameService balanceGameService, BalanceGameMapper mapper) {
		this.balanceGameService = balanceGameService;
		this.mapper = mapper;
	}

	@PostMapping
	public ResponseEntity postBalanceGame(@Validated @RequestBody BalanceGameDto.Post requestBody) {
		BalanceGame balanceGame = mapper.balanceGamePostToBalanceGame(requestBody);
		

		BalanceGame createBalanceGame = balanceGameService.createBalanceGame(balanceGame);

		return ResponseEntity.ok().body(createBalanceGame);
	}
}
