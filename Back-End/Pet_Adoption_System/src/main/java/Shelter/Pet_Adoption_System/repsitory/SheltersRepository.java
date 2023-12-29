package Shelter.Pet_Adoption_System.repsitory;

import Shelter.Pet_Adoption_System.model.Shelters.Shelters;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SheltersRepository extends JpaRepository<Shelters, Integer> {
    List<Shelters> findByLocation(String location);
    Optional<Shelters> findByShelterId(Integer id);
}
