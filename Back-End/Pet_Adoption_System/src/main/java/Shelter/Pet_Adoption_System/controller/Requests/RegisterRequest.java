package Shelter.Pet_Adoption_System.controller.Requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public abstract class RegisterRequest {
    private String name;
    private String emailAddress;
    private String passwordHash;
    private String phoneNumber;
}
