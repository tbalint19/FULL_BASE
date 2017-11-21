package com.base.coreapi.controller.message;

import com.base.coreapi.model.auth.ApplicationUser;
import com.base.coreapi.model.common.response.SuccessResponse;
import com.base.coreapi.model.message.Message;
import com.base.coreapi.model.message.dto.MessageCreateDTO;
import com.base.coreapi.repository.auth.UserRepository;
import com.base.coreapi.service.message.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/message")
public class MessageController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MessageService service;

    @GetMapping("/all")
    public List<Message> getAll(Principal principal){
        ApplicationUser user = userRepository.findByUsername(principal.getName());
        return user.getChannel().getMessages();
    }

    @PostMapping("/send")
    public SuccessResponse send(@RequestBody MessageCreateDTO dto, Principal principal){
        ApplicationUser user = userRepository.findByUsername(principal.getName());
        service.createMessage(user, dto.getText());
        return new SuccessResponse(true);
    }
}
