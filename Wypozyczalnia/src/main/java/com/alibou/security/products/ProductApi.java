package com.alibou.security.products;

import com.alibou.security.categories.Category;
import org.springframework.web.bind.annotation.*;

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
    public Optional<ProductDetail> FindProductById(@RequestParam("id")Long id) {
        return mapProductToProductDetail(productManager.FindProductById(id));
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
    private Optional<ProductDetail> mapProductToProductDetail(Optional<Product> optionalProduct) {
        return optionalProduct.map(
                product -> new ProductDetail(
                        product.getProductId(),
                        product.getBrand(),
                        product.getModel(),
                        product.getSize(),
                        product.getAvailability(),
                        product.getUnitPrice(),
                        product.getImagePath()));
    }

}
