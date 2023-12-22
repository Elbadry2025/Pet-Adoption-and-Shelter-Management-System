package Shelter.Pet_Adoption_System;


import Shelter.Pet_Adoption_System.model.Adoptions.Adoptions;
import Shelter.Pet_Adoption_System.model.Documents.Documents;
import Shelter.Pet_Adoption_System.model.Person.Adopters;
import Shelter.Pet_Adoption_System.model.Person.Staff;
import Shelter.Pet_Adoption_System.model.Pets.Pets;
import Shelter.Pet_Adoption_System.model.Shelters.Shelters;
import Shelter.Pet_Adoption_System.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private AdoptersService adoptersService;

    @Autowired
    private SheltersService sheltersService;

    @Autowired
    private PetsService petsService;

    @Autowired
    private AdoptionsService adoptionsService;

    @Autowired
    private DocumentsService documentsService;

    @Autowired
    private StaffService staffService;

    @Override
    public void run(String... args) throws Exception {
        // Create and save a shelter using constructor
        Shelters shelter = new Shelters("Happy Paws Shelter", "1234 Pet Lane", "contact@happypaws.com", "123-456-7890");

        shelter = sheltersService.saveShelter(shelter);

        // Create and save a pet using constructor
        Pets pet = new Pets("Buddy", "Dog", "Labrador", 2, "Male", "Healthy", "Friendly", "A very friendly dog.", shelter);
        pet = petsService.savePet(pet);

        // Create and save an adopter using constructor
        Adopters adopter = new Adopters("John Doe", "hashed_password", "john.doe@example.com", "987-654-3210");
        adopter = adoptersService.saveAdopter(adopter);

        // Create and save an adoption record using constructor
        Adoptions adoption = new Adoptions(pet, adopter, new Date(), "Completed");
        adoptionsService.saveAdoption(adoption);

        // Create and save a staff member using constructor
        Staff staff = new Staff("Alice Smith", "alice.smith@happypaws.com", "Manager", "another_hashed_password", "Master", shelter);
        staffService.saveStaff(staff);

        // Create and save a document for a pet
        byte[] sampleDocumentContent = {/* sample document content */};
        Documents document = new Documents(pet, "Vaccination Record", sampleDocumentContent);
        documentsService.saveDocument(document);

        // Log to indicate data initialization is complete
        System.out.println("Data initialization complete.");
    }
}
