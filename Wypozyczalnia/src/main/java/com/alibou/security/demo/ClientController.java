package com.alibou.security.demo;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/client")
@Tag(name = "Client")
@PreAuthorize("hasRole('CLIENT')")
public class ClientController {

    @Operation(
            description = "Get endpoint for client",
            summary = "This is a summary for client get endpoint",
            responses = {
                    @ApiResponse(
                            description = "Success",
                            responseCode = "200"
                    ),
                    @ApiResponse(
                            description = "Unauthorized / Invalid Token",
                            responseCode = "403"
                    )
            }
    )
    @GetMapping
    @PreAuthorize("hasAuthority('client:read')")
    public String get() {
        return "GET:: client controller";
    }

    @Operation(
            description = "Post endpoint for client",
            summary = "This is a summary for client post endpoint",
            responses = {
                    @ApiResponse(
                            description = "Success",
                            responseCode = "200"
                    ),
                    @ApiResponse(
                            description = "Unauthorized / Invalid Token",
                            responseCode = "403"
                    )
            }
    )
    @PostMapping
    @PreAuthorize("hasAuthority('client:create')")
    public String post() {
        return "POST:: client controller";
    }

    @Operation(
            description = "Put endpoint for client",
            summary = "This is a summary for client put endpoint",
            responses = {
                    @ApiResponse(
                            description = "Success",
                            responseCode = "200"
                    ),
                    @ApiResponse(
                            description = "Unauthorized / Invalid Token",
                            responseCode = "403"
                    )
            }
    )
    @PutMapping
    @PreAuthorize("hasAuthority('client:update')")
    public String put() {
        return "PUT:: client controller";
    }

    @Operation(
            description = "Delete endpoint for client",
            summary = "This is a summary for client delete endpoint",
            responses = {
                    @ApiResponse(
                            description = "Success",
                            responseCode = "200"
                    ),
                    @ApiResponse(
                            description = "Unauthorized / Invalid Token",
                            responseCode = "403"
                    )
            }
    )
    @DeleteMapping
    @PreAuthorize("hasAuthority('client:delete')")
    public String delete() {
        return "DELETE:: client controller";
    }
}
