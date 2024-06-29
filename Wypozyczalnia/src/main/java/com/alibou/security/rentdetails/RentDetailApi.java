package com.alibou.security.rentdetails;

import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/rentdetails")
@CrossOrigin(origins = "http://localhost:3000")
public class RentDetailApi {
    RentDetailManager rentDetailManager;

    public RentDetailApi(RentDetailManager rentDetailManager) {
        this.rentDetailManager = rentDetailManager;
    }

    @GetMapping("/all")
    public List<RentDetailDTO> findAll(){
        return rentDetailManager.findAll();
    }

    @GetMapping("/rent")
    public List<RentDetailDTO> findByRentId(@RequestParam Long rentId){
        return rentDetailManager.findByRentId(rentId);
    }
}
