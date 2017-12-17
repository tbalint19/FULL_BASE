package com.base.coreapi.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewController {

    @RequestMapping(
            {"/", "/faq", "/calendar", "/messages", "/about", "/doctors","/reset", "/confirm"})
    public String index() {
        return "forward:/index.html";
    }
}
