package com.alibou.security.products;

import com.alibou.security.categories.Category;
import com.alibou.security.categories.CategoryRepository;
import com.alibou.security.user.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductManager {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductManager(ProductRepository productRepository, UserRepository userRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
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

    public List<Product> findByCategory(String categoryName) {
        Optional<Category> category = categoryRepository.findByCategoryName(categoryName);
        return productRepository.findByCategory(category.get());
    }

    public List<Product> findByBrand(String brand) {
        return productRepository.findByBrand(brand);
    }

    List<Product> findByCategoryAndBrand(String categoryName, String brand) {
        Optional<Category> category = categoryRepository.findByCategoryName(categoryName);
        return productRepository.findByCategoryAndBrand(category.get(), brand);
    }

    public List<String> findDistinctBrands() {
        return productRepository.findDistinctBrands();
    }
}
