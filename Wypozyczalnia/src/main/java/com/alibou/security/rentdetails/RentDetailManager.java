package com.alibou.security.rentdetails;

import com.alibou.security.rents.Rent;
import com.alibou.security.rents.RentManager;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RentDetailManager {
    private final RentDetailRepository rentDetailRepository;
    private final RentManager rentManager;

    public RentDetailManager(RentDetailRepository rentDetailRepository, RentManager rentManager) {
        this.rentDetailRepository = rentDetailRepository;
        this.rentManager = rentManager;
    }

    public List<RentDetailDTO> findAll(){
        return mapToRentDetailDTOList(rentDetailRepository.findAll());
    }
    public List<RentDetailDTO> findByRentId(Long rentId){
        Rent rent = rentManager.FindById(rentId);
        return mapToRentDetailDTOList(rentDetailRepository.findByRent(rent));
    }

    public List<RentDetailDTO> mapToRentDetailDTOList(List<RentDetail> rentDetails) {
        return rentDetails.stream()
                .map(RentDetailDTO::new)
                .collect(Collectors.toList());
    }
}
