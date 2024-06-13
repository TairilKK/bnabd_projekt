package com.alibou.security.products;

import com.alibou.security.categories.Category;
import com.alibou.security.rents.Rent;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long productId;
    private String brand;
    private String model;
    private String size;
    private BigDecimal unitPrice;
    private Integer availability;
    private String conditionState;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "categoryId", referencedColumnName = "categoryId")
    private Category category;

    @OneToMany(mappedBy = "product")
    private List<Rent> rents;

    private String imagePath;
}
