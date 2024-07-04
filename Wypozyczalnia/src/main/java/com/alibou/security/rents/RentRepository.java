package com.alibou.security.rents;

import com.alibou.security.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Date;
import org.springframework.data.jpa.repository.Query;

public interface RentRepository extends JpaRepository<Rent, Long> {
    Page<Rent> findByClient(User client, Pageable pageable);

    @Query("SELECT r FROM Rent r WHERE r.product.productId = :productId AND " +
            "(r.rentStart <= :endDate AND r.rentEnd >= :startDate)")
    List<Rent> findOverlappingRents(Long productId, Date startDate, Date endDate);

    @Query("SELECT new com.alibou.security.rents.RentCategoryStats(r.product.category.categoryName, COUNT(r), SUM(r.rentPrice)) " +
            "FROM Rent r " +
            "GROUP BY r.product.category.categoryName")
    List<RentCategoryStats> findRentStatsByCategory();
}
