package Shelter.Pet_Adoption_System.controller.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PetsDTO {
    private Integer petId;
    private String name;
    private String species;
    private String breed;
    private Integer age;
    private String gender;
    private String healthStatus;
    private String behavior;
    private String description;
    private Integer shelterId; // Reference to Shelter

    // Constructors, Getters, Setters
}