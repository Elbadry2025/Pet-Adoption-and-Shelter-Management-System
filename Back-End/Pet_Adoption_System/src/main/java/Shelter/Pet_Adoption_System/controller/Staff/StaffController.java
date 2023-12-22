package Shelter.Pet_Adoption_System.controller.Staff;

import Shelter.Pet_Adoption_System.controller.DTO.StaffDTO;
import Shelter.Pet_Adoption_System.model.Person.Staff;
import Shelter.Pet_Adoption_System.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import Shelter.Pet_Adoption_System.service.SheltersService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/staff")
public class StaffController {

    @Autowired
    private StaffService staffService;

    @Autowired
    private SheltersService shelterService;

    // Convert to DTO
    private StaffDTO convertToDTO(Staff staff) {
        return new StaffDTO(
                staff.getStaffId(),
                staff.getName(),
                staff.getRole(),
                staff.getEmailAddress(),
                staff.getPhoneNumber(),
                staff.getShelter() != null ? staff.getShelter().getShelterId() : null
        );
    }

    // GET all staff members
    @GetMapping
    public List<StaffDTO> getAllStaff() {
        return staffService.findAllStaff().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // GET a single staff member by ID
    @GetMapping("/{id}")
    public ResponseEntity<StaffDTO> getStaffById(@PathVariable Integer id) {
        Optional<Staff> staff = Optional.ofNullable(staffService.findStaffById(id));
        return staff.map(s -> ResponseEntity.ok(convertToDTO(s)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // POST - Create a new staff member
    @PostMapping
    public ResponseEntity<StaffDTO> createStaff(@RequestBody StaffDTO staffDTO) {
        Staff newStaff = new Staff();
        newStaff.setName(staffDTO.getName());
        newStaff.setRole(staffDTO.getRole());
        newStaff.setEmailAddress(staffDTO.getEmailAddress());
        newStaff.setPhoneNumber(staffDTO.getPhoneNumber());
        newStaff.setShelter(shelterService.findShelterById(staffDTO.getShelterId()));
        Staff savedStaff = staffService.saveStaff(newStaff);
        return ResponseEntity.ok(convertToDTO(savedStaff));
    }

    // PUT - Update an existing staff member
    @PutMapping("/{id}")
    public ResponseEntity<StaffDTO> updateStaff(@PathVariable Integer id, @RequestBody StaffDTO staffDTO) {
        Optional<Staff> existingStaff = Optional.ofNullable(staffService.findStaffById(id));
        if (existingStaff.isPresent()) {
            Staff staff = existingStaff.get();
            staff.setName(staffDTO.getName());
            staff.setRole(staffDTO.getRole());
            staff.setEmailAddress(staffDTO.getEmailAddress());
            staff.setPhoneNumber(staffDTO.getPhoneNumber());
            // Update Shelter if necessary
            Staff updatedStaff = staffService.saveStaff(staff);
            return ResponseEntity.ok(convertToDTO(updatedStaff));
        }
        return ResponseEntity.notFound().build();
    }

    // DELETE - Remove a staff member
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteStaff(@PathVariable Integer id) {
        if (staffService.findStaffById(id)!=null) {
            staffService.deleteStaff(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}

