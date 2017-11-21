package com.base.coreapi.controller.message;

import com.base.coreapi.model.auth.ApplicationUser;
import com.base.coreapi.model.common.response.SuccessResponse;
import com.base.coreapi.model.messages.Message;
import com.base.coreapi.model.messages.dto.RespondDTO;
import com.base.coreapi.repository.auth.UserRepository;
import com.base.coreapi.service.message.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/message")
public class MessageController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MessageService service;

    @GetMapping("/users")
    public List<ApplicationUser> getAllUsers(){
        List<ApplicationUser> all = new ArrayList<>();
        for (ApplicationUser user: userRepository.findAll()) {
            all.add(user);
        }
        return all;
    }

    @GetMapping("/all")
    public List<Message> getAllMessages(@RequestParam Long userId){
        ApplicationUser user = userRepository.findById(userId);
        return user.getChannel().getMessages();
    }

    @PostMapping("/respond")
    public SuccessResponse respond(@RequestBody RespondDTO dto){
        ApplicationUser user = userRepository.findById(dto.getUserId());
        service.respondToUser(user, dto.getMessageContent());
        return new SuccessResponse(true);
    }
}
