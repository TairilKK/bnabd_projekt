package com.alibou.security.categories;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/category")
@CrossOrigin(origins = "http://localhost:3000")
public class CategoryApi {
    private final CategoryManager categoryManager;

    public CategoryApi(CategoryManager categoryManager) {
        this.categoryManager = categoryManager;
    }

    @GetMapping("/allnames")
    public List<CategoryNameDTO> getAllNames() {
        return categoryManager.findAllNames();
    }
}
