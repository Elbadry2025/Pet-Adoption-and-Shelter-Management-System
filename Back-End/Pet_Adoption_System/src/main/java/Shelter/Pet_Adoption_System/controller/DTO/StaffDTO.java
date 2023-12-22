package Shelter.Pet_Adoption_System.controller.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StaffDTO {
    private Integer staffId;
    private String name;
    private String role;
    private String emailAddress;
    private String phoneNumber;
    private Integer shelterId; // Reference to Shelter

    // Constructors, Getters, Setters
}