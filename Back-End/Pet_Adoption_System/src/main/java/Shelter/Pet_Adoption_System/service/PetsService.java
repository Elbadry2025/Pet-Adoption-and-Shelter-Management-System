package Shelter.Pet_Adoption_System.service;

import Shelter.Pet_Adoption_System.model.Pets.Pets;
import Shelter.Pet_Adoption_System.repsitory.PetsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PetsService {

    @Autowired
    private PetsRepository petsRepository;

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
}
