package Shelter.Pet_Adoption_System.service;

import Shelter.Pet_Adoption_System.model.Person.Adopters;
import Shelter.Pet_Adoption_System.repsitory.AdoptersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdoptersService {

    @Autowired
    private AdoptersRepository adoptersRepository;

    public List<Adopters> findAllAdopters() {
        return adoptersRepository.findAll();
    }

    public Optional<Adopters> findAdopterById(int id) {
        return adoptersRepository.findById(id);
    }

    public Optional<Adopters> findAdopterByEmail(String email) {
        return adoptersRepository.findByEmailAddress(email);
    }

    public Adopters saveAdopter(Adopters adopter) {
        return adoptersRepository.save(adopter);
    }

    public void deleteAdopter(int id) {
        adoptersRepository.deleteById(id);
    }
}

