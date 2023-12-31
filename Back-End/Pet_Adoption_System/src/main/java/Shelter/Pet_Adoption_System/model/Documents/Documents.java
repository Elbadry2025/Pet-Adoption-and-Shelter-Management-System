package Shelter.Pet_Adoption_System.model.Documents;

import Shelter.Pet_Adoption_System.model.Pets.Pets;

import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "documents")
public class Documents {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer documentId;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "pet_id")
    private Pets pet;

    @Column(name = "document_type")
    private String documentType;

    @Column(name = "document")
    private String document;

    public Documents(Pets pet, String documentType, String document) {
        this.pet = pet;
        this.documentType = documentType;
        this.document = document;
    }
}
