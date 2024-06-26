package com.alibou.security.products;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductApi {
    private final ProductManager productManager;

    public ProductApi(ProductManager productManager) {
        this.productManager = productManager;
    }

    @GetMapping("/allbrands")
    public List<String> findAllBrands() {
        return productManager.findDistinctBrands();
    }

    @GetMapping("/product")
    public Optional<ProductDetail> FindProductById(@RequestParam("id")Long id) {
        return mapProductToProductDetail(productManager.FindProductById(id));
    }

    @GetMapping("/filter")
    public Page<ProductDTO> getByBrandAndCategory(@RequestParam("categoryName") String categoryName,
                                                  @RequestParam("brandName") String brand,
                                                  @RequestParam(value = "sort", required = false) String sort,
                                                  @RequestParam(value = "page", defaultValue = "0") int page,
                                                  @RequestParam(value = "size", defaultValue = "12") int size){
        Sort sortOrder = Sort.by(Sort.Direction.ASC, "brand");

        if (sort != null && !sort.isEmpty()) {
            String[] sortParams = sort.split(",");
            Sort.Direction direction = Sort.Direction.fromString(sortParams[1]);
            sortOrder = Sort.by(direction, sortParams[0]);
        }

        Pageable pageable = PageRequest.of(page, size, sortOrder);

        if(categoryName.equalsIgnoreCase("WSZYSTKIE") && brand.equalsIgnoreCase("WSZYSTKIE"))
            return mapProductToProductRecordPage(productManager.FindAllProducts(pageable));
        else if (categoryName.equalsIgnoreCase("WSZYSTKIE"))
            return mapProductToProductRecordPage(productManager.findByBrand(brand, pageable));
        else if (brand.equalsIgnoreCase("WSZYSTKIE"))
            return mapProductToProductRecordPage(productManager.findByCategory(categoryName, pageable));
        else
            return mapProductToProductRecordPage(productManager.findByCategoryAndBrand(categoryName, brand, pageable));
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
