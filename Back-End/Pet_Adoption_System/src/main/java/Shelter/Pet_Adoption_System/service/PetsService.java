package Shelter.Pet_Adoption_System.service;

import Shelter.Pet_Adoption_System.model.Documents.Documents;
import Shelter.Pet_Adoption_System.model.Pets.Pets;
import Shelter.Pet_Adoption_System.repsitory.PetsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.stream.Collectors;

@Service
public class PetsService {
    @Autowired
    private StaffService staffService;
    @Autowired
    private PetsRepository petsRepository;

    @Autowired
    private DocumentsService documentsService;

    public List<String> getImageUrlsForPet(Integer petId) {
        List<Documents> documents = documentsService.findDocumentsByPetId(petId);
        return documents.stream()
                .map(Documents::getDocument) // Assuming getDocument() returns the URL
                .collect(Collectors.toList());
    }


    public List<Pets> findAllPets() {
        return petsRepository.findAll();
    }

    public Pets findPetById(int id) {
        return petsRepository.findById(id).orElse(null);
    }

    public List<Pets> findPetsBySpecies(String species) {
        return petsRepository.findBySpecies(species);
    }

    public List<Pets> findPetsByShelterId(int shelterId) {
        return petsRepository.findByShelterShelterId(shelterId);
    }

    public List<Pets> findYoungPets(int maxAge) {
        return petsRepository.findByAgeLessThanEqual(maxAge);
    }

    public Pets savePet(Pets pet) {
        return petsRepository.save(pet);
    }

    public void deletePet(int id) {
        petsRepository.deleteById(id);
    }
    public List<Pets> findPetsByStaffId(int staffId) {
        return petsRepository.findByShelterShelterId(staffService.findStaffById(staffId).getShelter().getShelterId());
    }
}
