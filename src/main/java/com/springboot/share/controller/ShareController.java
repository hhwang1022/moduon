package com.springboot.share.controller;

import com.springboot.share.dto.ShareDto;
import com.springboot.share.entity.Share;
import com.springboot.share.mapper.ShareMapper;
import com.springboot.share.repository.ShareRepository;
import com.springboot.share.service.ShareService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;

@RestController
@RequestMapping
public class ShareController {
    private final ShareService shareService;
    private final ShareMapper shareMapper;

    public ShareController(ShareService shareService, ShareMapper shareMapper) {
        this.shareService = shareService;
        this.shareMapper = shareMapper;
    }

    @PostMapping("/balancegames/{balance-game-id}/share")
    public ResponseEntity postShare(@PathVariable("balance-game-id") @Positive Long balanceGameId,
                                    @Validated @RequestBody ShareDto.Post requestBody) {
        requestBody.setBalanceGameId(balanceGameId);
        Share share = shareMapper.sharePostToShare(requestBody);
        Share createShare = shareService.createShare(share);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
