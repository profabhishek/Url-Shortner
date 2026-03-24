package com.abhishek.system;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Map;

@RestController
public class UrlController {

    private final UrlService service;

    public UrlController(UrlService service) {
        this.service = service;
    }

    @PostMapping("/shorten")
    public ResponseEntity<?> shorten(@RequestBody Map<String, String> request) {
        String originalUrl = request.get("url");
        String shortUrl = service.createShortUrl(originalUrl);
        return ResponseEntity.ok(Map.of("short_url", shortUrl));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> redirect(@PathVariable String id) {
        return service.getOriginalUrl(id)
                .map(url -> ResponseEntity
                        .status(302)
                        .location(URI.create(url.getOriginalUrl()))
                        .build())
                .orElse(ResponseEntity.notFound().build());
    }
}