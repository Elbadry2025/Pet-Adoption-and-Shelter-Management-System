package Shelter.Pet_Adoption_System.repsitory;


import Shelter.Pet_Adoption_System.model.Adoptions.Adoptions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface AdoptionsRepository extends JpaRepository<Adoptions, Integer> {
    List<Adoptions> findByAdoptionDate(Date adoptionDate);
    List<Adoptions> findByAdopterUserId(Integer userId);
}
