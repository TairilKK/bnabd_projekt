package com.alibou.security.rents;

public class RentCategoryStats {
    private String category;
    private Long rentCount;
    private Double totalRevenue;

    public RentCategoryStats(String category, Long rentCount, Double totalRevenue) {
        this.category = category;
        this.rentCount = rentCount;
        this.totalRevenue = totalRevenue;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Long getRentCount() {
        return rentCount;
    }

    public void setRentCount(Long rentCount) {
        this.rentCount = rentCount;
    }

    public Double getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(Double totalRevenue) {
        this.totalRevenue = totalRevenue;
    }
}
