package com.alibou.security.products;

import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/all")
    public List<ProductDTO> getAll() {
        return mapProductToProductRecord(productManager.FindAllProducts());
    }

    @GetMapping("/allbrands")
    public List<String> findAllBrands() {
        return productManager.findDistinctBrands();
    }

    @GetMapping("/product")
    public Optional<ProductDetail> FindProductById(@RequestParam("id")Long id) {
        return mapProductToProductDetail(productManager.FindProductById(id));
    }

    @GetMapping("/brand")
    public List<ProductDTO> getByBrand(@RequestParam("brandName") String brand) {
        return mapProductToProductRecord(productManager.findByBrand(brand));
    }

    @GetMapping("/category")
    public List<ProductDTO> getByCategory(@RequestParam("categoryName") String categoryName) {
        if(categoryName.equalsIgnoreCase("WSZYSTKIE"))
            return mapProductToProductRecord(productManager.FindAllProducts());
        return mapProductToProductRecord(productManager.findByCategory(categoryName));
    }

    @GetMapping("/filter")
    public List<ProductDTO> getByBrandAndCategory(@RequestParam("categoryName") String categoryName, @RequestParam("brandName") String brand){
        if(categoryName.equalsIgnoreCase("WSZYSTKIE") && brand.equalsIgnoreCase("WSZYSTKIE"))
            return mapProductToProductRecord(productManager.FindAllProducts());
        else if (categoryName.equalsIgnoreCase("WSZYSTKIE"))
            return mapProductToProductRecord(productManager.findByBrand(brand));
        else if (brand.equalsIgnoreCase("WSZYSTKIE"))
            return mapProductToProductRecord(productManager.findByCategory(categoryName));
        else
            return mapProductToProductRecord(productManager.findByCategoryAndBrand(categoryName, brand));
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
