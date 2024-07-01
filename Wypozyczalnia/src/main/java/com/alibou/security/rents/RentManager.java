package com.alibou.security.rents;

import com.alibou.security.products.ProductManager;
import com.alibou.security.user.User;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RentManager {
    private final RentRepository rentRepository;
    private final ProductManager productManager;

    public RentManager(RentRepository rentRepository, ProductManager productManager) {
        this.rentRepository = rentRepository;
        this.productManager = productManager;
    }

    public List<RentDTO> FindAll() {
        System.out.println("FindAll called");
        return mapToRentDTOList(rentRepository.findAll());
    }

    public Rent FindById(Long id) {
        System.out.println("FindById called with id: " + id);
        return rentRepository.findById(id).orElse(null);
    }

    public List<RentDTO> FindByClient(User client) {
        System.out.println("FindByClient called with client: " + client);
        List<Rent> rents = rentRepository.findByClient(client);
        rents.forEach(rent -> {
            System.out.println("Rent ID: " + rent.getRentId());
            System.out.println("Product: " + (rent.getProduct() != null ? rent.getProduct().getBrand() : "No product"));
        });
        return mapToRentDTOList(rents);
    }


    public Rent save(Rent rent) {
        System.out.println("save called with rent: " + rent);
        return rentRepository.save(rent);
    }

    public List<RentDTO> mapToRentDTOList(List<Rent> rents) {
        System.out.println("mapToRentDTOList called with rents: " + rents);
        return rents.stream()
                .map(RentDTO::new)
                .collect(Collectors.toList());
    }
    public boolean isProductAvailable(Long productId, Date startDate, Date endDate, int requestedQuantity) {
        List<Rent> rents = rentRepository.findOverlappingRents(productId, startDate, endDate);
        int totalReserved = rents.stream().mapToInt(rent -> rent.getQuantity().intValue()).sum();
        int totalAvailable = productManager.FindProductById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"))
                .getAvailability();
        return (totalAvailable - totalReserved) >= requestedQuantity;
    }

}
