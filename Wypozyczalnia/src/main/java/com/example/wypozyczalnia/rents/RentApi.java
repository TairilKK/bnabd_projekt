package com.example.wypozyczalnia.rents;

import com.example.wypozyczalnia.products.Product;
import com.example.wypozyczalnia.products.ProductDTO;
import com.example.wypozyczalnia.users.User;
import com.example.wypozyczalnia.users.UserManager;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/rents")
@CrossOrigin(origins = "http://localhost:3000")
public class RentApi {
    private final RentManager rentManager;
    private final UserManager userManager;

    public RentApi(RentManager rentManager, UserManager userManager) {
        this.rentManager = rentManager;
        this.userManager = userManager;
    }

    @GetMapping("/all")
    public List<RentDTO> getAll() {
        List<Rent> rents = rentManager.FindAll();
        return mapRentToRentRecord(rents);
    }

    @GetMapping("/employee")
    public List<RentDTO> getAllEmployee(@RequestParam Long id) {
        Optional<User> employee = userManager.FindById(id);
        return employee.map(e -> mapRentToRentRecord(rentManager.FindByEmployee(e))).orElse(null);
    }

    @GetMapping("/client")
    public List<RentDTO> getAllClient(@RequestParam Long id) {
        Optional<User> client = userManager.FindById(id);
        return client.map(c -> mapRentToRentRecord(rentManager.FindByClient(c))).orElse(null);
    }

    private List<RentDTO> mapRentToRentRecord(List<Rent> rents) {
        return rents.stream().map(
                        rent -> new RentDTO(
                                rent.getRentId(),
                                rent.getProduct().getBrand(),
                                rent.getRentStart(),
                                rent.getRentEnd()
                        ))
                .collect(Collectors.toList());
    }
}
