package Shelter.Pet_Adoption_System.controller.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FilterPetsDto {
    private String name;
    private String species;
    private String breed;
    private String shelter_location;
    private String gender;
    private String behavior;
    private int age;
    private boolean house_trained;
    private boolean vaccinated;
    private boolean neutered;
}
