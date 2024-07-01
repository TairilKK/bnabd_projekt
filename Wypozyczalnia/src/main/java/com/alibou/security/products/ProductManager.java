package com.alibou.security.products;

import com.alibou.security.categories.Category;
import com.alibou.security.categories.CategoryRepository;
import com.alibou.security.user.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

    public Optional<Product> FindProductById(Long productId) {
        return productRepository.findById(productId);
    }
    public Page<Product> FindAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    public Product save(Product product) {
        return productRepository.save(product);
    }

    public void delete(Product product){
        productRepository.delete(product);
    }

    public Page<Product> findByCategory(String categoryName, Pageable pageable) {
        Optional<Category> category = categoryRepository.findByCategoryName(categoryName);
        return productRepository.findByCategory(category.get(), pageable);
    }

    public Page<Product> findByBrand(String brand, Pageable pageable) {
        return productRepository.findByBrand(brand, pageable);
    }

    Page<Product> findByCategoryAndBrand(String categoryName, String brand, Pageable pageable) {
        Optional<Category> category = categoryRepository.findByCategoryName(categoryName);
        return productRepository.findByCategoryAndBrand(category.get(), brand, pageable);
    }

    public List<String> findDistinctBrands() {
        return productRepository.findDistinctBrands();
    }

    public Product saveProduct(Product product) {
        System.out.println("Saving product: " + product);
        try {
            return productRepository.save(product);
        } catch (Exception e) {
            System.err.println("Error in saveProduct: " + e.getMessage());
            throw new RuntimeException("Error in saveProduct", e);
        }
    }

    public List<String> findDistinctCategories() {
        return productRepository.findDistinctCategories();
    }

}
