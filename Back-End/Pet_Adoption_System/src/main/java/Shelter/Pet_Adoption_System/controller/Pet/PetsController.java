package Shelter.Pet_Adoption_System.controller.Pet;


import Shelter.Pet_Adoption_System.controller.DTO.PetsDTO;
import Shelter.Pet_Adoption_System.model.Pets.Pets;
import Shelter.Pet_Adoption_System.model.Shelters.Shelters;
import Shelter.Pet_Adoption_System.service.PetsService;
import Shelter.Pet_Adoption_System.service.SheltersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/pets")
public class PetsController {

    @Autowired
    private PetsService petsService;

    @Autowired
    private SheltersService sheltersService;

    // Convert to DTO
    private PetsDTO convertToDTO(Pets pet) {
        return new PetsDTO(
                pet.getPetId(),
                pet.getName(),
                pet.getSpecies(),
                pet.getBreed(),
                pet.getAge(),
                pet.getGender(),
                pet.getHealthStatus(),
                pet.getBehavior(),
                pet.getDescription(),
                pet.getShelter() != null ? pet.getShelter().getShelterId() : null
        );
    }

    // GET all pets
    @GetMapping("/get_all_pets")
    public List<PetsDTO> getAllPets() {
        return petsService.findAllPets().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // GET a single pet by ID
    @GetMapping("/get_pet_byID")
    public ResponseEntity<PetsDTO> getPetById(@RequestParam Integer id) {
        Optional<Pets> pet = Optional.ofNullable(petsService.findPetById(id));
        return pet.map(p -> ResponseEntity.ok(convertToDTO(p)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // POST - Create a new pet
    @PostMapping("/create_pet")
    public ResponseEntity<PetsDTO> createPet(@RequestBody PetsDTO petsDTO) {
        Pets newPet = new Pets();
        newPet.setName(petsDTO.getName());
        newPet.setSpecies(petsDTO.getSpecies());
        newPet.setBreed(petsDTO.getBreed());
        newPet.setAge(petsDTO.getAge());
        newPet.setGender(petsDTO.getGender());
        newPet.setHealthStatus(petsDTO.getHealthStatus());
        newPet.setBehavior(petsDTO.getBehavior());
        newPet.setDescription(petsDTO.getDescription());

        // Assuming you have a method to find the shelter by ID
        if (petsDTO.getShelterId() != null) {
            Optional<Shelters> shelter = Optional.ofNullable(sheltersService.findShelterById(petsDTO.getShelterId()));
            shelter.ifPresent(newPet::setShelter);
        }

        // Save the new entity
        Pets savedPet = petsService.savePet(newPet);

        // Convert the saved entity back to DTO
        PetsDTO savedPetDTO = convertToDTO(savedPet);

        // Return the saved DTO
        return ResponseEntity.ok(savedPetDTO);
    }


    // PUT - Update an existing pet
    @PutMapping("/update_pet")
    public ResponseEntity<?> updatePet(@RequestParam Integer id, @RequestBody PetsDTO petsDTO) {
        Pets existingPet = petsService.findPetById(id);
        if (existingPet != null) {
            // Updating fields with new values from petsDTO
            existingPet.setName(petsDTO.getName());
            existingPet.setSpecies(petsDTO.getSpecies());
            existingPet.setBreed(petsDTO.getBreed());
            existingPet.setAge(petsDTO.getAge());
            existingPet.setGender(petsDTO.getGender());
            existingPet.setHealthStatus(petsDTO.getHealthStatus());
            existingPet.setBehavior(petsDTO.getBehavior());
            existingPet.setDescription(petsDTO.getDescription());

            // Handling the shelter
            if (petsDTO.getShelterId() != null) {
                Optional<Shelters> shelter = Optional.ofNullable(sheltersService.findShelterById(petsDTO.getShelterId()));
                if (shelter.isPresent()) {
                    existingPet.setShelter(shelter.get());
                } else {
                    // If shelterId is invalid, you might want to handle it differently
                    return ResponseEntity.badRequest().body("Invalid shelter ID");
                }
            }

            // Save the updated pet
            Pets updatedPet = petsService.savePet(existingPet);

            // Convert the saved entity back to DTO
            return ResponseEntity.ok(convertToDTO(updatedPet));
        }
        return ResponseEntity.notFound().build();
    }


    // DELETE - Remove a pet
    @DeleteMapping("/delete_pet")
    public ResponseEntity<?> deletePet(@RequestParam Integer id) {
        if (petsService.findPetById(id) != null) {
            petsService.deletePet(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}

