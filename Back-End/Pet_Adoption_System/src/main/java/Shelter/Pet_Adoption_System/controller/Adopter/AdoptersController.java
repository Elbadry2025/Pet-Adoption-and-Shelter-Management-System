package Shelter.Pet_Adoption_System.controller.Adopter;


import Shelter.Pet_Adoption_System.controller.DTO.AdoptersDTO;
import Shelter.Pet_Adoption_System.model.Person.Adopters;
import Shelter.Pet_Adoption_System.service.AdoptersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/adopters")
public class AdoptersController {

    @Autowired
    private AdoptersService adoptersService;

    // Helper to convert entity to DTO
    private AdoptersDTO convertToDTO(Adopters adopter) {
        return new AdoptersDTO(adopter.getUserId(), adopter.getName(), adopter.getEmailAddress(), adopter.getPhoneNumber());
    }

    // GET all adopters
    @GetMapping
    public List<AdoptersDTO> getAllAdopters() {
        return adoptersService.findAllAdopters().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    // GET adopter by ID
    @GetMapping("/{id}")
    public ResponseEntity<AdoptersDTO> getAdopterById(@PathVariable Integer id) {
        Optional<Adopters> adopterOptional = adoptersService.findAdopterById(id);

        return adopterOptional.map(adopter -> ResponseEntity.ok(convertToDTO(adopter)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }


    // POST a new adopter
    @PostMapping
    public AdoptersDTO addAdopter(@RequestBody AdoptersDTO adopterDTO) {
        Adopters newAdopter = new Adopters(adopterDTO.getName(), adopterDTO.getEmailAddress(), adopterDTO.getPhoneNumber(), "hashed_password");
        return convertToDTO(adoptersService.saveAdopter(newAdopter));
    }

    // PUT to update an adopter
    @PutMapping("/{id}")
    public ResponseEntity<AdoptersDTO> updateAdopter(@PathVariable Integer id, @RequestBody AdoptersDTO adopterDTO) {
        Optional<Adopters> adopterOptional = adoptersService.findAdopterById(id);

        if (adopterOptional.isPresent()) {
            Adopters adopter = adopterOptional.get();
            adopter.setName(adopterDTO.getName());
            adopter.setEmailAddress(adopterDTO.getEmailAddress());
            adopter.setPhoneNumber(adopterDTO.getPhoneNumber());
            Adopters updatedAdopter = adoptersService.saveAdopter(adopter);
            return ResponseEntity.ok(convertToDTO(updatedAdopter));
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    // DELETE an adopter
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAdopter(@PathVariable Integer id) {
        adoptersService.deleteAdopter(id);
        return ResponseEntity.ok().build();
    }
}

