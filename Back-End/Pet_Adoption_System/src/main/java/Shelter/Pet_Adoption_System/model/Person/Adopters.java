package Shelter.Pet_Adoption_System.model.Person;


import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "adopters")
@EqualsAndHashCode(callSuper = true)
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




