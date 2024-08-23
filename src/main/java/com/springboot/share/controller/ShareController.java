package com.springboot.share.controller;

import com.springboot.dto.SingleResponseDto;
import com.springboot.share.dto.ShareDto;
import com.springboot.share.entity.Share;
import com.springboot.share.mapper.ShareMapper;
import com.springboot.share.repository.ShareRepository;
import com.springboot.share.service.ShareService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/balancegames/{balance-game-id}/share")
public class ShareController {
    private final ShareService shareService;
    private final ShareMapper shareMapper;

    public ShareController(ShareService shareService, ShareMapper shareMapper) {
        this.shareService = shareService;
        this.shareMapper = shareMapper;
    }

    @PostMapping
    public ResponseEntity postShare(@PathVariable("balance-game-id") @Positive Long balanceGameId,
                                    @AuthenticationPrincipal Object principal,
                                    @Validated @RequestBody ShareDto.Post requestBody) {
        requestBody.setMemberEmail(principal.toString());
        requestBody.setBalanceGameId(balanceGameId);
        Share share = shareMapper.sharePostToShare(requestBody);
        Share createShare = shareService.createShare(share);

        return new ResponseEntity<>(
                new SingleResponseDto<>(createShare.getMember().getVotingRights()), HttpStatus.OK);
    }
}
