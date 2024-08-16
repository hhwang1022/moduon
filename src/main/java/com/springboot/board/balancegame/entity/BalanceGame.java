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

	@Column
	private String title;

	@Column
	private String voteItem1;

	@Column
	private String voteItem2;

	@Column
	private String voteImage1;

	@Column
	private String voteImage2;

	@Column
	private Long votePoint1;

	@Column
	private Long votePoint2;

	@CreatedDate
	@Column(name = "CREATED_AT", updatable = false)
	private LocalDateTime createdAt;
}
