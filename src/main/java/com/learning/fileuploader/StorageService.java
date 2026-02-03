package com.learning.fileuploader;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Optional;

@Service
public class StorageService {

    @Autowired
    private FileDataRepository repository;

    private final String FOLDER_PATH = "/Users/vanamkarunakar/Desktop/my_uploads/";

    public String uploadFile(MultipartFile file) throws IOException {
        String filePath = FOLDER_PATH + file.getOriginalFilename();


        FileData fileData = repository.save(FileData.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .filePath(filePath).build());


        file.transferTo(new File(filePath));

        return "File uploaded successfully: " + filePath;
    }

    public byte[] downloadImage(String fileName) throws IOException {
        Optional<FileData> fileData = repository.findByName(fileName);

        if (fileData.isEmpty()) {
            throw new IOException("File not found in database: " + fileName);
        }

        String filePath = fileData.get().getFilePath();
        File fileOnDisk = new File(filePath);

        if (!fileOnDisk.exists()) {
            throw new IOException("File not found on disk: " + filePath);
        }

        return Files.readAllBytes(fileOnDisk.toPath());
    }
}