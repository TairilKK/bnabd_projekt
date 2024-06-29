package com.alibou.security.rentdetails;

public record RentDetailDTO(Long rentDetailId, Long rentId, Long productId, Long quantity) {
    public RentDetailDTO(RentDetail rentDetail) {
        this(
                rentDetail.getRentDetailId(),
                rentDetail.getRent() != null ? rentDetail.getRent().getRentId() : null,
                rentDetail.getProduct() != null ? rentDetail.getProduct().getProductId() : null,
                rentDetail.getQuantity()
        );
    }
}
