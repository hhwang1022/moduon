package com.springboot.image.service;
import org.springframework.web.multipart.MultipartFile;

public interface ImageService {
    String store(MultipartFile file);
}
