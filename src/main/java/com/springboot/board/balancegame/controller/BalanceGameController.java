package com.springboot.board.balancegame.controller;

import com.springboot.board.balancegame.dto.BalanceGameDto;
import com.springboot.board.balancegame.entity.BalanceGame;
import com.springboot.board.balancegame.mapper.BalanceGameMapper;
import com.springboot.board.balancegame.service.BalanceGameService;
import com.springboot.dto.SingleResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
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

		return new ResponseEntity<>(
				new SingleResponseDto<>(createBalanceGame),
				HttpStatus.OK
		);
	}

	@PatchMapping("/{balance-game-id}")
	public ResponseEntity patchBalanceGame(@PathVariable("balance-game-id") @Positive Long balanceGameId,
										   @Validated @RequestBody BalanceGameDto.Patch requestBody) {
		requestBody.setBalanceGameId(balanceGameId);
		BalanceGame balanceGame = balanceGameService.updateBalanceGame(
				mapper.balanceGamePatchToBalanceGame(requestBody)
		);
		
		return new ResponseEntity<>(
				new SingleResponseDto<>(balanceGame),
				HttpStatus.OK
		);
	}

	@DeleteMapping("{balance-game-id}")
	public ResponseEntity deleteBalanceGame(@PathVariable("balance-game-id") Long balanceGameId) {
		balanceGameService.deleteBalanceGame(balanceGameId);

		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
