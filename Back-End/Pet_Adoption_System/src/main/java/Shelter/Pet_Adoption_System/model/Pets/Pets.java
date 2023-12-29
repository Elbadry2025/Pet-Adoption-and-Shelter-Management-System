package Shelter.Pet_Adoption_System.model.Pets;


import Shelter.Pet_Adoption_System.model.Shelters.Shelters;
import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "pets")
public class Pets implements Comparable<Pets>{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer petId;

    @Column(name = "name")
    private String name;

    @Column(name = "species")
    private String species;

    @Column(name = "breed")
    private String breed;

    @Column(name = "age")
    private Integer age;

    @Column(name = "gender")
    private String gender;

    @Column(name = "health_status")
    private String healthStatus;

    @Column(name = "behavior")
    private String behavior;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "house_trained")
    private boolean house_trained;

    @Column(name = "vaccinated")
    private boolean vaccinated;

    @Column(name = "neutered")
    private boolean neutered;

    @ManyToOne
    @JoinColumn(name = "shelter_id")
    private Shelters shelter;

    public Pets(String name, String species, String breed, Integer age, String gender, String healthStatus, String behavior, String description, Shelters shelter) {
        this.name = name;
        this.species = species;
        this.breed = breed;
        this.age = age;
        this.gender = gender;
        this.healthStatus = healthStatus;
        this.behavior = behavior;
        this.description = description;
        this.shelter = shelter;
    }

    @Override
    public int compareTo(Pets o) {
        return this.getPetId().compareTo(o.getPetId());
    }
}
