package Shelter.Pet_Adoption_System.repsitory;


import Shelter.Pet_Adoption_System.model.Pets.Pets;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PetsRepository extends JpaRepository<Pets, Integer> {
    List<Pets> findBySpecies(String species);
    List<Pets> findByShelterShelterId(Integer shelterId);
    List<Pets> findByAgeLessThanEqual(Integer age);
}
