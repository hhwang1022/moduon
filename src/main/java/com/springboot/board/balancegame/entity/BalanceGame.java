package com.springboot.board.balancegame.entity;

import com.springboot.audit.Auditable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

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
	private Long votePoint1;

	@Column(nullable = false)
	private Long votePoint2;

	@CreatedDate
	@Column(name = "CREATE_DATE", updatable = false)
	private LocalDateTime createDate;

	@Column(name = "END_DATE")
	private LocalDateTime endDate;

	@Enumerated(value = EnumType.STRING)
	@Column(nullable = false)
	private String category;

	public enum category {
		GENERATION_8090("8090세대"),
		GENERATION_9000("9000세대"),
		GENERATION_0010("0010세대"),
		GENERATION_1020("1020세대");

		@Getter
		private String category;

		category(String category) {this.category = category;}
	}
}
