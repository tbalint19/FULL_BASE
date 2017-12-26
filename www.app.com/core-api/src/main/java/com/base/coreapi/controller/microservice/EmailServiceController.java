package com.base.coreapi.controller.microservice;

import com.base.coreapi.model.auth.ApplicationUser;
import com.base.coreapi.model.auth.Reset;
import com.base.coreapi.model.auth.request.ConfirmEmailRequest;
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

    @Value("${app.url}")
    private String APP_URL;

    @Value("${service.email.url}")
    private String SERVICE_URL;

    @Value("${build.with.emailMock}")
    private Boolean SHOULD_MOCK;

    private AttemptResponse post(String url, Object data){
        if (SHOULD_MOCK) {
            return new AttemptResponse(true);
        }
        return restTemplate.postForObject(SERVICE_URL + "/api/send" + url, data , AttemptResponse.class);
    }

    public AttemptResponse sendConfirmationEmail(ApplicationUser user){
        ConfirmEmailRequest request = new ConfirmEmailRequest();
        request.setTo(user.getEmail());
        request.setName(user.getUsername());
        String url = APP_URL + "/confirm?code=" + user.getConfirmation().getCode() + "&user=" + user.getUsername();
        request.setLink(url);
        request.setConfirmationCode(user.getConfirmation().getCode());
        return post("/confirmation", request);
    }

    public AttemptResponse sendResetEmail(ApplicationUser user, Reset reset){
        ResetEmailRequest request = new ResetEmailRequest();
        request.setName(user.getUsername());
        request.setTo(user.getEmail());
        String url = APP_URL + "/reset?code=" + reset.getCode() + "&user=" + user.getUsername();
        request.setLink(url);
        return post("/reset", request);
    }
}
