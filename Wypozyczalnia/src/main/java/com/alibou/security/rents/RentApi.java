package com.alibou.security.rents;

import com.alibou.security.products.ProductManager;
import com.alibou.security.user.User;
import com.alibou.security.user.UserService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/v1/rents")
@CrossOrigin(origins = "http://localhost:3000")
public class RentApi {
    private final RentManager rentManager;
    private final UserService userService;
    private final ProductManager productManager;

    public RentApi(RentManager rentManager, UserService userService, ProductManager productManager) {
        this.rentManager = rentManager;
        this.userService = userService;
        this.productManager = productManager;
    }

    @GetMapping("/all")
    public List<RentDTO> findAllRents() {
        System.out.println("findAllRents called");
        return rentManager.FindAll();
    }

    @GetMapping("/client")
    public List<RentDTO> findClientRents(@RequestParam Long clientId) {
        System.out.println("findClientRents called with clientId: " + clientId);
        User client = userService.FindById(clientId).orElseThrow(() -> new RuntimeException("Client not found"));
        System.out.println("Client found: " + client);
        List<RentDTO> rents = rentManager.FindByClient(client);
        rents.forEach(rent -> System.out.println("Rent: " + rent));
        return rents;
    }

    @PostMapping("/reserve")
    public RentDTO reserveItem(@RequestBody RentRequest rentRequest) {
        System.out.println("reserveItem called with " + rentRequest);

        User client = userService.FindById(rentRequest.getClientId()).orElseThrow(() -> new RuntimeException("Client not found"));
        System.out.println("Client found: " + client);

        Rent newRent = Rent.builder()
                .client(client)
                .product(productManager.FindProductById(rentRequest.getProductId()).orElseThrow(() -> new RuntimeException("Product not found")))
                .quantity(rentRequest.getQuantity())
                .rentPrice(rentRequest.getRentPrice())
                .rentStart(rentRequest.getRentStart())
                .rentEnd(rentRequest.getRentEnd())
                .isCompleted(false)
                .build();
        newRent = rentManager.save(newRent);
        System.out.println("New rent saved: " + newRent);

        return new RentDTO(newRent);
    }

    @GetMapping("/availability")
    public boolean checkAvailability(
            @RequestParam Long productId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date endDate,
            @RequestParam int requestedQuantity) {
        return rentManager.isProductAvailable(productId, startDate, endDate, requestedQuantity);
    }

}
