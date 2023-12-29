package Shelter.Pet_Adoption_System.service;


import Shelter.Pet_Adoption_System.model.Person.Staff;
import Shelter.Pet_Adoption_System.repsitory.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StaffService {

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private SheltersService SheltersService;

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

    public void setShelter(int staffId, int shelterId) {
        Staff staff = staffRepository.findById(staffId).orElse(null);
        staff.setShelter(SheltersService.findShelterById(shelterId));
        staffRepository.save(staff);
    }

    public void deleteStaff(int id) {
        staffRepository.deleteById(id);
    }

    public Optional<Staff> findStaffByEmail(String email) {return staffRepository.findByEmailAddress(email);}



}
