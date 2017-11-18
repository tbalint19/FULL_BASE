package com.base.coreapi.config;

import com.base.coreapi.model.admin.Admin;
import com.base.coreapi.model.admin.Permission;
import com.base.coreapi.repository.admin.AdminRepository;
import com.base.coreapi.repository.admin.PermissionRepository;
import com.base.coreapi.service.admin.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.HashSet;
import java.util.Set;

@Component
public class InitialLoader {

    @Autowired
    private PermissionRepository permissionRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private AuthService authService;

    @PostConstruct
    public void InitialPermission(){
        Permission permission = new Permission();
        permission.setName("default-admin");
        permissionRepository.save(permission);
        Admin admin = new Admin();
        admin.setName("admin");
        admin.setEmail("toth910719balint@gmail.com");
        admin.setPassword(authService.hash("0123456789"));
        admin.setActive(true);
        adminRepository.save(admin);
        Set<Permission> permissions = new HashSet<>();
        permissions.add(permission);
        admin.setPermissions(permissions);
        adminRepository.save(admin);
    }
}
