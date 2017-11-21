package com.base.coreapi.service.message;

import com.base.coreapi.model.auth.ApplicationUser;
import com.base.coreapi.model.message.Message;
import com.base.coreapi.repository.message.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class MessageService {

    @Autowired
    private MessageRepository repository;

    public void createMessage(ApplicationUser user, String messageContent){
        Message message = new Message();
        message.setChannel(user.getChannel());
        message.setIsUserMessage(true);
        message.setText(messageContent);
        message.setCreated(new Date());
        repository.save(message);
    }
}
