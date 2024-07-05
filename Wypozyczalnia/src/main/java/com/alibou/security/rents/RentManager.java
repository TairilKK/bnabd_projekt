package com.alibou.security.rents;

import com.alibou.security.products.ProductManager;
import com.alibou.security.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

    public Page<RentDTO> FindByClient(User client, String sortBy, String sortDir, Pageable pageable) {
        System.out.println("FindByClient called with client: " + client);

        Sort sort = Sort.by(sortBy != null ? sortBy : "rentStart");
        sort = sortDir.equalsIgnoreCase("desc") ? sort.descending() : sort.ascending();

        Pageable sortedPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort);
        Page<Rent> rents = rentRepository.findByClient(client, sortedPageable);

        return rents.map(RentDTO::new);
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

    public void deleteById(Long rentId) {
        System.out.println("deleteById called with rentId: " + rentId);
        rentRepository.deleteById(rentId);
    }

    public List<RentCategoryStats> getRentStatsByCategory() {
        return rentRepository.findRentStatsByCategory();
    }

    public Page<RentDTO> findAll(Pageable pageable) {
        return rentRepository.findAll(pageable).map(this::convertToDTO);
    }

    private RentDTO convertToDTO(Rent rent) {
        return new RentDTO(rent);
    }
}
