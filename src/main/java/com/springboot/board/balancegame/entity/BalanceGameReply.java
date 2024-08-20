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
public class BalanceGameReply {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long balanceGameReplyId;

    @Column
    private String body;

    @ManyToOne
    @JoinColumn(name = "BALANCE_GAME_ID")
    @JsonBackReference
    private BalanceGame balanceGame;

    public void setBalanceGame(BalanceGame balanceGame) {
        this.balanceGame = balanceGame;
        if (!balanceGame.getBalanceGameReplesiList().contains(this)) {
            balanceGame.setBalanceGameRepliesList(this);
        }
    }

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    @JsonBackReference
    private Member member;

    public void setMember(Member member) {
        this.member = member;
        if (!member.getPhotoReplies().contains(this)) {
            member.setBalanceGameReplies(this);
        }
    }

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private BalanceGameReplyStatus replyStatus = BalanceGameReplyStatus.ACTIVE;

    public enum BalanceGameReplyStatus {
        ACTIVE("공개중"),
        DELETED("삭제됨");

        @Getter
        private String boardStatus;

        BalanceGameReplyStatus(String boardStatus) {this.boardStatus = boardStatus;}
    }
}
