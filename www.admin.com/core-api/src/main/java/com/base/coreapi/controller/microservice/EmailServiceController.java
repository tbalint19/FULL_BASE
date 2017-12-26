package com.base.coreapi.controller.microservice;

import com.base.coreapi.model.admin.Admin;
import com.base.coreapi.model.admin.AdminPasswordReset;
import com.base.coreapi.model.auth.ApplicationUser;
import com.base.coreapi.model.auth.Reset;
import com.base.coreapi.model.auth.request.ResetEmailRequest;
import com.base.coreapi.model.common.response.AttemptResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class EmailServiceController {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${build.with.emailMock}")
    private Boolean SHOULD_MOCK;

    @Value("${app.url}")
    private String APP_URL;

    @Value("${service.email.url}")
    private String SERVICE_URL;

    private AttemptResponse post(String url, Object data){
        if (SHOULD_MOCK) {
            AttemptResponse response = new AttemptResponse();
            response.setAttempted(true);
            return response;
        }
        return restTemplate.postForObject(SERVICE_URL + "/api/send" + url, data , AttemptResponse.class);
    }

    public AttemptResponse sendResetEmail(Admin admin, AdminPasswordReset reset){
        ResetEmailRequest request = new ResetEmailRequest();
        request.setName(admin.getName());
        request.setTo(admin.getEmail());
        String url = APP_URL + "/reset?code=" + reset.getCode() + "&user=" + admin.getName();
        request.setLink(url);
        return post("/reset", request);
    }
}
