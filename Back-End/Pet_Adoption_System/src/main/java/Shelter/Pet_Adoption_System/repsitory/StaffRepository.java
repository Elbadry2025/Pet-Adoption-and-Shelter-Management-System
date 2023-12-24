package Shelter.Pet_Adoption_System.repsitory;


import Shelter.Pet_Adoption_System.model.Person.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Integer> {
    List<Staff> findByRole(String role);
    List<Staff> findByShelterShelterId(Integer shelterId);
    Optional<Staff> findByEmailAddress(String emailAddress);
}
