package com.base.coreapi.controller.admin;

import com.base.coreapi.model.admin.Admin;
import com.base.coreapi.model.auth.ApplicationUser;
import com.base.coreapi.model.admin.request.LoginRequest;
import com.base.coreapi.model.auth.response.TokenResponse;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AuthController extends AuthAPI {

    @PostMapping("/login")
    public TokenResponse loginAdmin(@RequestBody LoginRequest request){
        Admin admin = adminService.getUserByCredential(request.getCredential());
        String token = adminService.loginAdmin(admin, request.getPassword());
        return new TokenResponse(token);
    }

}
