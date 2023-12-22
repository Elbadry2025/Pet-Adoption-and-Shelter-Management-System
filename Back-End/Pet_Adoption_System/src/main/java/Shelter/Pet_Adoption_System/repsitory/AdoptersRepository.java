package Shelter.Pet_Adoption_System.repsitory;


import Shelter.Pet_Adoption_System.model.Person.Adopters;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdoptersRepository extends JpaRepository<Adopters, Integer> {
    Optional<Adopters> findByEmailAddress(String emailAddress);
}
