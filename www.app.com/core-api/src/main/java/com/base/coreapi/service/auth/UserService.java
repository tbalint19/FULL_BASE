package com.base.coreapi.service.auth;

import com.base.coreapi.model.auth.ApplicationUser;
import com.base.coreapi.model.auth.Confirmation;
import com.base.coreapi.model.message.Channel;
import com.base.coreapi.repository.auth.UserRepository;
import com.base.coreapi.repository.message.ChannelRepository;
import com.base.coreapi.service.common.RandomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class UserService {

    @Autowired
    private TokenService tokenService;

    @Autowired
    private AuthService authService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ConfirmationService confirmationService;

    @Autowired
    private CheckService checkService;

    @Autowired
    private ChannelRepository channelRepository;

    public ApplicationUser getUserByCredential(String credential){
        ApplicationUser userInDb;
        if (credential.contains("@")){
            userInDb = userRepository.findByEmailIgnoreCase(
                    checkService.cleanseEmail(credential));
        } else {
            userInDb = userRepository.findByUsernameIgnoreCase(credential);
        }
        return userInDb;
    }

    public ApplicationUser createUser(ApplicationUser user, Confirmation confirmation){
        Channel channel = new Channel();
        channelRepository.save(channel);
        String hashedPassword = authService.hash(user.getPassword());
        user.setPassword(hashedPassword);
        user.setConfirmed(false);
        user.setConfirmation(confirmation);
        user.setCreated(new Date());
        user.setChannel(channel);
        String cleansedEmail = checkService.cleanseEmail(user.getEmail());
        user.setEmail(cleansedEmail);
        userRepository.save(user);
        return user;
    }

    public String loginUser(ApplicationUser user, String rawPassword){
        ApplicationUser authenticatedUser = authService.authenticate(user, rawPassword);
        String token = null;
        if (shouldLogin(authenticatedUser)){
            token = tokenService.createToken(
                    authenticatedUser.getUsername(),
                    authenticatedUser.getConfirmed());
        }
        return token;
    }

    private boolean shouldLogin(ApplicationUser user) {
        return user != null && (user.getConfirmed() || confirmationService.inTime(user));
    }

}
