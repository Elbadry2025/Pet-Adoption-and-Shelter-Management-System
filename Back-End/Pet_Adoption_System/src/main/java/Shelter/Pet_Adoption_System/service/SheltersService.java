package Shelter.Pet_Adoption_System.service;

import Shelter.Pet_Adoption_System.model.Shelters.Shelters;
import Shelter.Pet_Adoption_System.repsitory.SheltersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SheltersService {

    @Autowired
    private SheltersRepository sheltersRepository;

    public List<Shelters> findAllShelters() {
        return sheltersRepository.findAll();
    }

    public Shelters findShelterById(int id) {
        return sheltersRepository.findById(id).orElse(null);
    }

    public List<Shelters> findSheltersByLocation(String location) {
        return sheltersRepository.findByLocation(location);
    }

    public Shelters saveShelter(Shelters shelter) {
        return sheltersRepository.save(shelter);
    }

    public void deleteShelter(int id) {
        sheltersRepository.deleteById(id);
    }
}
