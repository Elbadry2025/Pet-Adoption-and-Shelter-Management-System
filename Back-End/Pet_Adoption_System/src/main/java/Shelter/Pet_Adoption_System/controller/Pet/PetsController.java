package Shelter.Pet_Adoption_System.controller.Pet;


import Shelter.Pet_Adoption_System.controller.DTO.PetsDTO;
import Shelter.Pet_Adoption_System.model.Documents.Documents;
import Shelter.Pet_Adoption_System.model.Pets.Pets;
import Shelter.Pet_Adoption_System.model.Shelters.Shelters;
import Shelter.Pet_Adoption_System.service.DocumentsService;
import Shelter.Pet_Adoption_System.service.PetsService;
import Shelter.Pet_Adoption_System.service.SheltersService;
import Shelter.Pet_Adoption_System.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/pets")
@CrossOrigin(origins = "http://localhost:5173/")
public class PetsController {

    @Autowired
    private PetsService petsService;

    @Autowired
    private SheltersService sheltersService;
    @Autowired
    private StaffService staffService;
    @Autowired
    private DocumentsService documentsService;

    // Convert to DTO
    private PetsDTO convertToDTO(Pets pet) {
        List<String> imageUrls = petsService.getImageUrlsForPet(pet.getPetId());
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
                pet.getShelter() != null ? pet.getShelter().getShelterId() : null,
                imageUrls
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
    public ResponseEntity<String> createPet(@RequestBody PetsDTO petsDTO) {
        int staffId = petsDTO.getStaffId();
        Pets newPet = new Pets();
        newPet.setName(petsDTO.getName());
        newPet.setSpecies(petsDTO.getSpecies());
        newPet.setBreed(petsDTO.getBreed());
        newPet.setAge(petsDTO.getAge());
        newPet.setGender(petsDTO.getGender());
        newPet.setHealthStatus(petsDTO.getHealthStatus());
        newPet.setBehavior(petsDTO.getBehavior());
        newPet.setDescription(petsDTO.getDescription());

        int shelterID = staffService.findStaffById(staffId).getShelter().getShelterId();
        // Assuming you have a method to find the shelter by ID
        Optional<Shelters> shelter = Optional.ofNullable(sheltersService.findShelterById(shelterID));
        shelter.ifPresent(newPet::setShelter);

        // Save the new entity
        Pets savedPet = petsService.savePet(newPet);
        Integer petId = savedPet.getPetId();

        // Save image URLs
        if (petsDTO.getImageUrls() != null && !petsDTO.getImageUrls().isEmpty()) {
            for (String imageUrl : petsDTO.getImageUrls()) {
                Documents document = new Documents();
                document.setPet(newPet);
                document.setDocument(imageUrl); // Assuming 'document' field holds the URL
                document.setDocumentType("image");
                documentsService.save(document);
            }
        }

        // Convert the saved entity back to DTO
        //PetsDTO savedPetDTO = convertToDTO(savedPet);

        return ResponseEntity.ok("Success");
    }


    // PUT - Update an existing pet
    @PutMapping("/update_pet")
    public ResponseEntity<?> updatePet(@RequestBody PetsDTO petsDTO) {
        int id = petsDTO.getPetId(); // Assuming you've added an `id` field to PetsDTO
        Pets existingPet = petsService.findPetById(id);
        if (existingPet != null) {
            existingPet.setName(petsDTO.getName());
            existingPet.setSpecies(petsDTO.getSpecies());
            existingPet.setBreed(petsDTO.getBreed());
            existingPet.setAge(petsDTO.getAge());
            existingPet.setGender(petsDTO.getGender());
            existingPet.setHealthStatus(petsDTO.getHealthStatus());
            existingPet.setBehavior(petsDTO.getBehavior());
            existingPet.setDescription(petsDTO.getDescription());

            for (String imageUrl : petsDTO.getImageUrls()) {
                Documents document = new Documents();
                document.setPet(existingPet);
                document.setDocument(imageUrl);
                document.setDocumentType("image");
                documentsService.save(document);
            }

            // Save the updated pet and convert to DTO
            Pets updatedPet = petsService.savePet(existingPet);
            return ResponseEntity.ok("success");
        }
        return ResponseEntity.notFound().build();
    }

    // DELETE - Remove a pet
    @DeleteMapping("/pets/{id}")
    public ResponseEntity<?> deletePet(@PathVariable Integer id) {
        if (petsService.findPetById(id) != null) {
            petsService.deletePet(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/getAllPets")
    public ResponseEntity<List<PetsDTO>> getAllPetsByStaff(@RequestParam int staffId) {
        List<PetsDTO> petsDTOs = petsService.findPetsByStaffId(staffId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());

        return ResponseEntity.ok(petsDTOs);
    }


}

