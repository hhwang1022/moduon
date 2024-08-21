package com.springboot.board.balancegame.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.springboot.audit.Auditable;
import com.springboot.member.entity.Member;
import com.springboot.share.entity.Share;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class BalanceGame extends Auditable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long balanceGameId;

	@Column(nullable = false)
	private String title;

	@Column(nullable = false)
	private String voteItem1;

	@Column(nullable = false)
	private String voteItem2;

	@Column(nullable = false)
	private String voteImage1;

	@Column(nullable = false)
	private String voteImage2;

	@Column(nullable = false)
	private Long votePoint1 = 0L;

	@Column(nullable = false)
	private Long votePoint2 = 0L;

	@Column(name = "CREATE_DATE", updatable = false)
	private LocalDateTime createDate;

	@Column(name = "END_DATE")
	private LocalDateTime endDate;

	@Enumerated(value = EnumType.STRING)
	@Column(nullable = false)
	private BalanceGameStatus balanceGameStatus = BalanceGameStatus.ACTIVE;

	public enum BalanceGameStatus {
		ACTIVE("진행중인 투표"),
		INACTIVE("종료된 투표"),
		DELETED("삭제된 투표");

		@Getter
		private String boardStatus;

		BalanceGameStatus(String boardStatus) {this.boardStatus = boardStatus;}
	}

	@Enumerated(value = EnumType.STRING)
	@Column(nullable = false)
	private Generation balanceGameGeneration;

	public enum Generation {
		GENERATION_8090("8090세대"),
		GENERATION_9000("9000세대"),
		GENERATION_0010("0010세대"),
		GENERATION_1020("1020세대");

		@Getter
		private String generation;

		Generation(String generation) {
			this.generation = generation;
		}

		public static Generation valueOfGeneration(String generation) {
			if (generation == null) {
				return null;
			}
			return Arrays.stream(values())
					.filter(value -> value.generation.contains(generation))
					.findAny()
					.orElse(null);
		}
	}

	@OneToMany(mappedBy = "balanceGame", cascade = {CascadeType.PERSIST})
	@JsonManagedReference
	private List<BalanceGameReply> balanceGameReplesiList = new ArrayList<>();

	public void setBalanceGameRepliesList(BalanceGameReply balanceGameReplies) {
		balanceGameReplesiList.add(balanceGameReplies);
		if (balanceGameReplies.getBalanceGame() != this) {
			balanceGameReplies.setBalanceGame(this);
		}
	}

	@OneToMany(mappedBy = "balanceGame", cascade = {CascadeType.PERSIST})
	@JsonManagedReference
	private List<Share> shareList = new ArrayList<>();

	@ManyToOne
	@JoinColumn(name = "MEMBER_ID")
	@JsonBackReference
	private Member member;

	@OneToMany(mappedBy = "balanceGame", cascade = {CascadeType.PERSIST})
	@JsonManagedReference
	private List<BalanceGameVote> balanceGameVoteList = new ArrayList<>();

	@Column
	private Long votePoints = 0L;
}
