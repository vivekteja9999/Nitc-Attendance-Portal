package com.example.ckcm.controller;
import com.example.ckcm.entities.User;
import com.example.ckcm.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
@RequestMapping(path = "/")
public class UserController {
    @Autowired
    private final UserService userService;
    public UserController(UserService userService) {
        this.userService = userService;
    }
    @GetMapping("/users")
    public String getUserDetails(Model model, @RequestParam("token") String token) {
        token = token.replace("Bearer ", "");
        model.addAttribute("user", userService.getUserdetails(token).orElse(null));
        return "users";
    }


}
