package com.alibou.security.products;

import java.math.BigDecimal;

public record ProductDTO(Long id, String brand, BigDecimal unitPrice,String size, String imagePath)  {

}
