package com.alibou.security.categories;

import com.alibou.security.products.Product;
import com.alibou.security.products.ProductDTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryManager {
    CategoryRepository categoryRepository;

    public CategoryManager(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<CategoryNameDTO> findAllNames() {
        return categoryRepository.findAll().stream()
                .map(category -> new CategoryNameDTO(
                        category.getCategoryName()
                ))
                .collect(Collectors.toList());
    }
}
