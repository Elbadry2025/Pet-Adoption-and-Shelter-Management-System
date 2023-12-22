package Shelter.Pet_Adoption_System.service;


import Shelter.Pet_Adoption_System.model.Person.Staff;
import Shelter.Pet_Adoption_System.repsitory.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StaffService {

    @Autowired
    private StaffRepository staffRepository;

    public List<Staff> findAllStaff() {
        return staffRepository.findAll();
    }

    public Staff findStaffById(int id) {
        return staffRepository.findById(id).orElse(null);
    }

    public List<Staff> findStaffByRole(String role) {
        return staffRepository.findByRole(role);
    }

    public List<Staff> findStaffByShelterId(int shelterId) {
        return staffRepository.findByShelterShelterId(shelterId);
    }

    public Staff saveStaff(Staff staff) {
        return staffRepository.save(staff);
    }

    public void deleteStaff(int id) {
        staffRepository.deleteById(id);
    }
}
