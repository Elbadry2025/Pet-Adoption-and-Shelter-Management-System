package Shelter.Pet_Adoption_System.service;

import Shelter.Pet_Adoption_System.model.Adoptions.Adoptions;
import Shelter.Pet_Adoption_System.repsitory.AdoptionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.List;

@Service
public class AdoptionsService {

    @Autowired
    private AdoptionsRepository adoptionsRepository;

    public List<Adoptions> findAllAdoptions() {
        return adoptionsRepository.findAll();
    }

    public Adoptions findAdoptionById(int id) {
        return adoptionsRepository.findById(id).orElse(null);
    }

    public List<Adoptions> getAdoptionsByShelterId(Integer shelterId) {
        return adoptionsRepository.findAllByShelterId(shelterId);
    }

    public List<Adoptions> findAdoptionsByDate(Date date) {
        return adoptionsRepository.findByAdoptionDate(date);
    }

    public List<Adoptions> findAdoptionsByUserId(int userId) {
        return adoptionsRepository.findByAdopterUserId(userId);
    }

    public Adoptions saveAdoption(Adoptions adoption) {
        return adoptionsRepository.save(adoption);
    }

    public void changeAdoptionStatus(int id, String status) {
        Adoptions adoption = adoptionsRepository.findById(id).orElse(null);
        adoption.setStatus(status);
        adoptionsRepository.save(adoption);
    }

    public void deleteAdoption(int id) {
        adoptionsRepository.deleteById(id);
    }
}
