package Shelter.Pet_Adoption_System.controller.Requests;

import Shelter.Pet_Adoption_System.model.Shelters.Shelters;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class StaffRegisterRequest extends RegisterRequest {
    private String role;
    private Shelters shelter;
}