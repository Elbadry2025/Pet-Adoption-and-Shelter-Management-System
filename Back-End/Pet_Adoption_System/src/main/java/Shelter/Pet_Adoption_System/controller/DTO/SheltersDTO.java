package Shelter.Pet_Adoption_System.controller.DTO;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SheltersDTO {
    private Integer shelterId;
    private String name;
    private String location;
    private String emailAddress;
    private String phoneNumber;

    // Constructors, Getters and Setters
}
