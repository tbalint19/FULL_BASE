package com.base.coreapi.controller.info;

import com.base.coreapi.model.common.response.SuccessResponse;
import com.base.coreapi.model.info.MainMessage;
import com.base.coreapi.repository.info.MainMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/info/mainmessage")
public class MainMessageController {

    @Autowired
    private MainMessageRepository repository;

    @GetMapping("/get")
    public MainMessage get() {
        return repository.findByIdentifier("only-one");
    }

    @PostMapping("/update")
    public SuccessResponse update(@RequestBody MainMessage mainMessage){
        repository.save(mainMessage);
        return new SuccessResponse(true);
    }
}
