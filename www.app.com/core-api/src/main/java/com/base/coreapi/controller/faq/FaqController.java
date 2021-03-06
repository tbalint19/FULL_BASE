package com.base.coreapi.controller.faq;

import com.base.coreapi.model.faq.Faq;
import com.base.coreapi.repository.faq.FaqRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/faq")
public class FaqController {

    @Autowired
    private FaqRepository repository;

    @GetMapping("/all")
    public List<Faq> getAll() {
        return repository.findAll();
    }
}
