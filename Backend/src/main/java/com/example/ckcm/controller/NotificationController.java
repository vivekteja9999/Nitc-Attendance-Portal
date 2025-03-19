package com.example.ckcm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Controller
@CrossOrigin(origins = "http://localhost:4200")
public class NotificationController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @PostMapping("/notify-admin")
    public void notifyAdmin(@RequestBody Map<String, String> payload) {
        String message = payload.get("message");
        messagingTemplate.convertAndSend("/topic/admin/notifications", Map.of("message", message));
    }

    @PostMapping("/notify-user/{email}")
    public void notifyUser(@PathVariable String email, @RequestBody Map<String, String> payload) {
        messagingTemplate.convertAndSend("/topic/user/" + email, payload);
    }
}