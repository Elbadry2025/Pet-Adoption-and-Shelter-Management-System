package Shelter.Pet_Adoption_System.controller.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

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
    private List<String> imageUrls;
    private int staffId; // Add this to PetsDTO

    public PetsDTO(Integer petId, String name, String species, String breed, Integer age, String gender,
                   String healthStatus, String behavior, String description, Integer shelterId, List<String> imageUrls) {
        this.petId = petId;
        this.name = name;
        this.species = species;
        this.breed = breed;
        this.age = age;
        this.gender = gender;
        this.healthStatus = healthStatus;
        this.behavior = behavior;
        this.description = description;
        this.shelterId = shelterId;
        this.imageUrls = imageUrls;
    }

    // Constructors, Getters, Setters
}