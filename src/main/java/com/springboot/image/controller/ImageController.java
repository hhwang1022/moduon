package com.springboot.image.controller;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.springboot.image.dto.ImageDto;
import com.springboot.image.service.ImageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/images")
public class ImageController {

    final private ImageService imageService;

    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

//    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
//    public ResponseEntity postImage(@Valid @RequestPart("imageDto") ImageDto imageDto,
//                                    @RequestPart("multipartFile") MultipartFile multipartFile){
//        imageService.store(multipartFile);
//        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//    }

    @PostMapping
    public ResponseEntity<?> uploadImage(
            @RequestParam("imageDto") String imageDto,
            @RequestParam("multipartFile") MultipartFile multipartFile) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        ImageDto dto = objectMapper.readValue(imageDto, ImageDto.class);

        String uri = imageService.store(multipartFile);

        return ResponseEntity.ok(uri);
    }
}
