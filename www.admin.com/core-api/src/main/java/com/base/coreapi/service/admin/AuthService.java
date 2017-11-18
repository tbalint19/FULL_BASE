package com.base.coreapi.service.admin;

import com.base.coreapi.model.admin.Admin;
import com.base.coreapi.model.auth.ApplicationUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public String hash(String rawPassword){
        return bCryptPasswordEncoder.encode(rawPassword);
    }

    public Admin authenticate(Admin admin, String rawPassword){
        if (admin == null){
            return null;
        }
        if (!checkPassword(rawPassword, admin.getPassword())){
            return null;
        }
        return admin;
    }

    private Boolean checkPassword(String rawPassword, String encodedPassword){
        return bCryptPasswordEncoder.matches(rawPassword, encodedPassword);
    }


}
