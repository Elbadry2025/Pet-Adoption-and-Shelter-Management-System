package Shelter.Pet_Adoption_System.controller.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdoptionsDTO {
    private Integer adoptionId;
    private Integer petId; // Reference to Pet
    private Integer userId; // Reference to Adopter
    private Date adoptionDate;
    private String status;

    // Constructors, Getters, Setters
}