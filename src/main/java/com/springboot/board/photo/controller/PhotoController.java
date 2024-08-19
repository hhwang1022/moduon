package com.springboot.board.photo.controller;

import com.springboot.board.photo.dto.PhotoDto;
import com.springboot.board.photo.entity.Photo;
import com.springboot.board.photo.mapper.PhotoMapper;
import com.springboot.board.photo.service.PhotoService;
import com.springboot.dto.MultiResponseDto;
import com.springboot.dto.SingleResponseDto;
import com.springboot.utils.UriCreator;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/photos")
public class PhotoController {
    private final static String PHOTO_DEFAULT_URL = "/photos";
    private final PhotoService photoService;
    private final PhotoMapper mapper;

    public PhotoController(PhotoService photoService,
                           PhotoMapper mapper) {
        this.photoService = photoService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postPhoto(@Valid @RequestBody PhotoDto.Post requestBody) throws IllegalAccessException {
        Photo photo = mapper.photoPostDtoToPhoto(requestBody);
        Photo createPhoto = photoService.createPhoto(photo);
        URI location = UriCreator.createUri(PHOTO_DEFAULT_URL, createPhoto.getPhotoId());
        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{photo-id}")
    public ResponseEntity patchPhoto(@PathVariable("photo-id") @Positive long photoId,
                                     @Valid @RequestBody PhotoDto.Patch requestBody) {
        requestBody.setPhotoId(photoId);
        Photo photo = photoService.updatePhoto(mapper.photoPatchDtoToPhoto(requestBody));
        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.photoToPhotoResponseDto(photo)), HttpStatus.OK);
    }

    @GetMapping("/{photo-id}")
    public ResponseEntity getPhoto(@PathVariable("photo-id") @Positive long photoId) {
        Photo photo = photoService.findPhoto(photoId);
        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.photoToPhotoResponseDto(photo)), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getPhotos(@Positive @RequestParam int page,
                                    @Positive @RequestParam int size,
                                    @RequestParam String sort) {
        Sort sortOrder = Sort.by(sort.split("_")[0]).ascending();
        if (sort.split("_")[1].equalsIgnoreCase("desc")) {
            sortOrder = sortOrder.descending();
        }

        Page<Photo> pagePhoto = photoService.findPhotosSort(page - 1, size, sortOrder);
        List<Photo> photos = pagePhoto.getContent();
        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.photosToPhotoResponseDtos(photos), pagePhoto), HttpStatus.OK);
    }

    @DeleteMapping("/{photo-id}")
    public ResponseEntity deletePhoto(@PathVariable("photo-id") @Positive long photoId) {
        photoService.deletePhoto(photoId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
