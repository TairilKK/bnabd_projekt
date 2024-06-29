package com.alibou.security.rents;

import java.util.Date;

public record RentDTO(Long rentId, Long employeeId, Long clientId, Date rentStart, Date rentEnd) {
    public RentDTO(Rent rent) {
        this(
                rent.getRentId(),
                rent.getEmployee() != null ? rent.getEmployee().getId() : null,
                rent.getClient() != null ? rent.getClient().getId() : null,
                rent.getRentStart(),
                rent.getRentEnd()
        );
    }
}
