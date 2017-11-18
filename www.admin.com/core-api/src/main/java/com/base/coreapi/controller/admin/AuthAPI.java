package com.base.coreapi.controller.admin;

import com.base.coreapi.controller.microservice.EmailServiceController;
import com.base.coreapi.service.admin.AdminService;
import org.springframework.beans.factory.annotation.Autowired;

public abstract class AuthAPI {

    @Autowired
    AdminService adminService;

    @Autowired
    EmailServiceController emailServiceController;

}
