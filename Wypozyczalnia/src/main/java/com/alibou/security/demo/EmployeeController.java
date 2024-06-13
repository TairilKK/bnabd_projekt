package com.alibou.security.demo;

import io.swagger.v3.oas.annotations.Hidden;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/employee")
@PreAuthorize("hasRole('EMPLOYEE')")
public class EmployeeController {

    @GetMapping
    @PreAuthorize("hasAuthority('employee:read')")
    public String get() {
        return "GET:: employee controller";
    }

    @PostMapping
    @PreAuthorize("hasAuthority('employee:create')")
    @Hidden
    public String post() {
        return "POST:: employee controller";
    }

    @PutMapping
    @PreAuthorize("hasAuthority('employee:update')")
    @Hidden
    public String put() {
        return "PUT:: employee controller";
    }

    @DeleteMapping
    @PreAuthorize("hasAuthority('employee:delete')")
    @Hidden
    public String delete() {
        return "DELETE:: employee controller";
    }
}
