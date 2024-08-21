package com.springboot.image.service;

import com.springboot.exception.StorageException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Slf4j
public class FileSystemStorageService implements ImageService {
    private final Path rootLocation = Paths.get("D:\\moduon\\imgserver");
    @Override
    public String store(MultipartFile file) {
        try {
            if (file.isEmpty()) {
                throw new StorageException("Failed to store empty file.");
            }
            Path destinationFile = this.rootLocation.resolve(
                            Paths.get(file.getOriginalFilename())).normalize().toAbsolutePath();
            if (!destinationFile.getParent().equals(this.rootLocation.toAbsolutePath())) {
                // This is a security check
                throw new StorageException(
                        "Cannot store file outside current directory.");
            }
            try (InputStream inputStream = file.getInputStream()) {
                //log.info("# store coffee image!");

                String uri = destinationFile.toString();

                UUID one = UUID.randomUUID();

                String uri2 = uri.replace(file.getOriginalFilename(), one + file.getOriginalFilename());

                System.out.println(uri2);

                Files.copy(inputStream, Path.of(uri2), StandardCopyOption.REPLACE_EXISTING);

                return rootLocation.toString() + destinationFile.getFileName();
            }
        }
        catch (IOException e) {
            throw new StorageException("Failed to store file.", e);
        }
    }
}
