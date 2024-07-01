package com.alibou.security.rents;

import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

public class RentRequest {
    private Long clientId;
    private Long productId;
    private Long quantity;
    private Double rentPrice;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private Date rentStart;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private Date rentEnd;

    // Gettery i settery

    public Long getClientId() {
        return clientId;
    }

    public void setClientId(Long clientId) {
        this.clientId = clientId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public Double getRentPrice() {
        return rentPrice;
    }

    public void setRentPrice(Double rentPrice) {
        this.rentPrice = rentPrice;
    }

    public Date getRentStart() {
        return rentStart;
    }

    public void setRentStart(Date rentStart) {
        this.rentStart = rentStart;
    }

    public Date getRentEnd() {
        return rentEnd;
    }

    public void setRentEnd(Date rentEnd) {
        this.rentEnd = rentEnd;
    }

    @Override
    public String toString() {
        return "RentRequest{" +
                "clientId=" + clientId +
                ", productId=" + productId +
                ", quantity=" + quantity +
                ", rentPrice=" + rentPrice +
                ", rentStart=" + rentStart +
                ", rentEnd=" + rentEnd +
                '}';
    }
}
