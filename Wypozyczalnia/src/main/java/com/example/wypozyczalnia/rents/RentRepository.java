package com.example.wypozyczalnia.rents;

import com.example.wypozyczalnia.users.User;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.wypozyczalnia.rents.Rent;
import java.util.List;

public interface RentRepository extends JpaRepository<Rent, Long> {
    List<Rent> findByClient(User client);
    List<Rent> findByEmployee(User employee);
}
