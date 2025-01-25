package com.example.ckcm.controller;
import com.example.ckcm.entities.User;
import com.example.ckcm.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import java.util.List;

@Controller
@RequestMapping(path = "/")
public class UserController {
    @Autowired
    private UserService userService;
    @GetMapping("/users")
    public String getAllUsers(Model model){
        model.addAttribute("users",userService.getAllUsers());
        return "users";
    }

}
