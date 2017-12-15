package com.base.coreapi.controller.upload;

import com.base.coreapi.storage.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@Controller
public class UploadController {

    private static final String REDIRECT_URL = "/faq";

    @Autowired
    private StorageService storageService;

    @PostMapping("/api/upload/file")
    public String uploadFile(@RequestParam("file") MultipartFile file) {


        storageService.store(file);

        return "redirect:" + REDIRECT_URL;
    }
}
