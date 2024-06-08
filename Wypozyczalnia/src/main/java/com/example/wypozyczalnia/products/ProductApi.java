package com.example.wypozyczalnia.products;

import com.example.wypozyczalnia.categories.Category;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
public class ProductApi {
    private ProductManager productManager;

    public ProductApi(ProductManager productManager) {
        this.productManager = productManager;
    }

    @GetMapping("/all")
    public List<Product> getAll() {
        return productManager.FindAllProducts();
    }

    @GetMapping("/{brandName}")
    public List<Product> getByBrand(@PathVariable("brandName") String brand) {
        return productManager.findByBrandOrderByAvailability(brand);
    }

    @GetMapping("/{category}")
    public List<Product> getByCategory(@PathVariable("category") Category categoryId) {
        return productManager.findByCategory(categoryId);
    }
}
