package Shelter.Pet_Adoption_System.model.Person;

import jakarta.persistence.*;
import lombok.*;

@Data
@MappedSuperclass
@NoArgsConstructor
@AllArgsConstructor
public abstract class Person {
    @Column(name = "name")
    protected String name;

    @Column(name = "email_address")
    protected String emailAddress;

    @Column(name = "phone_number")
    protected String phoneNumber;

    @Column(name = "password_hash")
    protected String passwordHash;
}