package com.alibou.security.products;

import com.alibou.security.categories.Category;
import com.alibou.security.user.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductManager {
    private final ProductRepository productRepository;

    public ProductDTO convertToDTO(Product product) {
        return new ProductDTO(
                product.getProductId(),
                product.getBrand(),
                product.getUnitPrice(),
                product.getImagePath()
        );
    }

    public ProductManager(ProductRepository productRepository, UserRepository userRepository) {
        this.productRepository = productRepository;
    }

    public Optional<Product> FindProductById(Long id) {
        return productRepository.findById(id);
    }
    public List<Product> FindAllProducts() {
        return productRepository.findAll();
    }

    public Product save(Product product) {
        return productRepository.save(product);
    }

    public void delete(Product product){
        productRepository.delete(product);
    }

    public List<Product> findByCategory(Category categoryId) {
        return productRepository.findByCategory(categoryId);
    }

    public List<Product> findByBrandOrderByAvailability(String brand) {
        return productRepository.findByBrandOrderByAvailability(brand);
    }

    public List<Product> findByModelOrderByAvailability(String model){
        return productRepository.findByModelOrderByAvailability(model);
    }

    public List<Product> findBySizeOrderByAvailability(String size){
        return productRepository.findBySizeOrderByAvailability(size);
    }
}
