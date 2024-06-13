package com.alibou.security.rents;

import java.util.Date;

public record RentDTO(Long rentId, String brand, Date start, Date end) {
}
