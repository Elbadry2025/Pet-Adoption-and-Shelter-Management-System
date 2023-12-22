package Shelter.Pet_Adoption_System.controller.Shelter;


import Shelter.Pet_Adoption_System.controller.DTO.SheltersDTO;
import Shelter.Pet_Adoption_System.model.Shelters.Shelters;
import Shelter.Pet_Adoption_System.service.SheltersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/shelters")
public class SheltersController {

    @Autowired
    private SheltersService sheltersService;

    // Convert to DTO
    private SheltersDTO convertToDTO(Shelters shelter) {
        return new SheltersDTO(shelter.getShelterId(), shelter.getName(), shelter.getLocation(), shelter.getEmailAddress(), shelter.getPhoneNumber());
    }

    // GET all shelters
    @GetMapping("/get_all_shelters")
    public List<SheltersDTO> getAllShelters() {
        return sheltersService.findAllShelters().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    // GET a single shelter by ID
    @GetMapping("/get_shelter_byID")
    public ResponseEntity<SheltersDTO> getShelterById(@RequestParam Integer id) {
        Shelters shelter = sheltersService.findShelterById(id);
        return shelter != null ? ResponseEntity.ok(convertToDTO(shelter)) : ResponseEntity.notFound().build();
    }

    // POST - Create a new shelter
    @PostMapping("/create_shelter")
    public SheltersDTO createShelter(@RequestBody SheltersDTO shelterDTO) {
        Shelters newShelter = new Shelters(shelterDTO.getName(), shelterDTO.getLocation(), shelterDTO.getEmailAddress(), shelterDTO.getPhoneNumber());
        Shelters savedShelter = sheltersService.saveShelter(newShelter);
        return convertToDTO(savedShelter);
    }

    // PUT - Update an existing shelter
    @PutMapping("/update_shelter")
    public ResponseEntity<SheltersDTO> updateShelter(@RequestParam Integer id, @RequestBody SheltersDTO shelterDTO) {
        Shelters existingShelter = sheltersService.findShelterById(id);
        if (existingShelter != null) {
            existingShelter.setName(shelterDTO.getName());
            existingShelter.setLocation(shelterDTO.getLocation());
            existingShelter.setEmailAddress(shelterDTO.getEmailAddress());
            existingShelter.setPhoneNumber(shelterDTO.getPhoneNumber());
            Shelters updatedShelter = sheltersService.saveShelter(existingShelter);
            return ResponseEntity.ok(convertToDTO(updatedShelter));
        }
        return ResponseEntity.notFound().build();
    }

    // DELETE - Remove a shelter
    @DeleteMapping("/delete_shelter")
    public ResponseEntity<?> deleteShelter(@RequestParam Integer id) {
        Shelters shelter = sheltersService.findShelterById(id);
        if (shelter != null) {
            sheltersService.deleteShelter(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}

