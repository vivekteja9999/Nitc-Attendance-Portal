package com.example.ckcm.controller;

import com.example.ckcm.entities.Cycle;
import com.example.ckcm.entities.CycleBorrow;
import com.example.ckcm.repositories.CycleBorrowRepository;
import com.example.ckcm.repositories.CycleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping(path = "/cycles")
@CrossOrigin(origins = "http://localhost:4200")
public class CycleBorrowController {
    @Autowired
    private CycleBorrowRepository cycleBorrowRepository;

    @Autowired
    private CycleRepository cycleRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate; // WebSocket Notification

    @PostMapping("/borrow")
    public ResponseEntity<?> requestBorrow(@RequestBody CycleBorrow request) {
        Optional<Cycle> cycle = cycleRepository.findByCycleId(request.getCycleId());

        if (cycle.isPresent() && cycle.get().getStatus().equals("Available")) {
            request.setBorrowerEmail(request.getBorrowerEmail()); // ✅ Store the user's email
            request.setRequestTime(new Date());
            request.setStatus("Pending");

            CycleBorrow savedRequest = cycleBorrowRepository.save(request);

            // ✅ Mark cycle as "Pending" to avoid multiple borrow requests
            cycle.get().setStatus("Pending");
            cycleRepository.save(cycle.get());

            // ✅ Send WebSocket notification to Admin
            messagingTemplate.convertAndSend("/topic/admin/notifications", cycleBorrowRepository.findAll());

            // ✅ Return borrow request ID
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Borrow request sent to admin.");
            response.put("borrowRequestId", savedRequest.getId());

            return ResponseEntity.ok(response);
        }
        return ResponseEntity.badRequest().body(Map.of("message", "Cycle is not available."));
    }
    @GetMapping("/requests/{email}")
    public ResponseEntity<List<CycleBorrow>> getBorrowRequests(@PathVariable String email){
        System.out.println(cycleBorrowRepository.findByBorrowerEmail(email));
        return ResponseEntity.ok(cycleBorrowRepository.findByBorrowerEmail(email));
    }

//    @PutMapping("/return/{id}")
//    public ResponseEntity<?> returnCycle(@PathVariable String id, @RequestBody CycleBorrow req) {
//        Optional<Cycle> cycleOpt = cycleRepository.findByCycleId(id);
//
//        if (cycleOpt.isEmpty()) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cycle not found");
//        }
//
//        Cycle cycle = cycleOpt.get();
//
//        // Ensure the cycle is currently borrowed by the requester
//        if (!cycle.getBorrowedBy().equals(req.getBorrowerEmail())) {
//            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not the borrower of this cycle");
//        }
//
//        // Find the borrow request associated with this cycle and user
//        Optional<CycleBorrow> borrowRequestOpt = cycleBorrowRepository
//                .findByCycleIdAndBorrowerEmail(id, req.getBorrowerEmail());
//
//        if (borrowRequestOpt.isPresent()) {
//            CycleBorrow borrowRequest = borrowRequestOpt.get();
//
//            if (!"Approved".equals(borrowRequest.getStatus())) {
//                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//                        .body("Cycle cannot be returned as it was not approved for borrowing");
//            }
//
//            // Mark borrow request as returned
//            borrowRequest.setStatus("Return Requested");
//            cycleBorrowRepository.save(borrowRequest);
//
//            return ResponseEntity.ok("Return request sent for admin approval");
//        }
//
//        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No active borrow request found for this cycle");
//    }

}