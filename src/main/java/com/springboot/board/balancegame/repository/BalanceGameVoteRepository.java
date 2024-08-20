package com.springboot.board.balancegame.repository;

import com.springboot.board.balancegame.entity.BalanceGameVote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BalanceGameVoteRepository extends JpaRepository<BalanceGameVote, Long> {
}
