package Shelter.Pet_Adoption_System.repsitory;


import Shelter.Pet_Adoption_System.model.Documents.Documents;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentsRepository extends JpaRepository<Documents, Integer> {
    List<Documents> findByPetPetId(Integer petId);
}
