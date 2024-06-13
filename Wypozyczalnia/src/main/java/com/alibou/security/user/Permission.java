package com.alibou.security.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum
Permission {

    CLIENT_READ("client:read"),
    CLIENT_UPDATE("client:update"),
    EMPLOYEE_READ("employee:read"),
    EMPLOYEE_UPDATE("employee:update"),
    EMPLOYEE_CREATE("employee:create"),
    EMPLOYEE_DELETE("employee:delete"),
    GUEST_READ("guest:read")

    ;

    @Getter
    private final String permission;
}