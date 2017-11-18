package com.base.usermaintenance.job;


import com.base.usermaintenance.model.ApplicationUser;
import com.base.usermaintenance.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;

@Component
public class UnconfirmedUserManager {

    @Autowired
    private UserRepository userRepository;

    // 3.6 million millisecond
    // 1 hour
    // delete every user, that is not confirmed in an hour
    private static final long DELETE_DELAY = 3600000;

    // 60000 milliseconds
    // 1 minute
    // waits 1 minute between 2 runs
    private static final long RUNNING_DELAY = 60000;

    @Scheduled(fixedDelay = RUNNING_DELAY)
    public void deleteUnconfirmed(){
        boolean status = false;
        long current = new Date().getTime();
        Date date = new Date();
        date.setTime(current - DELETE_DELAY);
        userRepository.deleteApplicationUserByConfirmedAndCreatedBefore(status, date);
    }
}
