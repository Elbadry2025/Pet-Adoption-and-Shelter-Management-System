package Shelter.Pet_Adoption_System.controller.Requests;

import Shelter.Pet_Adoption_System.model.Shelters.Shelters;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StaffRegisterRequest {
    private String name;
    private String emailAddress;
    private String passwordHash;
    private String phoneNumber;
    private String role;
    private Shelters shelter;
}
