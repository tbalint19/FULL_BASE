package com.base.coreapi.controller.view;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewController {

    @RequestMapping(
        {"/", "/faq", "/calendar", "/messages", "/edit", "/security","/reset"})
    public String index() {
        return "forward:/index.html";
    }
}
