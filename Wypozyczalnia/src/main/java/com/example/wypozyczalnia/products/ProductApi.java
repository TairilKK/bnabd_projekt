package com.example.wypozyczalnia.products;

import com.example.wypozyczalnia.categories.Category;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductApi {
    private ProductManager productManager;

    public ProductApi(ProductManager productManager) {
        this.productManager = productManager;
    }

    @GetMapping("/all")
    public List<ProductDTO> getAll() {
        return mapProductToProductRecord(productManager.FindAllProducts());
    }

    @GetMapping("/product")
    public Optional<Product> FindProductById(@RequestParam("id")Long id) {
        return productManager.FindProductById(id);
    }

    @GetMapping("/brand")
    public List<Product> getByBrand(@RequestParam("brandName") String brand) {
        return productManager.findByBrandOrderByAvailability(brand);
    }

    @GetMapping("/category")
    public List<Product> getByCategory(@RequestParam("category") Category categoryId) {
        return productManager.findByCategory(categoryId);
    }

    private List<ProductDTO> mapProductToProductRecord(List<Product> products) {
        return products.stream().map(
                        product -> new ProductDTO(
                                product.getProductId(),
                                product.getBrand(),
                                product.getUnitPrice(),
                                product.getImagePath()))
                .collect(Collectors.toList());
    }
}
