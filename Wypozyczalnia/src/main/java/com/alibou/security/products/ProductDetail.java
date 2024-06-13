package com.alibou.security.products;

import java.math.BigDecimal;

public record ProductDetail(
        Long id,
        String brand,
        String model,
        String size,
        Integer availability,
        BigDecimal unitPrice,
        String imagePath) {
}
