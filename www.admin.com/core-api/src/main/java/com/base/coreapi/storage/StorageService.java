package com.base.coreapi.storage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StorageService {

    private static final Path ROOT_LOCATION = Paths.get("external-images");

    @Autowired
    private S3Service s3Service;

    public void init() {
        try {
            Files.createDirectories(ROOT_LOCATION);
        }
        catch (IOException e) {
            System.out.println("Could not initialize storage: " + e.toString());
        }
    }

    public void store(MultipartFile file) {
        String filename = StringUtils.cleanPath(file.getOriginalFilename());
        try {
            Path filePath = ROOT_LOCATION.resolve(filename);
            Files.copy(file.getInputStream(), filePath,
                    StandardCopyOption.REPLACE_EXISTING);
            s3Service.uploadFile(filename, filePath.toString());
        } catch (Exception e) {
            System.out.println(e.toString());
        }
    }

    public List<String> loadAll() {
        try {
            return Files.walk(ROOT_LOCATION, 1)
                    .filter(path -> !path.equals(ROOT_LOCATION))
                    .map(path -> ROOT_LOCATION.relativize(path))
                    .map(path -> path.getFileName().toString())
                    .collect(Collectors.toList());
        }
        catch (IOException e) {
            System.out.println("Error: " + e.toString());
            return null;
        }
    }

    @Bean
    CommandLineRunner init(StorageService storageService) {
        return (args) -> storageService.init();
    }

}
