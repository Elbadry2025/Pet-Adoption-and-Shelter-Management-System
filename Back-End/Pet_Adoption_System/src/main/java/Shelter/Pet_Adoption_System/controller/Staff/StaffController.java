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
    @GetMapping("/get_all_staff")
    public List<StaffDTO> getAllStaff() {
        return staffService.findAllStaff().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // GET a single staff member by ID
    @GetMapping("/get_staff_byID")
    public ResponseEntity<StaffDTO> getStaffById(@RequestParam Integer id) {
        Optional<Staff> staff = Optional.ofNullable(staffService.findStaffById(id));
        return staff.map(s -> ResponseEntity.ok(convertToDTO(s)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // GET a single staff member by email
    @GetMapping("/get_staff_byEmail")
    public ResponseEntity<StaffDTO> getStaffByEmail(@RequestParam String email) {
        Optional<Staff> staff = staffService.findStaffByEmail(email);
        return staff.map(s -> ResponseEntity.ok(convertToDTO(s)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/get_staff_byRole")
    public List<StaffDTO> getStaffByRole(@RequestParam String role) {
        return staffService.findStaffByRole(role).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/get_staff_byShelterId")
    public List<StaffDTO> getStaffByShelterId(@RequestParam Integer shelterId) {
        return staffService.findStaffByShelterId(shelterId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // POST - Create a new staff member
    @PostMapping("/create_staff_member")
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
    @PutMapping("/update_staff_member")
    public ResponseEntity<StaffDTO> updateStaff(@RequestParam Integer id, @RequestBody StaffDTO staffDTO) {
        Optional<Staff> existingStaff = Optional.ofNullable(staffService.findStaffById(id));
        if (existingStaff.isPresent()) {
            Staff staff = existingStaff.get();
            staff.setName(staffDTO.getName());
            staff.setRole(staffDTO.getRole());
            staff.setEmailAddress(staffDTO.getEmailAddress());
            staff.setPhoneNumber(staffDTO.getPhoneNumber());
            staff.setShelter(shelterService.findShelterById(staffDTO.getShelterId()));
            Staff updatedStaff = staffService.saveStaff(staff);
            return ResponseEntity.ok(convertToDTO(updatedStaff));
        }
        return ResponseEntity.notFound().build();
    }

    // DELETE - Remove a staff member
    @DeleteMapping("/delete_staff_member")
    public ResponseEntity<?> deleteStaff(@RequestParam Integer id) {
        if (staffService.findStaffById(id)!=null) {
            staffService.deleteStaff(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}

