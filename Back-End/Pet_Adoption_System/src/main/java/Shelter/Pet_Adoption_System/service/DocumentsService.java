package Shelter.Pet_Adoption_System.service;


import Shelter.Pet_Adoption_System.model.Documents.Documents;
import Shelter.Pet_Adoption_System.repsitory.DocumentsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DocumentsService {

    @Autowired
    private DocumentsRepository documentsRepository;

    public List<Documents> findAllDocuments() {
        return documentsRepository.findAll();
    }

    public Documents findDocumentById(int id) {
        return documentsRepository.findById(id).orElse(null);
    }

    public List<Documents> findDocumentsByPetId(int petId) {
        return documentsRepository.findByPetPetId(petId);
    }

    public Documents saveDocument(Documents document) {
        return documentsRepository.save(document);
    }

    public void deleteDocument(int id) {
        documentsRepository.deleteById(id);
    }
}
