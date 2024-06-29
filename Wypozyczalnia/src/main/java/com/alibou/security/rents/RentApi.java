package com.alibou.security.rents;

import com.alibou.security.categories.CategoryManager;
import com.alibou.security.categories.CategoryRepository;
import com.alibou.security.products.ProductManager;
import com.alibou.security.rentdetails.RentDetailManager;
import com.alibou.security.user.User;
import com.alibou.security.user.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/rents")
@CrossOrigin(origins = "http://localhost:3000")
public class RentApi {
    private final RentManager rentManager;
    private final CategoryManager categoryManager;
    private final ProductManager productManager;
    private final UserService userService;
    private final RentDetailManager rentDetailManager;

    public RentApi(RentManager rentManager, CategoryManager categoryManager, ProductManager productManager, UserService userService, RentDetailManager rentDetailManager) {
        this.rentManager = rentManager;
        this.categoryManager = categoryManager;
        this.productManager = productManager;
        this.userService = userService;
        this.rentDetailManager = rentDetailManager;
    }

    @GetMapping("/all")
    public List<RentDTO> findAllRents() {
        return rentManager.FindAll();
    }

    @GetMapping("/client")
    public List<RentDTO> findClientRents(@RequestParam Long clientId) {
        User client = userService.FindById(clientId).get();
        return rentManager.FindByClient(client);
    }

    @GetMapping("/employee")
    public List<RentDTO> findEmployeesRents(@RequestParam Long employeeId) {
        User emp = userService.FindById(employeeId).get();
        return rentManager.FindByEmployee(emp);
    }
}
