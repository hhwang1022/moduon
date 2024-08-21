package com.springboot.image.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

@Slf4j
public class S3StorageService implements ImageService {
    private static final String BUCKET_NAME = "be-kevin";
    private static final String BUCKET_COFFEE_IMAGE_PATH = "coffee_images";
    private final S3Client s3Client;

    public S3StorageService(S3Client s3Client) {
        this.s3Client = s3Client;
    }

    @Override
    public String store(MultipartFile multipartFile) {

        // S3 object의 키를 만든다.
        String key = makeS3OBjectKey(BUCKET_COFFEE_IMAGE_PATH, multipartFile);

        // S3에 Put할 때 필요한 PutObjectRequest 객체를 생성한다.
        PutObjectRequest request = createPutObjectRequest(BUCKET_NAME, key);

        try {
            final Path path = multipartFileToPath(multipartFile);
            PutObjectResponse response = s3Client.putObject(request,  path); // AWS S3로 업로드

            return path.toString();

            //log.info("# File uploaded to the s3 successfully. ETag: " + response.eTag());
        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
            s3Client.close();
        }
    }


    private String makeS3OBjectKey(String bucketCoffeeImagePath, MultipartFile multipartFile) {
        final String fileName = multipartFile.getOriginalFilename();
        return BUCKET_COFFEE_IMAGE_PATH.concat("/").concat(fileName);
    }

    private PutObjectRequest createPutObjectRequest(String bucketName, String key) {
        return PutObjectRequest.builder()
                .bucket(BUCKET_NAME)
                .key(key) // S3에 저장될 파일 이름
                .build();
    }

    private Path multipartFileToPath(MultipartFile multipartFile) {
        try {
            Path path = Files.createTempFile("temp", multipartFile.getOriginalFilename());
            
            // MultipartFile의 내용을 Path에 기록
            Files.write(path, multipartFile.getBytes());
            return path;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
