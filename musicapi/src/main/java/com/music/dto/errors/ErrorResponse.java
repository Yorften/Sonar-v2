package com.music.dto.errors;

import java.time.LocalDate;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ErrorResponse {
    private LocalDate timestamp;
    private String message;
    private int status;
    private List<ValidationError> details;
}
