package com.springboot.board.balancegame.repository;

import com.springboot.board.balancegame.entity.BalanceGame;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BalanceGameRepository extends JpaRepository<BalanceGame, Long> {
	Optional<BalanceGame> findByTitle(String title);
	Optional<BalanceGame> findByVoteItem1(String voteItem1);
	Optional<BalanceGame> findByVoteItem2(String voteItem2);
}
