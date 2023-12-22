package Shelter.Pet_Adoption_System.model.Person;


import Shelter.Pet_Adoption_System.model.Shelters.Shelters;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "staff")
public class Staff extends Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer staffId;

    @Column(name = "role")
    private String role;

    @ManyToOne
    @JoinColumn(name = "shelter_id")
    private Shelters shelter;

    public Staff(Integer staffId,String name, String emailAddress, String phoneNumber, String passwordHash, String role, Shelters shelter) {
        super(name, emailAddress, phoneNumber, passwordHash);
        this.staffId = staffId;
        this.role = role;
        this.shelter = shelter;
    }

    public Staff(String name, String emailAddress, String phoneNumber, String passwordHash, String role, Shelters shelter) {
        super(name, emailAddress, phoneNumber, passwordHash);
        this.role = role;
        this.shelter = shelter;
    }


}

