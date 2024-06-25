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
                "SNOWBOARD", "BUTY NARCIARSKIE", "BUTY SNOWBOARDOWE");

        for (String name : cName) {
            Category category = new Category();
            category.setCategoryName(name);
            categoryRepository.save(category);
        }

        Optional<Category> optionalCategory = categoryRepository.findByCategoryName("NARTY");
        if (optionalCategory.isPresent()) {
            Category category = optionalCategory.get();

            Product p = new Product();
            p.setImagePath("img_products/fischer_narty.jpg");
            p.setAvailability(44);
            p.setBrand("Fischer");
            p.setCategory(category);
            p.setModel("RC4RCS");
            p.setConditionState("Olśniewający");
            p.setSize("165cm");
            p.setType("ZJAZDOWE");
            p.setUnitPrice(BigDecimal.valueOf(140));

            productRepository.save(p);

            p = new Product();
            p.setImagePath("img_products/fischer_narty.jpg");
            p.setAvailability(24);
            p.setBrand("Fischer");
            p.setCategory(category);
            p.setModel("RC4RCS");
            p.setConditionState("Olśniewający");
            p.setSize("172cm");
            p.setType("ZJAZDOWE");
            p.setUnitPrice(BigDecimal.valueOf(140));

            productRepository.save(p);

            p = new Product();
            p.setImagePath("img_products/fischer_narty.jpg");
            p.setAvailability(34);
            p.setBrand("Fischer");
            p.setCategory(category);
            p.setModel("RC4RCS");
            p.setConditionState("Olśniewający");
            p.setSize("179cm");
            p.setType("ZJAZDOWE");
            p.setUnitPrice(BigDecimal.valueOf(140));

            productRepository.save(p);

            p = new Product();
            p.setImagePath("img_products/narty-rossignol-px01-forza-50-v-cam-m.jpg");
            p.setAvailability(23);
            p.setBrand("Rossignol");
            p.setCategory(category);
            p.setModel("PX01 Forza");
            p.setConditionState("Olśniewający");
            p.setSize("164cm");
            p.setType("ZJAZDOWE");
            p.setUnitPrice(BigDecimal.valueOf(100));

            productRepository.save(p);

            p = new Product();
            p.setImagePath("img_products/narty-rossignol-px01-forza-50-v-cam-m.jpg");
            p.setAvailability(32);
            p.setBrand("Rossignol");
            p.setCategory(category);
            p.setModel("PX01 Forza");
            p.setConditionState("Olśniewający");
            p.setSize("171cm");
            p.setType("ZJAZDOWE");
            p.setUnitPrice(BigDecimal.valueOf(100));

            productRepository.save(p);

            p = new Product();
            p.setImagePath("img_products/narty-rossignol-px01-forza-50-v-cam-m.jpg");
            p.setAvailability(14);
            p.setBrand("Rossignol");
            p.setCategory(category);
            p.setModel("PX01 Forza");
            p.setConditionState("Olśniewający");
            p.setSize("179cm");
            p.setType("ZJAZDOWE");
            p.setUnitPrice(BigDecimal.valueOf(100));

            productRepository.save(p);

            p = new Product();
            p.setImagePath("img_products/narty-head-3413-worldcup-exsr-m.png");
            p.setAvailability(24);
            p.setBrand("Head");
            p.setCategory(category);
            p.setModel("3363 WORLDCUP REBELS");
            p.setConditionState("Olśniewający");
            p.setSize("170cm");
            p.setType("ZJAZDOWE");
            p.setUnitPrice(BigDecimal.valueOf(150));

            productRepository.save(p);

        }

        optionalCategory = categoryRepository.findByCategoryName("BUTY NARCIARSKIE");
        if (optionalCategory.isPresent()) {
            Category category = optionalCategory.get();

            Product p = new Product();
            p.setImagePath("img_products/buty-narciarskie-fischer-4822-ranger-one-100-vac-gw-m.jpg");
            p.setAvailability(12);
            p.setBrand("Fischer");
            p.setCategory(category);
            p.setModel("4822 Ranger One");
            p.setConditionState("Olśniewający");
            p.setSize("26,5");
            p.setType("ZJAZDOWE");
            p.setUnitPrice(BigDecimal.valueOf(90));

            productRepository.save(p);

            p = new Product();
            p.setImagePath("img_products/buty-narciarskie-fischer-4822-ranger-one-100-vac-gw-m.jpg");
            p.setAvailability(22);
            p.setBrand("Fischer");
            p.setCategory(category);
            p.setModel("4822 Ranger One");
            p.setConditionState("Olśniewający");
            p.setSize("27,5");
            p.setType("ZJAZDOWE");
            p.setUnitPrice(BigDecimal.valueOf(90));

            productRepository.save(p);

            p = new Product();
            p.setImagePath("img_products/buty-narciarskie-fischer-4822-ranger-one-100-vac-gw-m.jpg");
            p.setAvailability(12);
            p.setBrand("Fischer");
            p.setCategory(category);
            p.setModel("4822 Ranger One");
            p.setConditionState("Olśniewający");
            p.setSize("28,5");
            p.setType("ZJAZDOWE");
            p.setUnitPrice(BigDecimal.valueOf(90));

            productRepository.save(p);

            p = new Product();
            p.setImagePath("img_products/buty-narciarskie-head-3117-formula-120-mv-gw-m.png");
            p.setAvailability(12);
            p.setBrand("Head");
            p.setCategory(category);
            p.setModel("3117 FORMULA 120");
            p.setConditionState("Olśniewający");
            p.setSize("26,5");
            p.setType("ZJAZDOWE");
            p.setUnitPrice(BigDecimal.valueOf(100));

            productRepository.save(p);

            p = new Product();
            p.setImagePath("img_products/buty-narciarskie-head-3117-formula-120-mv-gw-m.png");
            p.setAvailability(12);
            p.setBrand("Head");
            p.setCategory(category);
            p.setModel("3117 FORMULA 120");
            p.setConditionState("Olśniewający");
            p.setSize("27,5");
            p.setType("ZJAZDOWE");
            p.setUnitPrice(BigDecimal.valueOf(100));

            productRepository.save(p);

            p = new Product();
            p.setImagePath("img_products/buty-narciarskie-head-3117-formula-120-mv-gw-m.png");
            p.setAvailability(12);
            p.setBrand("Head");
            p.setCategory(category);
            p.setModel("3117 FORMULA 120");
            p.setConditionState("Olśniewający");
            p.setSize("28,5");
            p.setType("ZJAZDOWE");
            p.setUnitPrice(BigDecimal.valueOf(100));

            productRepository.save(p);

            p = new Product();
            p.setImagePath("img_products/buty-narciarskie-rossignol-3130-alltrack-110-hv-gw-m.png");
            p.setAvailability(12);
            p.setBrand("Rossignol");
            p.setCategory(category);
            p.setModel("3130 Alltrack 110");
            p.setConditionState("Olśniewający");
            p.setSize("28,5");
            p.setType("ZJAZDOWE");
            p.setUnitPrice(BigDecimal.valueOf(100));

            productRepository.save(p);

            p = new Product();
            p.setImagePath("img_products/buty-narciarskie-rossignol-3130-alltrack-110-hv-gw-m.png");
            p.setAvailability(12);
            p.setBrand("Rossignol");
            p.setCategory(category);
            p.setModel("3130 Alltrack 110");
            p.setConditionState("Olśniewający");
            p.setSize("27,5");
            p.setType("ZJAZDOWE");
            p.setUnitPrice(BigDecimal.valueOf(100));

            productRepository.save(p);

            p = new Product();
            p.setImagePath("img_products/buty-narciarskie-rossignol-3130-alltrack-110-hv-gw-m.png");
            p.setAvailability(12);
            p.setBrand("Rossignol");
            p.setCategory(category);
            p.setModel("3130 Alltrack 110");
            p.setConditionState("Olśniewający");
            p.setSize("26,5");
            p.setType("ZJAZDOWE");
            p.setUnitPrice(BigDecimal.valueOf(100));

            productRepository.save(p);

        }

        optionalCategory = categoryRepository.findByCategoryName("KASKI");
        if (optionalCategory.isPresent()) {
            Category category = optionalCategory.get();

            Product p = new Product();
            p.setImagePath("img_products/kask-zimowy-head-3611-rev.jpg");
            p.setAvailability(12);
            p.setBrand("Head");
            p.setCategory(category);
            p.setModel("3611 Rev");
            p.setConditionState("Olśniewający");
            p.setSize("60-63");
            p.setUnitPrice(BigDecimal.valueOf(90));

            productRepository.save(p);

            p = new Product();
            p.setImagePath("img_products/kask-zimowy-head-3611-rev.jpg");
            p.setAvailability(12);
            p.setBrand("Head");
            p.setCategory(category);
            p.setModel("3611 Rev");
            p.setConditionState("Olśniewający");
            p.setSize("52-55");
            p.setUnitPrice(BigDecimal.valueOf(90));

            productRepository.save(p);

            p = new Product();
            p.setImagePath("img_products/kask-zimowy-salomon-2700-mtn-patrol.png");
            p.setAvailability(12);
            p.setBrand("Salomon");
            p.setCategory(category);
            p.setModel("2700 Mtn Patrol");
            p.setConditionState("Olśniewający");
            p.setSize("53-56");
            p.setUnitPrice(BigDecimal.valueOf(90));

            productRepository.save(p);

            p = new Product();
            p.setImagePath("img_products/kask-zimowy-salomon-2700-mtn-patrol.png");
            p.setAvailability(12);
            p.setBrand("Salomon");
            p.setCategory(category);
            p.setModel("2700 Mtn Patrol");
            p.setConditionState("Olśniewający");
            p.setSize("56-59");
            p.setUnitPrice(BigDecimal.valueOf(90));

            productRepository.save(p);

            p = new Product();
            p.setImagePath("img_products/kask-zimowy-poc-0114-obex-bc-mips.jpg");
            p.setAvailability(12);
            p.setBrand("Poc");
            p.setCategory(category);
            p.setModel("0114 Obex BC Mips");
            p.setConditionState("Olśniewający");
            p.setSize("55-58");
            p.setUnitPrice(BigDecimal.valueOf(90));

            productRepository.save(p);

            p = new Product();
            p.setImagePath("img_products/kask-zimowy-poc-0114-obex-bc-mips.jpg");
            p.setAvailability(12);
            p.setBrand("Poc");
            p.setCategory(category);
            p.setModel("0114 Obex BC Mips");
            p.setConditionState("Olśniewający");
            p.setSize("51-54");
            p.setUnitPrice(BigDecimal.valueOf(90));

            productRepository.save(p);
        }

        optionalCategory = categoryRepository.findByCategoryName("KIJKI");
        if (optionalCategory.isPresent()) {
            Category category = optionalCategory.get();

            Product p = new Product();
            p.setImagePath("img_products/kije-narciarskie-one-way-1323-gt-13-comp-mag.jpg");
            p.setAvailability(12);
            p.setBrand("One Way");
            p.setCategory(category);
            p.setModel("1323 GT 13 Comp Mag");
            p.setConditionState("Olśniewający");
            p.setSize("110");
            p.setUnitPrice(BigDecimal.valueOf(90));

            productRepository.save(p);

            p = new Product();
            p.setImagePath("img_products/kije-narciarskie-one-way-1323-gt-13-comp-mag.jpg");
            p.setAvailability(12);
            p.setBrand("One Way");
            p.setCategory(category);
            p.setModel("1323 GT 13 Comp Mag");
            p.setConditionState("Olśniewający");
            p.setSize("115");
            p.setUnitPrice(BigDecimal.valueOf(90));

            productRepository.save(p);

            p = new Product();
            p.setImagePath("img_products/kije-narciarskie-one-way-1323-gt-13-comp-mag.jpg");
            p.setAvailability(12);
            p.setBrand("One Way");
            p.setCategory(category);
            p.setModel("1323 GT 13 Comp Mag");
            p.setConditionState("Olśniewający");
            p.setSize("120");
            p.setUnitPrice(BigDecimal.valueOf(90));

            productRepository.save(p);

            p = new Product();
            p.setImagePath("img_products/kije-narciarskie-one-way-1323-gt-13-comp-mag.jpg");
            p.setAvailability(12);
            p.setBrand("One Way");
            p.setCategory(category);
            p.setModel("1323 GT 13 Comp Mag");
            p.setConditionState("Olśniewający");
            p.setSize("125");
            p.setUnitPrice(BigDecimal.valueOf(90));

            productRepository.save(p);

            p = new Product();
            p.setImagePath("img_products/kije-narciarskie-one-way-1721-gt-18.jpg");
            p.setAvailability(12);
            p.setBrand("One Way");
            p.setCategory(category);
            p.setModel("1721 GT 18");
            p.setConditionState("Olśniewający");
            p.setSize("110");
            p.setUnitPrice(BigDecimal.valueOf(90));

            productRepository.save(p);

            p = new Product();
            p.setImagePath("img_products/kije-narciarskie-one-way-1721-gt-18.jpg");
            p.setAvailability(12);
            p.setBrand("One Way");
            p.setCategory(category);
            p.setModel("1721 GT 18");
            p.setConditionState("Olśniewający");
            p.setSize("115");
            p.setUnitPrice(BigDecimal.valueOf(90));

            productRepository.save(p);

            p = new Product();
            p.setImagePath("img_products/kije-narciarskie-one-way-1721-gt-18.jpg");
            p.setAvailability(12);
            p.setBrand("One Way");
            p.setCategory(category);
            p.setModel("1721 GT 18");
            p.setConditionState("Olśniewający");
            p.setSize("120");
            p.setUnitPrice(BigDecimal.valueOf(90));

            productRepository.save(p);

            p = new Product();
            p.setImagePath("img_products/kije-narciarskie-one-way-1721-gt-18.jpg");
            p.setAvailability(12);
            p.setBrand("One Way");
            p.setCategory(category);
            p.setModel("1721 GT 18");
            p.setConditionState("Olśniewający");
            p.setSize("130");
            p.setUnitPrice(BigDecimal.valueOf(90));

            productRepository.save(p);
        }

        optionalCategory = categoryRepository.findByCategoryName("GOGLE");
        if (optionalCategory.isPresent()) {
            Category category = optionalCategory.get();

            Product p = new Product();
            p.setImagePath("img_products/gogle-salomon-1400-s-viev-photo-ml.png");
            p.setAvailability(52);
            p.setBrand("Salomon");
            p.setCategory(category);
            p.setModel("1400 S/Viev Photo ML");
            p.setConditionState("Olśniewający");
            p.setUnitPrice(BigDecimal.valueOf(90));

            productRepository.save(p);

            p = new Product();
            p.setImagePath("img_products/gogle-oakley-7110-flight-path-large.jpg");
            p.setAvailability(42);
            p.setBrand("Oakley");
            p.setCategory(category);
            p.setModel("7110 Flight Path Large");
            p.setConditionState("Olśniewający");
            p.setUnitPrice(BigDecimal.valueOf(90));

            productRepository.save(p);

            p = new Product();
            p.setImagePath("img_products/gogle-uvex-0670-evidnt-attract.png");
            p.setAvailability(62);
            p.setBrand("Uvex");
            p.setCategory(category);
            p.setModel("0670 Evidnt Attract");
            p.setConditionState("Olśniewający");
            p.setUnitPrice(BigDecimal.valueOf(90));

            productRepository.save(p);

        }

        optionalCategory = categoryRepository.findByCategoryName("SNOWBOARD");
        if (optionalCategory.isPresent()) {
            Category category = optionalCategory.get();

            Product p = new Product();
            p.setImagePath("img_products/deska-snowboardowa-ride-0023-twinpig-m.jpg");
            p.setAvailability(32);
            p.setBrand("Ride");
            p.setCategory(category);
            p.setModel("0023 Twinpig");
            p.setConditionState("Olśniewający");
            p.setSize("151");
            p.setUnitPrice(BigDecimal.valueOf(90));

            productRepository.save(p);

            p = new Product();
            p.setImagePath("img_products/deska-snowboardowa-ride-0023-twinpig-m.jpg");
            p.setAvailability(32);
            p.setBrand("Ride");
            p.setCategory(category);
            p.setModel("0023 Twinpig");
            p.setConditionState("Olśniewający");
            p.setSize("148");
            p.setUnitPrice(BigDecimal.valueOf(90));

            productRepository.save(p);

            p = new Product();
            p.setImagePath("img_products/deska-snowboardowa-lib-tech-n054-cortado.jpg");
            p.setAvailability(32);
            p.setBrand("Lib Tech");
            p.setCategory(category);
            p.setModel("N054 Cortado");
            p.setConditionState("Olśniewający");
            p.setSize("154");
            p.setUnitPrice(BigDecimal.valueOf(90));

            productRepository.save(p);

            p = new Product();
            p.setImagePath("img_products/deska-snowboardowa-lib-tech-n054-cortado.jpg");
            p.setAvailability(32);
            p.setBrand("Lib Tech");
            p.setCategory(category);
            p.setModel("N054 Cortado");
            p.setConditionState("Olśniewający");
            p.setSize("157");
            p.setUnitPrice(BigDecimal.valueOf(90));

            productRepository.save(p);

            p = new Product();
            p.setImagePath("img_products/deska-snowboardowa-bataleon-2415-moodboard-m.png");
            p.setAvailability(32);
            p.setBrand("Bataleon");
            p.setCategory(category);
            p.setModel("2415 MOODBOARD");
            p.setConditionState("Olśniewający");
            p.setSize("146");
            p.setUnitPrice(BigDecimal.valueOf(90));

            productRepository.save(p);

            p = new Product();
            p.setImagePath("img_products/deska-snowboardowa-bataleon-2415-moodboard-m.png");
            p.setAvailability(32);
            p.setBrand("Bataleon");
            p.setCategory(category);
            p.setModel("2415 MOODBOARD");
            p.setConditionState("Olśniewający");
            p.setSize("149");
            p.setUnitPrice(BigDecimal.valueOf(90));

            productRepository.save(p);

            p = new Product();
            p.setImagePath("img_products/deska-snowboardowa-bataleon-2415-moodboard-m.png");
            p.setAvailability(32);
            p.setBrand("Bataleon");
            p.setCategory(category);
            p.setModel("2415 MOODBOARD");
            p.setConditionState("Olśniewający");
            p.setSize("152");
            p.setUnitPrice(BigDecimal.valueOf(90));

            productRepository.save(p);
        }

        optionalCategory = categoryRepository.findByCategoryName("BUTY SNOWBOARDOWE");
        if (optionalCategory.isPresent()) {
            Category category = optionalCategory.get();

            Product p = new Product();
            p.setImagePath("img_products/buty-snowboardowe-thirtytwo-0514-lashed-double-boa-m.jpg");
            p.setAvailability(32);
            p.setBrand("Thirtytwo");
            p.setCategory(category);
            p.setModel("0514 Lashed Double Boa");
            p.setConditionState("Olśniewający");
            p.setSize("9");
            p.setUnitPrice(BigDecimal.valueOf(90));

            productRepository.save(p);

            p = new Product();
            p.setImagePath("img_products/buty-snowboardowe-thirtytwo-0514-lashed-double-boa-m.jpg");
            p.setAvailability(12);
            p.setBrand("Thirtytwo");
            p.setCategory(category);
            p.setModel("0514 Lashed Double Boa");
            p.setConditionState("Olśniewający");
            p.setSize("9.5");
            p.setUnitPrice(BigDecimal.valueOf(90));

            productRepository.save(p);

            p = new Product();
            p.setImagePath("img_products/buty-snowboardowe-thirtytwo-0514-lashed-double-boa-m.jpg");
            p.setAvailability(15);
            p.setBrand("Thirtytwo");
            p.setCategory(category);
            p.setModel("0514 Lashed Double Boa");
            p.setConditionState("Olśniewający");
            p.setSize("10");
            p.setUnitPrice(BigDecimal.valueOf(90));

            productRepository.save(p);

            p = new Product();
            p.setImagePath("img_products/buty-snowboardowe-dc-0077-phantom-m.jpg");
            p.setAvailability(15);
            p.setBrand("DC");
            p.setCategory(category);
            p.setModel("0077 PHANTOM");
            p.setConditionState("Olśniewający");
            p.setSize("9.5");
            p.setUnitPrice(BigDecimal.valueOf(90));

            productRepository.save(p);

            p = new Product();
            p.setImagePath("img_products/buty-snowboardowe-dc-0077-phantom-m.jpg");
            p.setAvailability(17);
            p.setBrand("DC");
            p.setCategory(category);
            p.setModel("0077 PHANTOM");
            p.setConditionState("Olśniewający");
            p.setSize("10");
            p.setUnitPrice(BigDecimal.valueOf(90));

            productRepository.save(p);

            p = new Product();
            p.setImagePath("img_products/buty-snowboardowe-dc-0077-phantom-m.jpg");
            p.setAvailability(25);
            p.setBrand("DC");
            p.setCategory(category);
            p.setModel("0077 PHANTOM");
            p.setConditionState("Olśniewający");
            p.setSize("11");
            p.setUnitPrice(BigDecimal.valueOf(90));

            productRepository.save(p);

            p = new Product();
            p.setImagePath("img_products/buty-snowboardowe-dc-0080-transcend-m.jpg");
            p.setAvailability(25);
            p.setBrand("DC");
            p.setCategory(category);
            p.setModel("0080 TRANSCEND");
            p.setConditionState("Olśniewający");
            p.setSize("10.5");
            p.setUnitPrice(BigDecimal.valueOf(90));

            productRepository.save(p);

            p = new Product();
            p.setImagePath("img_products/buty-snowboardowe-dc-0080-transcend-m.jpg");
            p.setAvailability(25);
            p.setBrand("DC");
            p.setCategory(category);
            p.setModel("0080 TRANSCEND");
            p.setConditionState("Olśniewający");
            p.setSize("11");
            p.setUnitPrice(BigDecimal.valueOf(90));

            productRepository.save(p);

            p = new Product();
            p.setImagePath("img_products/buty-snowboardowe-dc-0080-transcend-m.jpg");
            p.setAvailability(25);
            p.setBrand("DC");
            p.setCategory(category);
            p.setModel("0080 TRANSCEND");
            p.setConditionState("Olśniewający");
            p.setSize("9.5");
            p.setUnitPrice(BigDecimal.valueOf(90));

            productRepository.save(p);
        }
    }
}
