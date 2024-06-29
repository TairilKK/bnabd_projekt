package com.alibou.security.rentdetails;

import com.alibou.security.products.Product;
import com.alibou.security.rents.Rent;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class RentDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long rentDetailId;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "rentId", referencedColumnName = "rentId")
    @JsonIgnore
    private Rent rent;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "productId", referencedColumnName = "productId")
    private Product product;

    private Long quantity;

}
