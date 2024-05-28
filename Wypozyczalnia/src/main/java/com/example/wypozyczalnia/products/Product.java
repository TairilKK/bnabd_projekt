package com.example.wypozyczalnia.products;

import com.example.wypozyczalnia.categories.Category;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long productId;
    private String brand;
    private String model;
    private Double size;
    private BigDecimal unitPrice;
    private Integer availability;
    private String conditionState;
    private String comments;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "categoryId", referencedColumnName = "categoryId")
    private Category category;

    protected Product() {
        super();
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public Double getSize() {
        return size;
    }

    public void setSize(Double size) {
        this.size = size;
    }

    public Integer getAvailability() {
        return availability;
    }

    public void setAvailability(Integer availability) {
        this.availability = availability;
    }

    public String getConditionState() {
        return conditionState;
    }

    public void setConditionState(String conditionState) {
        this.conditionState = conditionState;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
