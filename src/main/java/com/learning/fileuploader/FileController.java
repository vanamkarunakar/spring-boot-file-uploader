package com.learning.fileuploader;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/image")
@CrossOrigin
public class FileController {

    @Autowired
    private StorageService service;

    @PostMapping("/fileSystem")
    public ResponseEntity<?> uploadImage(@RequestParam("image") MultipartFile file) {
        try {
            String uploadImage = service.uploadFile(file);
            return ResponseEntity.status(HttpStatus.OK).body(uploadImage);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Upload failed: " + e.getMessage());
        }
    }

    @GetMapping("/{fileName}")
    public ResponseEntity<?> downloadImage(@PathVariable String fileName) {
        try {
            byte[] imageData = service.downloadImage(fileName);
            return ResponseEntity.status(HttpStatus.OK)
                    .contentType(MediaType.valueOf("image/png"))
                    .body(imageData);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Download failed: " + e.getMessage());
        }
    }
}