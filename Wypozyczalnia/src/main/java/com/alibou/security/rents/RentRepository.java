package com.alibou.security.rents;

import com.alibou.security.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RentRepository extends JpaRepository<Rent, Long> {
    List<Rent> findByClient(User client);
    List<Rent> findByEmployee(User employee);
}
