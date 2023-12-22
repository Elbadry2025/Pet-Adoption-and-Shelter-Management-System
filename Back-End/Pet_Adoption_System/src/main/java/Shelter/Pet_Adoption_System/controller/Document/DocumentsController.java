package Shelter.Pet_Adoption_System.controller.Document;


import Shelter.Pet_Adoption_System.controller.DTO.DocumentsDTO;
import Shelter.Pet_Adoption_System.model.Documents.Documents;
import Shelter.Pet_Adoption_System.service.DocumentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/documents")
public class DocumentsController {

    @Autowired
    private DocumentsService documentsService;

    // Convert to DTO
    private DocumentsDTO convertToDTO(Documents document) {
        return new DocumentsDTO(document.getDocumentId(), document.getPet().getPetId(), document.getDocumentType(), document.getDocument());
    }

    // GET all documents
    @GetMapping
    public List<DocumentsDTO> getAllDocuments() {
        return documentsService.findAllDocuments().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // GET a single document by ID
    @GetMapping("/{id}")
    public ResponseEntity<DocumentsDTO> getDocumentById(@PathVariable Integer id) {
        Optional<Documents> document = Optional.ofNullable(documentsService.findDocumentById(id));
        return document.map(doc -> ResponseEntity.ok(convertToDTO(doc)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // POST - Create a new document
    @PostMapping
    public ResponseEntity<DocumentsDTO> createDocument(@RequestBody DocumentsDTO documentsDTO) {
        Documents newDocument = new Documents(/* Construct a new Documents entity from documentsDTO */);
        Documents savedDocument = documentsService.saveDocument(newDocument);
        return ResponseEntity.ok(convertToDTO(savedDocument));
    }

    // PUT - Update an existing document
    @PutMapping("/{id}")
    public ResponseEntity<DocumentsDTO> updateDocument(@PathVariable Integer id, @RequestBody DocumentsDTO documentsDTO) {
        Optional<Documents> existingDocument = Optional.ofNullable(documentsService.findDocumentById(id));
        if (existingDocument.isPresent()) {
            Documents document = existingDocument.get();
            // Update logic
            Documents updatedDocument = documentsService.saveDocument(document);
            return ResponseEntity.ok(convertToDTO(updatedDocument));
        }
        return ResponseEntity.notFound().build();
    }

    // DELETE - Remove a document
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDocument(@PathVariable Integer id) {
        Optional<Documents> document = Optional.ofNullable(documentsService.findDocumentById(id));
        if (document.isPresent()) {
            documentsService.deleteDocument(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}

