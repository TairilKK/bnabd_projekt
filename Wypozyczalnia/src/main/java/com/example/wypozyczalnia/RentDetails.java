package com.example.wypozyczalnia;

import jakarta.persistence.*;

@Entity
public class RentDetails {
    @Id
    private Long rentId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "rentId")
    private Rent rent;




    protected RentDetails() {
        super();
    }

}
