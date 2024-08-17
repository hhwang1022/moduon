package com.springboot.board.balancegame.repository;

import com.springboot.board.balancegame.entity.BalanceGame;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BalanceGameRepository extends JpaRepository<BalanceGame, Long> {

}
