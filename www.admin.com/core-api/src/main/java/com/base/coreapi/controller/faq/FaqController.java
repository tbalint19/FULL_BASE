package com.base.coreapi.controller.faq;

import com.base.coreapi.model.common.response.SuccessResponse;
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

    @PostMapping("/create")
    public SuccessResponse create(@RequestBody Faq faq) {
        repository.save(faq);
        return new SuccessResponse(true);
    }

    @PostMapping("/delete")
    public SuccessResponse delete(@RequestBody Faq faq) {
        repository.delete(faq);
        return new SuccessResponse(true);
    }
}
