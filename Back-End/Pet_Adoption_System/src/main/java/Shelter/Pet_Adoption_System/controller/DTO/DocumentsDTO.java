package Shelter.Pet_Adoption_System.controller.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DocumentsDTO {
    private Integer documentId;
    private Integer petId; // Reference to Pet
    private String documentType;
    private String document; // The document content

    // Constructors, Getters, Setters
}