package com.springboot.share.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.springboot.board.balancegame.entity.BalanceGame;
import com.springboot.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Share {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long shareId;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    @JsonBackReference
    private Member member;

    public void setMember(Member member) {
        this.member = member;
        if (!member.getShareList().contains(this)) {
            member.setShareList(this);
        }
    }

    @ManyToOne
    @JoinColumn(name = "BALNACE_GAME_ID")
    @JsonBackReference
    private BalanceGame balanceGame;

    @Column
    private String shareType;
}
