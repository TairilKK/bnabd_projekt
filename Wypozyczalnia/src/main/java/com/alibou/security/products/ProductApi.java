package com.alibou.security.products;

import com.alibou.security.categories.Category;
import com.alibou.security.categories.CategoryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Sort;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductApi {
    private final ProductManager productManager;
    private final CategoryRepository categoryRepository;

    public ProductApi(ProductManager productManager, CategoryRepository categoryRepository) {
        this.productManager = productManager;
        this.categoryRepository = categoryRepository;
    }

    @PostMapping("/add")
    public Product addProduct(@RequestBody Product newProduct) {
        Optional<Category> categoryOptional = categoryRepository.findByCategoryName(newProduct.getCategory().getCategoryName());
        if (categoryOptional.isPresent()) {
            newProduct.setCategory(categoryOptional.get());
        } else {
            throw new RuntimeException("Category not found: " + newProduct.getCategory().getCategoryName());
        }

        try {
            return productManager.saveProduct(newProduct);
        } catch (Exception e) {
            throw new RuntimeException("Error saving product", e);
        }
    }

    @GetMapping("/recommendations")
    public List<ProductDTO> findRecomendations(@RequestParam("id") Long id){
        Optional<Product> product = productManager.FindProductById(id);
        Product p = product.get();
        String actualCategory = p.getCategory().getCategoryName();
        String recommendedCategory;

        if (actualCategory.equals("NARTY")) {
            recommendedCategory = new String("BUTY NARCIARSKIE");
        }
        else if (actualCategory.equals("SNOWBOARD")) {
            recommendedCategory = new String("BUTY SNOWBOARDOWE");
        }
        else if (actualCategory.equals("KASKI")) {
            recommendedCategory = new String("GOGLE");
        }
        else if (actualCategory.equals("KIJKI")) {
            recommendedCategory = new String("NARTY");
        }
        else if (actualCategory.equals("BUTY NARCIARSKIE")) {
            recommendedCategory = new String("NARTY");
        }
        else if (actualCategory.equals("BUTY SNOWBOARDOWE")) {
            recommendedCategory = new String("SNOWBOARD");
        }
        else {
            recommendedCategory = new String("KASKI");
        }
        List<Product> recommendations = productManager.findByCategory(recommendedCategory);
        List<Product> randomProducts = getThreeRandomProducts(recommendations);
        return mapProductToProductRecord(randomProducts);
    }

    @GetMapping("/allbrands")
    public List<String> findAllBrands() {
        return productManager.findDistinctBrands();
    }

    @GetMapping("/product")
    public Optional<ProductDetail> FindProductById(@RequestParam("id") Long id) {
        return mapProductToProductDetail(productManager.FindProductById(id));
    }

    @GetMapping("/categories")
    public List<Category> findAllCategories() {
        return categoryRepository.findAll();
    }

    @GetMapping("/filter")
    public Page<ProductDTO> getByBrandAndCategory(@RequestParam("categoryName") String categoryName,
                                                  @RequestParam("brandName") String brand,
                                                  @RequestParam(value = "sort", required = false) String sort,
                                                  @RequestParam(value = "page", defaultValue = "0") int page,
                                                  @RequestParam(value = "size", defaultValue = "12") int size) {
        Sort sortOrder = Sort.by(Sort.Direction.ASC, "brand");

        if (sort != null && !sort.isEmpty()) {
            String[] sortParams = sort.split(",");
            Sort.Direction direction = Sort.Direction.fromString(sortParams[1]);
            sortOrder = Sort.by(direction, sortParams[0]);
        }

        Pageable pageable = PageRequest.of(page, size, sortOrder);

        if (categoryName.equalsIgnoreCase("WSZYSTKIE") && brand.equalsIgnoreCase("WSZYSTKIE"))
            return mapProductToProductRecordPage(productManager.FindAllProducts(pageable));
        else if (categoryName.equalsIgnoreCase("WSZYSTKIE"))
            return mapProductToProductRecordPage(productManager.findByBrand(brand, pageable));
        else if (brand.equalsIgnoreCase("WSZYSTKIE"))
            return mapProductToProductRecordPage(productManager.findByCategory(categoryName, pageable));
        else
            return mapProductToProductRecordPage(productManager.findByCategoryAndBrand(categoryName, brand, pageable));
    }

    private List<Product> getThreeRandomProducts(List<Product> products) {
        if (products.size() <= 4) {
            return new ArrayList<>(products);
        }

        List<Product> copiedList = new ArrayList<>(products);
        Collections.shuffle(copiedList, new Random());
        return copiedList.subList(0, 4);
    }

    private List<ProductDTO> mapProductToProductRecord(List<Product> products) {
        return products.stream().map(
                        product -> new ProductDTO(
                                product.getProductId(),
                                product.getBrand(),
                                product.getUnitPrice(),
                                product.getSize(),
                                product.getImagePath()))
                .collect(Collectors.toList());
    }

    private Page<ProductDTO> mapProductToProductRecordPage(Page<Product> products) {
        List<ProductDTO> productDTOs = products.stream().map(
                product -> new ProductDTO(
                        product.getProductId(),
                        product.getBrand(),
                        product.getUnitPrice(),
                        product.getSize(),
                        product.getImagePath())
        ).collect(Collectors.toList());

        return new PageImpl<>(productDTOs, products.getPageable(), products.getTotalElements());
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
