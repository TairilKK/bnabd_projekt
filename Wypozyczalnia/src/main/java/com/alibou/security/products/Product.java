package com.alibou.security.products;

import com.alibou.security.categories.Category;
import com.alibou.security.rentdetails.RentDetail;
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
    private String type;
    private BigDecimal unitPrice;
    private Integer availability;
    private String conditionState;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "categoryId", referencedColumnName = "categoryId")
    private Category category;

    @OneToMany(mappedBy = "product")
    @JsonIgnore
    private List<RentDetail> rentDetails;

    private String imagePath;

    @Override
    public String toString() {
        return "Product{" +
                "productId=" + productId +
                ", brand='" + brand + '\'' +
                ", model='" + model + '\'' +
                ", size='" + size + '\'' +
                ", type='" + type + '\'' +
                ", unitPrice=" + unitPrice +
                ", availability=" + availability +
                ", conditionState='" + conditionState + '\'' +
                ", imagePath='" + imagePath + '\'' +
                '}';
    }
}
