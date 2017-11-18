package com.base.coreapi.service.admin;

import com.base.coreapi.model.admin.Admin;
import com.base.coreapi.repository.admin.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    private TokenService tokenService;

    @Autowired
    private AuthService authService;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private CheckService checkService;

    public Admin getUserByCredential(String credential){
        Admin adminInDb;
        if (credential.contains("@")){
            adminInDb = adminRepository.findByEmailIgnoreCase(
                    checkService.cleanseEmail(credential));
        } else {
            adminInDb = adminRepository.findByNameIgnoreCase(credential);
        }
        return adminInDb;
    }

    public String loginAdmin(Admin admin, String rawPassword){
        Admin authenticatedAdmin = authService.authenticate(admin, rawPassword);
        return shouldLogin(authenticatedAdmin) ?
                tokenService.createToken(authenticatedAdmin.getName()) : null;
    }

    private Boolean shouldLogin(Admin admin){
        return admin != null;
    }

}
