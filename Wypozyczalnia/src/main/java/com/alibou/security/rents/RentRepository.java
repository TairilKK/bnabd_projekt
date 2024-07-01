package com.alibou.security.rents;

import com.alibou.security.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Date;
import org.springframework.data.jpa.repository.Query;

public interface RentRepository extends JpaRepository<Rent, Long> {
    List<Rent> findByClient(User client);

    @Query("SELECT r FROM Rent r WHERE r.product.productId = :productId AND " +
            "(r.rentStart <= :endDate AND r.rentEnd >= :startDate)")
    List<Rent> findOverlappingRents(Long productId, Date startDate, Date endDate);
}