package Shelter.Pet_Adoption_System.controller.Requests;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AdopterRegisterRequest {
    private String name;
    private String emailAddress;
    private String passwordHash;
    private String phoneNumber;
}
