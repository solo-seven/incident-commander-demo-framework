package com.example.demo;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

import java.util.Iterator;

@RestController
@RequestMapping("/info")
@CrossOrigin(origins = {"http://localhost:3000", "http://frontend.dsdemo.valesordev.com:3000", "http://frontend.dsdemo.valesordev.com"})
public class InfoController {
    @GetMapping
    public SiteInformation getSiteInformation(WebRequest request) {
        return new SiteInformation(new String[] {"testFlag"});
    }
}
