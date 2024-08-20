package com.springboot.board.balancegame.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.springboot.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class BalanceGameVote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long BalanceGameVoteId;

    @ManyToOne
    @JoinColumn(name = "BALANCE_GAME_ID")
    @JsonBackReference
    private BalanceGame balanceGame;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    @JsonBackReference
    private Member member;
}
