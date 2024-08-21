package com.springboot.board.photo.controller;

import com.springboot.board.photo.dto.PhotoDto;
import com.springboot.board.photo.entity.Photo;
import com.springboot.board.photo.mapper.PhotoMapper;
import com.springboot.board.photo.service.PhotoService;
import com.springboot.dto.MultiResponseDto;
import com.springboot.dto.SingleResponseDto;
import com.springboot.utils.UriCreator;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

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
                                    @RequestParam String sort,
                                    @RequestParam String category) {
        Sort sortOrder = Sort.by(sort.split("_")[0]).ascending();
        if (sort.split("_")[1].equalsIgnoreCase("desc")) {
            sortOrder = sortOrder.descending();
        }

        Photo.Category photoCategory;
        try {
            photoCategory = Photo.Category.valueOf(category);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity("유효하지 않은 카테고리입니다.", HttpStatus.BAD_REQUEST);
        }

        Page<Photo> pagePhoto = photoService.findPhotosSort(page - 1, size, sortOrder, photoCategory);
        List<Photo> photos = pagePhoto.getContent();
        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.photosToPhotoResponseDtos(photos), pagePhoto), HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity search(@RequestParam String keyword,
                                 Model model,
                                 @PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable pageable,
                                 @RequestParam String category) {

        Photo.Category photoCategory;
        try {
            photoCategory = Photo.Category.valueOf(category);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>("Invalid category provided", HttpStatus.BAD_REQUEST);
        }

        int page = pageable.getPageNumber() > 0? pageable.getPageNumber() -1 : 0;
        pageable = PageRequest.of(page, pageable.getPageSize(), pageable.getSort());

        Page<Photo> searchList = photoService.search(pageable, keyword, photoCategory);
        List<PhotoDto.Response> responsesList = searchList.stream()
                .map(mapper::photoToPhotoResponseDto)
                .collect(Collectors.toList());
        return new ResponseEntity<>(
                new MultiResponseDto<>(responsesList, searchList), HttpStatus.OK
        );
    }

    @DeleteMapping("/{photo-id}")
    public ResponseEntity deletePhoto(@PathVariable("photo-id") @Positive long photoId) {
        photoService.deletePhoto(photoId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
