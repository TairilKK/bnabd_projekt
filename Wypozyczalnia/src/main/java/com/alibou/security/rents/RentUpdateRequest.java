package com.alibou.security.rents;

public class RentUpdateRequest {
    private Boolean isCompleted;
    private Boolean isRecived;

    // Gettery i settery
    public Boolean getIsCompleted() {
        return isCompleted;
    }
    public Boolean getIsRecived() {
        return isRecived;
    }

    public void setIsCompleted(Boolean isCompleted) {
        this.isCompleted = isCompleted;
    }
    public void setIsRecived(Boolean isRecived) { this.isRecived = isRecived; }
}
