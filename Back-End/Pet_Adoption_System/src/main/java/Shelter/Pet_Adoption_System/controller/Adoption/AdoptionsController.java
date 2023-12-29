package Shelter.Pet_Adoption_System.controller.Adoption;



import Shelter.Pet_Adoption_System.controller.DTO.AdoptionsDTO;
import Shelter.Pet_Adoption_System.model.Adoptions.Adoptions;
import Shelter.Pet_Adoption_System.service.AdoptersService;
import Shelter.Pet_Adoption_System.service.AdoptionsService;
import Shelter.Pet_Adoption_System.service.PetsService;
import Shelter.Pet_Adoption_System.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/adoptions")
public class AdoptionsController {

    @Autowired
    private AdoptionsService adoptionsService;

    @Autowired
    private PetsService petsService;

    @Autowired
    private AdoptersService adoptersService;

    @Autowired
    private StaffService staffService;

    // Convert to DTO
    private AdoptionsDTO convertToDTO(Adoptions adoption) {
        AdoptionsDTO dto = new AdoptionsDTO();
        dto.setAdoptionId(adoption.getAdoptionId());
        dto.setPetId(adoption.getPet().getPetId()); // Assuming Adoptions entity has a reference to a Pet
        dto.setUserId(adoption.getAdopter().getUserId()); // Assuming Adoptions entity has a reference to an Adopter
        dto.setAdoptionDate(adoption.getAdoptionDate());
        dto.setStatus(adoption.getStatus());

        return dto;
    }


    // GET all adoptions
    @GetMapping("/get_all_adoptions")
    public List<AdoptionsDTO> getAllAdoptions() {
        return adoptionsService.findAllAdoptions().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // GET a single adoption by ID
    @GetMapping("/get_adoption_byID")
    public ResponseEntity<AdoptionsDTO> getAdoptionById(@RequestParam Integer id) {
        Optional<Adoptions> adoption = Optional.ofNullable(adoptionsService.findAdoptionById(id));
        return adoption.map(adoptions -> ResponseEntity.ok(convertToDTO(adoptions))).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/get_adoptions_by_shelterId")
    public List<AdoptionsDTO> getAdoptionsByShelterId(@RequestParam Integer shelterId) {
        return adoptionsService.getAdoptionsByShelterId(shelterId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/get_adoptions_by_staffId")
    public List<AdoptionsDTO> getAdoptionsByStaffId(@RequestParam Integer staffId) {
        return adoptionsService.getAdoptionsByShelterId(staffService.findStaffById(staffId).getShelter().getShelterId()).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());

    }

    // POST - Create a new adoption
    @PostMapping("/create_adoption")
    public ResponseEntity<AdoptionsDTO> createAdoption(@RequestBody AdoptionsDTO adoptionsDTO) {
        // Convert DTO to Entity
        Adoptions newAdoption = new Adoptions();
        newAdoption.setPet( petsService.findPetById(adoptionsDTO.getPetId()) );
        newAdoption.setAdopter( adoptersService.findAdopterById(adoptionsDTO.getUserId()).get() );
        newAdoption.setAdoptionDate(adoptionsDTO.getAdoptionDate());
        newAdoption.setStatus(adoptionsDTO.getStatus());

        // Save the new entity
        Adoptions savedAdoption = adoptionsService.saveAdoption(newAdoption);

        // Convert the saved entity back to DTO
        AdoptionsDTO savedAdoptionDTO = convertToDTO(savedAdoption);

        // Return the saved DTO
        return ResponseEntity.ok(savedAdoptionDTO);
    }


    // PUT - Update an existing adoption
    @PutMapping("/update_adoption")
    public ResponseEntity<AdoptionsDTO> updateAdoption(@RequestParam Integer id, @RequestBody AdoptionsDTO adoptionsDTO) {
        Optional<Adoptions> existingAdoption = Optional.ofNullable(adoptionsService.findAdoptionById(id));
        if (existingAdoption.isPresent()) {
            Adoptions adoption = existingAdoption.get();
            // Update logic
            Adoptions updatedAdoption = adoptionsService.saveAdoption(adoption);
            return ResponseEntity.ok(convertToDTO(updatedAdoption));
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/change_adoption_status")
    public ResponseEntity<AdoptionsDTO> changeAdoptionStatus(@RequestParam Integer id, @RequestParam String status) {
        Optional<Adoptions> existingAdoption = Optional.ofNullable(adoptionsService.findAdoptionById(id));
        if (existingAdoption.isPresent()) {
            Adoptions adoption = existingAdoption.get();
            adoption.setStatus(status);
            Adoptions updatedAdoption = adoptionsService.saveAdoption(adoption);
            return ResponseEntity.ok(convertToDTO(updatedAdoption));
        }
        return ResponseEntity.notFound().build();
    }

    // DELETE - Remove an adoption
    @DeleteMapping("/delete_adoption")
    public ResponseEntity<?> deleteAdoption(@RequestParam Integer id) {
        Optional<Adoptions> adoption = Optional.ofNullable(adoptionsService.findAdoptionById(id));
        if (adoption.isPresent()) {
            adoptionsService.deleteAdoption(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
