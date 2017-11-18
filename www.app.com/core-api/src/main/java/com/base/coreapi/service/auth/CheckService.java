package com.base.coreapi.service.auth;

import org.springframework.stereotype.Service;

@Service
public class CheckService {

    public String cleanseEmail(String email) {
        String username = email.split("@")[0];
        String domain = email.split("@")[1];
        String cleansed = username.split(
                "\\+")[0].split(" ")[0].replace(".", "");
        return cleansed + "@" + domain;
    }
}
