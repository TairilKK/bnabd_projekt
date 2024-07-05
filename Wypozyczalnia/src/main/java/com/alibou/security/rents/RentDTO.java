package com.alibou.security.rents;

import java.util.Date;

public record RentDTO(Long rentId, Long clientId, Long productId, String productName, String productCategory, String productSize, Long quantity, Double rentPrice, Date rentStart, Date rentEnd, Boolean isReceived, Boolean isCompleted) {
    public RentDTO(Rent rent) {
        this(
                rent.getRentId(),
                rent.getClient() != null ? rent.getClient().getId() : null,
                rent.getProduct() != null ? rent.getProduct().getProductId() : null,
                rent.getProduct() != null ? rent.getProduct().getBrand() : null,
                rent.getProduct() != null ? rent.getProduct().getCategory().getCategoryName() : null,
                rent.getProduct() != null ? rent.getProduct().getSize() : null,
                rent.getQuantity(),
                rent.getRentPrice(),
                rent.getRentStart(),
                rent.getRentEnd(),
                rent.getIsReceived(),
                rent.getIsCompleted()
        );
    }
}
