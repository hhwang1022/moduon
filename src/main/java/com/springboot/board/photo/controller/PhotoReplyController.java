package com.springboot.board.photo.controller;

import com.springboot.board.photo.dto.PhotoReplyDto;
import com.springboot.board.photo.entity.Photo;
import com.springboot.board.photo.entity.PhotoReply;
import com.springboot.board.photo.mapper.PhotoReplyMapper;
import com.springboot.board.photo.service.PhotoReplyService;
import com.springboot.board.photo.service.PhotoService;
import com.springboot.board.post.mapper.PostReplyMapper;
import com.springboot.dto.MultiResponseDto;
import com.springboot.dto.SingleResponseDto;
import com.springboot.utils.UriCreator;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;


@RestController
@RequestMapping("/photos/{photo-id}/reply")
public class PhotoReplyController {
    private final static String PHOTO_REPLY_DEFAULT_URL = "/photos/{photo-id}/reply";
    private final PhotoReplyService photoReplyService;

    private final PhotoService photoService;
    private final PhotoReplyMapper mapper;

    public PhotoReplyController(PhotoReplyService photoReplyService,
                                PhotoService photoService,
                                PhotoReplyMapper mapper) {
        this.photoReplyService = photoReplyService;
        this.photoService = photoService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postPhotoReply(@PathVariable("photo-id") @Positive long photoId,
                                         @AuthenticationPrincipal Object principal,
                                         @Valid @RequestBody PhotoReplyDto.Post requestBody) throws IllegalAccessException {
        requestBody.setMemberEmail(principal.toString());
        PhotoReply photoReply = mapper.photoReplyPostDtoToPhotoReply(requestBody);

        Photo photo = photoService.findPhotoById(photoId);
        photoReply.setPhoto(photo);

        PhotoReply createPhotoReply = photoReplyService.createPhotoReply(photoReply);

        URI location = UriCreator.createUri(PHOTO_REPLY_DEFAULT_URL.replace("{photo-id}", String.valueOf(photoId)), createPhotoReply.getPhotoReplyId());
        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{reply-id}")
    public ResponseEntity patchPhotoReply(@PathVariable("reply-id") @Positive long photoReplyId,
                                          @AuthenticationPrincipal Object principal,
                                          @Valid @RequestBody PhotoReplyDto.Patch requestBody) {
        requestBody.setPhotoReplyId(photoReplyId);
        requestBody.setMemberEmail(principal.toString());
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

    @GetMapping
    public ResponseEntity getPhotoReplies(@Positive @RequestParam int page, @Positive @RequestParam int size) {
        Page<PhotoReply> pagePhotoReplies = photoReplyService.findPhotoReplies(page - 1, size);
        List<PhotoReply> photoReplies = pagePhotoReplies.getContent();
        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.photoReplyToPhotoReplyResponseDtos(photoReplies), pagePhotoReplies), HttpStatus.OK
        );
    }
}
