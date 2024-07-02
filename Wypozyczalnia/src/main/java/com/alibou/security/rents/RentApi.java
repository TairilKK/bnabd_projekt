package com.alibou.security.rents;

import com.alibou.security.products.ProductManager;
import com.alibou.security.user.User;
import com.alibou.security.user.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
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
    public Page<RentDTO> findClientRents(
            @RequestParam Long clientId,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false, defaultValue = "asc") String sortDir,
            Pageable pageable) {

        System.out.println("findClientRents called with clientId: " + clientId);
        User client = userService.FindById(clientId).orElseThrow(() -> new RuntimeException("Client not found"));
        System.out.println("Client found: " + client);

        Page<RentDTO> rents = rentManager.FindByClient(client, sortBy, sortDir, pageable);
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

    @DeleteMapping("/{rentId}")
    public ResponseEntity<?> deleteRent(@PathVariable Long rentId, Authentication authentication) {
        System.out.println("deleteRent called with rentId: " + rentId);

        // Znajdź zamówienie na podstawie rentId
        Rent rent = rentManager.FindById(rentId);
        if (rent == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Rent not found");
        }

        // Pobierz ID aktualnego użytkownika z tokenu JWT
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User currentUser = userService.FindByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Sprawdź, czy użytkownik jest właścicielem zamówienia
        if (!rent.getClient().getId().equals(currentUser.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not authorized to delete this rent");
        }

        // Usuń zamówienie
        rentManager.deleteById(rentId);
        return ResponseEntity.ok("Rent deleted successfully");
    }

}
