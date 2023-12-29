package Shelter.Pet_Adoption_System.controller.Filter;

import Shelter.Pet_Adoption_System.Config.JwtService;
import Shelter.Pet_Adoption_System.model.Person.Adopters;
import Shelter.Pet_Adoption_System.model.Person.Staff;
import Shelter.Pet_Adoption_System.repsitory.AdoptersRepository;
import Shelter.Pet_Adoption_System.repsitory.StaffRepository;
import Shelter.Pet_Adoption_System.service.FilterService.FilterService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/filter")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class FilterController<T extends Comparable<T>> {

    private final FilterService<T> filterService;
    private final JwtService jwtService;
    private final AdoptersRepository adoptersRepository;
    private final StaffRepository staffRepository;

    public String extractToken(String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            return authorizationHeader.substring(7); // Skip "Bearer " prefix
        } else {
            throw new IllegalArgumentException("Authorization header doesn't exist or is in the wrong format");
        }
    }

    @PostMapping("/{entity}")
    public List<T> filter(@RequestHeader("Authorization") String authorizationHeader, @PathVariable String entity, @RequestBody Object criteria) {
        String token = extractToken(authorizationHeader);
        String email = jwtService.extractUsername(token);
        Optional<Adopters> adopter = adoptersRepository.findByEmailAddress(email);
        Optional<Staff> staff = staffRepository.findByEmailAddress(email);
        if (adopter.isPresent() || staff.isPresent())
            return filterService.filter(entity, criteria);
        else
            return new ArrayList<>();
    }
}