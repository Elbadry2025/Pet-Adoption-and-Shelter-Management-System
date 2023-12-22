package Shelter.Pet_Adoption_System.model.Person;


import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "adopters")
public class Adopters extends Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;

    public Adopters(Integer userId, String name, String emailAddress, String phoneNumber, String passwordHash) {
        super(name, emailAddress, phoneNumber, passwordHash);
        this.userId = userId;
    }

    public Adopters(String name, String emailAddress, String phoneNumber, String passwordHash) {
        super(name, emailAddress, phoneNumber, passwordHash);
    }



}




