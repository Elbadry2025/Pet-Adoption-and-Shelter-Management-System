package Shelter.Pet_Adoption_System.controller.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdoptersDTO {
    private Integer userId;
    private String name;
    private String emailAddress;
    private String phoneNumber;

    // Constructors, Getters, Setters
}