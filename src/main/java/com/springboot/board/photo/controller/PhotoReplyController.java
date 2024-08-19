package com.springboot.board.photo.controller;

import com.springboot.board.photo.dto.PhotoReplyDto;
import com.springboot.board.photo.entity.PhotoReply;
import com.springboot.board.photo.mapper.PhotoReplyMapper;
import com.springboot.board.photo.service.PhotoReplyService;
import com.springboot.board.post.mapper.PostReplyMapper;
import com.springboot.dto.SingleResponseDto;
import com.springboot.utils.UriCreator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;


@RestController
@RequestMapping("/photos/{photo-id}/reply")
public class PhotoReplyController {
    private final static String PHOTO_REPLY_DEFAULT_URL = "/reply";
    private final PhotoReplyService photoReplyService;
    private final PhotoReplyMapper mapper;

    public PhotoReplyController(PhotoReplyService photoReplyService,
                                PhotoReplyMapper mapper) {
        this.photoReplyService = photoReplyService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postPhotoReply(@Valid @RequestBody PhotoReplyDto.Post requestBody) throws IllegalAccessException {
        PhotoReply photoReply = mapper.photoReplyPostDtoToPhotoReply(requestBody);
        PhotoReply createPhotoReply = photoReplyService.createPhotoReply(photoReply);
        URI location = UriCreator.createUri(PHOTO_REPLY_DEFAULT_URL, createPhotoReply.getPhotoReplyId());
        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{reply-id}")
    public ResponseEntity patchPhotoReply(@PathVariable("reply-id") @Positive long photoReplyId,
                                          @Valid @RequestBody PhotoReplyDto.Patch requestBody) {
        requestBody.setPhotoReplyId(photoReplyId);
        PhotoReply updatePhotoReply = mapper.photoReplyPatchDtoToPhotoReply(requestBody);
        PhotoReply photoReply = photoReplyService.updatePhotoReply(updatePhotoReply);
        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.photoReplyToPhotoReplyResponseDto(photoReply)), HttpStatus.OK);
    }

    @DeleteMapping("/{reply-id}")
    public ResponseEntity deletePhotoReply(@PathVariable("reply-id") @Positive long photoReplyId) {
        photoReplyService.deletePhotoReply(photoReplyId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
