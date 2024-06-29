package com.alibou.security.rents;

import com.alibou.security.user.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RentManager {
    private final RentRepository rentRepository;

    public RentManager(RentRepository rentRepository) {
        this.rentRepository = rentRepository;
    }

    public List<RentDTO> FindAll(){
        return mapToRentDTOList(rentRepository.findAll());
    }

    public Rent FindById(Long id){
        return rentRepository.findById(id).get();
    }

    public List<RentDTO> FindByEmployee(User employee){
        return mapToRentDTOList(rentRepository.findByEmployee(employee));
    }

    public List<RentDTO> FindByClient(User client){
        return mapToRentDTOList(rentRepository.findByClient(client));
    }

    public List<RentDTO> mapToRentDTOList(List<Rent> rents) {
        return rents.stream()
                .map(RentDTO::new)
                .collect(Collectors.toList());
    }
}
