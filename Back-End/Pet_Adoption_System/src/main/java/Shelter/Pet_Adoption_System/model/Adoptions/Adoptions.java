package Shelter.Pet_Adoption_System.model.Adoptions;



import Shelter.Pet_Adoption_System.model.Person.Adopters;
import Shelter.Pet_Adoption_System.model.Pets.Pets;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "adoptions")
public class Adoptions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer adoptionId;

    @ManyToOne
    @JoinColumn(name = "pet_id")
    private Pets pet;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Adopters adopter;

    @Column(name = "adoption_date")
    @Temporal(TemporalType.DATE)
    private Date adoptionDate;

    @Column(name = "status")
    private String status;

    public Adoptions(Pets pet, Adopters adopter, Date adoptionDate, String status) {
        this.pet = pet;
        this.adopter = adopter;
        this.adoptionDate = adoptionDate;
        this.status = status;
    }
}
