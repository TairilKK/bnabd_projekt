package com.alibou.security;

import com.alibou.security.categories.Category;
import com.alibou.security.categories.CategoryRepository;
import com.alibou.security.products.Product;
import com.alibou.security.products.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.boot.CommandLineRunner;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public void run(String... args) throws Exception {
        List<String> cName = Arrays.asList(
                "NARTY", "KASKI", "KIJKI", "GOGLE",
                "SNOWBOARD", "BUTY SNOWBOARDOWE", "BUTY NARCIARSKIE");

        for (String name : cName) {
            Category category = new Category();
            category.setCategoryName(name);
            categoryRepository.save(category);
        }

        // Wyszukaj kategorię jeszcze raz, aby upewnić się, że jest zarządzana przez kontekst trwałości
        Optional<Category> optionalCategory = categoryRepository.findById(1L);
        if (optionalCategory.isPresent()) {
            Category category = optionalCategory.get();

            Product p = new Product();
            p.setImagePath("img_products/fischer_narty.jpg");
            p.setAvailability(44);
            p.setBrand("Fisher");
            p.setCategory(category);
            p.setModel("RC4RCS");
            p.setConditionState("Olśniewający");
            p.setSize("165cm");
            p.setUnitPrice(BigDecimal.valueOf(140));

            productRepository.save(p);
        } else {
            System.out.println("Category with ID 1 not found");
        }
    }
}
