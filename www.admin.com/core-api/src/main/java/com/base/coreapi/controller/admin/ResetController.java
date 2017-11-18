package com.base.coreapi.controller.admin;


import com.base.coreapi.model.admin.Admin;
import com.base.coreapi.model.admin.AdminPasswordReset;
import com.base.coreapi.model.auth.ApplicationUser;
import com.base.coreapi.model.auth.request.ResetRequest;
import com.base.coreapi.model.common.response.SuccessResponse;
import com.base.coreapi.repository.admin.AdminRepository;
import com.base.coreapi.service.admin.AuthService;
import com.base.coreapi.service.admin.AdminPasswordResetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reset")
public class ResetController extends AuthAPI {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private AdminPasswordResetService adminPasswordResetService;

    @Autowired
    private AuthService authService;

    @GetMapping("/start")
    public SuccessResponse startProcess(@RequestParam String credential){
        Admin admin = adminService.getUserByCredential(credential);
        AdminPasswordReset reset = null;
        if (admin != null){
            reset = adminPasswordResetService.createReset(admin);
            if (reset != null) {
                emailServiceController.sendResetEmail(admin, reset);
            }
        }
        return new SuccessResponse(admin != null && reset != null);
    }

    @PostMapping("/finish")
    public SuccessResponse finishProcess(@RequestBody ResetRequest request){
        Boolean successful = false;
        Admin admin = adminRepository.findByName(request.getUsername());
        if (admin != null){
            if (adminPasswordResetService.applyReset(admin, request.getCode())){
                admin.setPassword(authService.hash(request.getPassword()));
                adminRepository.save(admin);
                successful = true;
            }
        }
        return new SuccessResponse(successful);
    }
}
