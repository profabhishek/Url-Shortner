package com.abhishek.system;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import java.time.LocalDateTime;

@Entity
public class Url {

    @Id
    private String id;  // short_id

    private String originalUrl;

    private LocalDateTime createdAt;

    // ===== Getters =====
    public String getId() {
        return id;
    }

    public String getOriginalUrl() {
        return originalUrl;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    // ===== Setters =====
    public void setId(String id) {
        this.id = id;
    }

    public void setOriginalUrl(String originalUrl) {
        this.originalUrl = originalUrl;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}