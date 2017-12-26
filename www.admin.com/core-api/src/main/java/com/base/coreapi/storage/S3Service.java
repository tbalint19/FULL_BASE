package com.base.coreapi.storage;

import com.amazonaws.AmazonClientException;
import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

@Service
public class S3Service {

    @Autowired
    private AmazonS3 s3client;

    @Value("${jsa.s3.bucket}")
    private String bucketName;

    public void uploadFile(String keyName, String filePath) {
        try {
            File file = new File(filePath);
            PutObjectRequest request = new PutObjectRequest(bucketName, keyName, file);
            s3client.putObject(request);
        } catch (AmazonServiceException ase) {
            System.out.println("service error");
        } catch (AmazonClientException ace) {
            System.out.println("client error");
        }
    }

}
