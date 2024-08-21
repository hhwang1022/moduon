package com.springboot.config;

import com.springboot.image.service.FileSystemStorageService;
import com.springboot.image.service.ImageService;
import com.springboot.image.service.S3StorageService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

@Configuration
public class ImageConfiguration {
    private static final String REGION = "ap-northeast-2";


    @Primary
    @Bean
    public ImageService fileSystemStorageService() {
        return new FileSystemStorageService();
    }


    @Bean
    public ImageService s3StorageService() {
        S3Client s3Client =
                S3Client.builder()
                        .region(Region.of(REGION))
                        .credentialsProvider(DefaultCredentialsProvider.create())
                        .build();
        return new S3StorageService(s3Client);
    }
}
