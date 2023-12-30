package Shelter.Pet_Adoption_System.service.FilterService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FilterService<T extends Comparable<T>> {

    private final FilterPets filterPets;

    public List<T> filter(String entity, Object criteria) {
        try {
            return switch (entity) {
                case "Pet" -> filterPets.filter(criteria);
                // Add more entities
                default -> throw new Exception();
            };
        } catch (Exception e) {
            return null;
        }
    }

}