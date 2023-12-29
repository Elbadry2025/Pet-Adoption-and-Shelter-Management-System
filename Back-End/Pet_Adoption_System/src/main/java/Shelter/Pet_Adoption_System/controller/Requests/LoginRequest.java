package Shelter.Pet_Adoption_System.controller.Requests;

import lombok.*;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest {
    private String emailAddress;
    private String passwordHash;
}
