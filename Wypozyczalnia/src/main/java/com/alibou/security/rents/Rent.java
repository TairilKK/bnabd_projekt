package com.alibou.security.rents;

import com.alibou.security.user.User;
import com.alibou.security.products.Product;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Rent {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long rentId;

    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id", referencedColumnName = "id")
    @JsonBackReference
    private User client;

    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", referencedColumnName = "productId")
    private Product product;

    private Long quantity;
    private Double rentPrice;
    private Date rentStart;
    private Date rentEnd;
    private Boolean isReceived;
    private Boolean isCompleted;
}
