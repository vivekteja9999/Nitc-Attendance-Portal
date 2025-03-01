package com.example.ckcm.controller;

import com.example.ckcm.auth.AuthenticationRequest;
import com.example.ckcm.auth.RegisterRequest;
import com.example.ckcm.entities.User;
import com.example.ckcm.services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(path = "/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    @Autowired
    private AuthenticationService authenticationService;

    @GetMapping("/register")
    public String showRegistrationForm(Model model) {
        model.addAttribute("user", new User());
        return "register";
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @PostMapping("/register")
    public String register(@ModelAttribute User user) {
        RegisterRequest request = new RegisterRequest(user.getFirstName(), user.getLastName(), user.getEmail(), user.getPassword());
        authenticationService.register(request);
        return "redirect:/auth/login";
    }

    @PostMapping("/authenticate")
    public String authenticate(@ModelAttribute AuthenticationRequest request, Model model) {
        try {
            var response = authenticationService.authenticate(request);
            return "redirect:/users?token=" + response.getToken();
        } catch (Exception e) {
            model.addAttribute("error", e.getMessage());
            return "login";
        }
    }
}