package Shelter.Pet_Adoption_System.model.Shelters;

import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "shelters")
public class Shelters {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer shelterId;

    @Column(name = "name")
    private String name;

    @Column(name = "location")
    private String location;

    @Column(name = "email_address")
    private String emailAddress;

    @Column(name = "phone_number")
    private String phoneNumber;

    public Shelters(String name, String location, String emailAddress, String phoneNumber) {
        this.name = name;
        this.location = location;
        this.emailAddress = emailAddress;
        this.phoneNumber = phoneNumber;
    }
}

