package com.example.wypozyczalnia;

import com.example.wypozyczalnia.products.Product;
import com.example.wypozyczalnia.users.User;
import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
public class Rent {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long rentId;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "employeeId", referencedColumnName = "userId")
    private User employee;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "clientId", referencedColumnName = "userId")
    private User client;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "productId", referencedColumnName = "productId")
    private Product product;

    private Date rentStart;
    private Date rentEnd;



    protected Rent() {
        super();
    }

    public Long getRentId() {
        return rentId;
    }

    public void setRentId(Long rentId) {
        this.rentId = rentId;
    }


    public Date getRentStart() {
        return rentStart;
    }

    public void setRentStart(Date rentStart) {
        this.rentStart = rentStart;
    }

    public Date getRentEnd() {
        return rentEnd;
    }

    public void setRentEnd(Date rentEnd) {
        this.rentEnd = rentEnd;
    }
}
