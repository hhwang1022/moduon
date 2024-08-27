package com.springboot.board.balancegame.service;

import com.springboot.board.balancegame.entity.BalanceGame;
import com.springboot.board.balancegame.repository.BalanceGameReplyRepository;
import com.springboot.board.balancegame.repository.BalanceGameRepository;
import com.springboot.board.balancegame.repository.BalanceGameVoteRepository;
import com.springboot.exception.BusinessLogicException;
import com.springboot.exception.ExceptionCode;
import com.springboot.member.service.MemberService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class BalanceGameService {
	private final BalanceGameRepository balanceGameRepository;
	private final BalanceGameReplyRepository balanceGameReplyRepository;
	private final BalanceGameVoteRepository balanceGameVoteRepository;


	public BalanceGameService(BalanceGameRepository balanceGameRepository,
							  BalanceGameReplyRepository balanceGameReplyRepository,
							  BalanceGameVoteRepository balanceGameVoteRepository) {
		this.balanceGameRepository = balanceGameRepository;
        this.balanceGameReplyRepository = balanceGameReplyRepository;
        this.balanceGameVoteRepository = balanceGameVoteRepository;
    }

	public BalanceGame createBalanceGame(BalanceGame balanceGame) {
		BalanceGame savedBalanceGame = balanceGameRepository.save(balanceGame);

		return savedBalanceGame;
	}

	public BalanceGame updateBalanceGame(BalanceGame balanceGame) {
		BalanceGame findBalanceGame = findVerifiedBalanceGame(balanceGame.getBalanceGameId());

		Optional.ofNullable(balanceGame.getTitle())
				.ifPresent(title -> findBalanceGame.setTitle(title));
		Optional.ofNullable(balanceGame.getVoteItem1())
				.ifPresent(voteItem1 -> findBalanceGame.setVoteItem1(voteItem1));
		Optional.ofNullable(balanceGame.getVoteItem2())
				.ifPresent(voteItem2 -> findBalanceGame.setVoteItem2(voteItem2));
		Optional.ofNullable(balanceGame.getVoteImage1())
				.ifPresent(voteImage1 -> findBalanceGame.setVoteImage1(voteImage1));
		Optional.ofNullable(balanceGame.getVoteImage2())
				.ifPresent(voteImage2 -> findBalanceGame.setVoteImage2(voteImage2));
		Optional.ofNullable(balanceGame.getCreateDate())
				.ifPresent(createDate -> findBalanceGame.setCreateDate(createDate));
		Optional.ofNullable(balanceGame.getEndDate())
				.ifPresent(endDate -> findBalanceGame.setEndDate(endDate));
		Optional.ofNullable(balanceGame.getBalanceGameGeneration())
				.ifPresent(balanceGameGeneration -> findBalanceGame.setBalanceGameGeneration(balanceGameGeneration));

		return balanceGameRepository.save(findBalanceGame);
	}

	public Page<BalanceGame> findBalanceGames(int page, int size) {
		return balanceGameRepository.findAll(PageRequest.of(page, size,
				Sort.by("votePoints").descending())
		);
	}

	public void deleteBalanceGame(long balanceGameId) {
		BalanceGame findBalanceGame = findVerifiedBalanceGame(balanceGameId);

		balanceGameReplyRepository.deleteByBalanceGameId(balanceGameId);
		balanceGameVoteRepository.deleteById(balanceGameId);
		balanceGameRepository.delete(findBalanceGame);
	}

	public BalanceGame findVerifiedBalanceGame(long balanceGameId) {
		Optional<BalanceGame> optionalBalanceGame = balanceGameRepository.findByBalanceGameId(balanceGameId);

		BalanceGame findBalanceGame =
				optionalBalanceGame.orElseThrow(() ->
						new BusinessLogicException(ExceptionCode.BALANCEGAME_NOT_EXISTS)
				);

		return findBalanceGame;
	}

	public boolean isAfterNow(LocalDateTime EndTime) {
		if (EndTime.isAfter(LocalDateTime.now())) {
			return true;
		}
		return false;
	}

	public List<BalanceGame> setVotePoints(List<BalanceGame> balanceGames) {
		// 각 BalanceGame의 votePoint 업데이트
		balanceGames.forEach(balanceGame -> {
			// votePoint1과 votePoint2를 직접 대입
			balanceGame.setVotePoint1(balanceGame.getBalanceGameVoteList().stream()
					.filter(vote -> vote.getVoteItem().equals("point1")) // "point1"로 필터링
					.count()); // 개수 세기

			balanceGame.setVotePoint2(balanceGame.getBalanceGameVoteList().stream()
					.filter(vote -> vote.getVoteItem().equals("point2")) // "point2"로 필터링
					.count()); // 개수 세기

			balanceGame.setVotePoints(balanceGame.getBalanceGameVoteList().stream()
					.filter(vote -> vote.getVoteItem().equals("point1") || vote.getVoteItem().equals("point2"))
					.count());
		});

		return balanceGames;
	}
}
