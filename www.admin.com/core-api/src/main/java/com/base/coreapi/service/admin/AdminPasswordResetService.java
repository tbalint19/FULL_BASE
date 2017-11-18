package com.base.coreapi.service.admin;

import com.base.coreapi.model.admin.Admin;
import com.base.coreapi.model.admin.AdminPasswordReset;
import com.base.coreapi.model.auth.ApplicationUser;
import com.base.coreapi.model.auth.Reset;
import com.base.coreapi.repository.admin.AdminPasswordResetRepository;
import com.base.coreapi.repository.auth.ResetRepository;
import com.base.coreapi.service.common.RandomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class AdminPasswordResetService {

    @Autowired
    private RandomService randomService;

    @Autowired
    private AdminPasswordResetRepository resetRepository;

    // 300.000 millisecond
    // 5 minutes
    // a reset is acceptable for 5 minutes
    private static final long RESET_DELAY = 300000;

    public AdminPasswordReset createReset(Admin admin){
        AdminPasswordReset reset = new AdminPasswordReset();
        reset.setCode(randomService.getRandomString(25));
        reset.setAdminId(admin.getId());
        reset.setUsed(false);
        reset.setCreated(new Date());
        resetRepository.save(reset);
        return reset;
    }

    public Boolean applyReset(Admin admin, String code){
        Boolean successful = false;
        AdminPasswordReset reset = resetRepository.findByCode(code);
        if (reset != null && reset.getAdminId().equals(admin.getId())){
            if (inTime(reset)) {
                reset.setUsed(true);
                resetRepository.save(reset);
                successful = true;
            }
        }
        return successful;
    }

    public Boolean inTime(AdminPasswordReset reset){
        Long created = reset.getCreated().getTime();
        Long current = new Date().getTime();
        return created + RESET_DELAY > current;
    }
}
