package com.alibou.security.rentdetails;

import com.alibou.security.rents.Rent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RentDetailRepository extends JpaRepository<RentDetail, Long> {
    List<RentDetail> findByRent(Rent rent);
}
