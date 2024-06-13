package com.alibou.security.rents;

import com.alibou.security.user.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RentManager {
    private final RentRepository rentRepository;

    public RentManager(RentRepository rentRepository) {
        this.rentRepository = rentRepository;
    }

    public List<Rent> FindAll(){
        return rentRepository.findAll();
    }

    public List<Rent> FindByEmployee(User employee){
        return rentRepository.findByEmployee(employee);
    }

    public List<Rent> FindByClient(User client){
        return rentRepository.findByClient(client);
    }
}
