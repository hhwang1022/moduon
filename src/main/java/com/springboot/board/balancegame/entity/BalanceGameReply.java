package com.springboot.board.balancegame.entity;

import com.springboot.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class BalanceGameReply {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long balanceGameReplyId;

    @Column
    private String body;

    @OneToOne
    @JoinColumn(name = "BALANCE_GAME_ID")
    private BalanceGame balanceGame;

    public void setBalanceGame(BalanceGame balanceGame) {
        this.balanceGame = balanceGame;
        if (!(balanceGame.getBalanceGameReply() == this)) {
            balanceGame.setBalanceGameReply(this);
        }
    }

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    public void setMember(Member member) {
        this.member = member;
        if (!member.getPhotoReplies().contains(this)) {
            member.setBalanceGameReplies(this);
        }
    }
}
