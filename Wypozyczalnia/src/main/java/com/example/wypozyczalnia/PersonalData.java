package com.example.wypozyczalnia;

import com.example.wypozyczalnia.users.User;
import jakarta.persistence.*;

@Entity
public class PersonalData {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long pDataId;

    private String firstName;
    private String lastName;
    private String phoneNumber;

    @OneToOne(mappedBy = "personalData")
    private User user;

    protected PersonalData() {
        super();
    }

    public Long getpDataId() {
        return pDataId;
    }

    public void setpDataId(Long pDataId) {
        this.pDataId = pDataId;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
}
