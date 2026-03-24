package com.abhishek.system;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
public class UrlService {

    private final UrlRepository repository;

    public UrlService(UrlRepository repository) {
        this.repository = repository;
    }

    // Generate short ID
    private String generateId() {
        String chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder sb = new StringBuilder();
        Random random = new Random();

        for (int i = 0; i < 6; i++) {
            sb.append(chars.charAt(random.nextInt(chars.length())));
        }

        return sb.toString();
    }

    public String createShortUrl(String originalUrl) {
        String id = generateId();

        Url url = new Url();
        url.setId(id);
        url.setOriginalUrl(originalUrl);
        url.setCreatedAt(LocalDateTime.now());

        repository.save(url);

        return "https://url-shortner-3qxg.onrender.com/" + id;
    }

    public Optional<Url> getOriginalUrl(String id) {
        return repository.findById(id);
    }
}