package com.springboot.board.balancegame.repository;

import com.springboot.board.balancegame.entity.BalanceGame;
import com.springboot.board.balancegame.entity.BalanceGameReply;
import com.springboot.board.post.entity.PostLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface BalanceGameReplyRepository extends JpaRepository<BalanceGameReply, Long> {

    @Modifying
    @Query("DELETE FROM BalanceGameReply bgr WHERE bgr.balanceGame.id = :balanceGameId")
    void deleteByBalanceGameId(long balanceGameId);

}
