package com.example.ckcm.services;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.example.ckcm.repositories.KeyRepository;
import com.example.ckcm.entities.Key;

@Service
@RequiredArgsConstructor
public class KeyService {
    private final KeyRepository keyRepository;
    public Key registerKey(String keyId, String Location){
        if(keyRepository.findByKeyIdAndLocation(keyId,Location).isPresent()){
            throw new IllegalArgumentException("Key already exists");
        }
        Key key = Key.builder()
                .keyId(keyId)
                .location(Location)
                .status("Available")
                .borrowedAt(null)
                .borrowedBy(null)
                .build();
        return keyRepository.save(key);
    }
}
