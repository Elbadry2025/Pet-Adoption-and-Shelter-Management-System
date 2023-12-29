package Shelter.Pet_Adoption_System.service;

import Shelter.Pet_Adoption_System.Config.JwtService;
import Shelter.Pet_Adoption_System.controller.Requests.AdopterRegisterRequest;
import Shelter.Pet_Adoption_System.controller.Requests.LoginRequest;
import Shelter.Pet_Adoption_System.controller.Requests.StaffRegisterRequest;
import Shelter.Pet_Adoption_System.controller.Responses.AuthenticationResponse;
import Shelter.Pet_Adoption_System.model.Person.Adopters;
import Shelter.Pet_Adoption_System.model.Person.Staff;
import Shelter.Pet_Adoption_System.model.Shelters.Shelters;
import Shelter.Pet_Adoption_System.repsitory.AdoptersRepository;
import Shelter.Pet_Adoption_System.repsitory.SheltersRepository;
import Shelter.Pet_Adoption_System.repsitory.StaffRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final AdoptersRepository adoptersRepository;
    private final StaffRepository staffRepository;
    private final SheltersRepository sheltersRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    public AuthenticationResponse staffRegister(StaffRegisterRequest request) {
        try {
            Optional<Adopters> adoptersCheck = adoptersRepository.findByEmailAddress(request.getEmailAddress());
            Optional<Staff> staffCheck = staffRepository.findByEmailAddress(request.getEmailAddress());

            if (staffCheck.isPresent()) {
                return AuthenticationResponse.builder().token("Already Exist").build();
            } else if (adoptersCheck.isPresent()) {
                return AuthenticationResponse.builder().token("Already Exist").build();
            }
            Optional<Shelters> shelter = sheltersRepository.findByShelterId(request.getShelterId());
            if (shelter.isPresent()) {
                Staff staff = new Staff(request.getName(), request.getEmailAddress(), request.getPhoneNumber(),
                        passwordEncoder.encode(request.getPasswordHash()), request.getRole(),
                        shelter.get());
                staffRepository.save(staff);
                String token =  jwtService.generateToken(staff);
                return AuthenticationResponse.builder()
                        .token(token)
                        .build();
            } else {
                return AuthenticationResponse.builder()
                        .token("Shelter not found")
                        .build();
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return AuthenticationResponse.builder().token(e.getMessage()).build();
        }
    }

    public AuthenticationResponse adopterRegister(AdopterRegisterRequest request) {
        try {
            Optional<Adopters> adoptersCheck = adoptersRepository.findByEmailAddress(request.getEmailAddress());
            Optional<Staff> staffCheck = staffRepository.findByEmailAddress(request.getEmailAddress());

            if (staffCheck.isPresent()) {
                return AuthenticationResponse.builder().token("Already Exist").build();
            } else if (adoptersCheck.isPresent()) {
                return AuthenticationResponse.builder().token("Already Exist").build();
            }
            Adopters adopter = new Adopters(request.getName(), request.getEmailAddress(),
                    request.getPhoneNumber(), passwordEncoder.encode(request.getPasswordHash()));
            adoptersRepository.save(adopter);
            String token =  jwtService.generateToken(adopter);
            return AuthenticationResponse.builder()
                    .token(token)
                    .build();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return AuthenticationResponse.builder().token(e.getMessage()).build();
        }
    }

    public AuthenticationResponse login(LoginRequest request, boolean type) throws NoSuchElementException { // type: false for adopters
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmailAddress(),
                            request.getPasswordHash()
                    )
            );
        } catch (Exception e) {
            return AuthenticationResponse.builder().token("Unauthorized").build();
        }

        Optional<Adopters> adopter = adoptersRepository.findByEmailAddress(request.getEmailAddress());
        Optional<Staff> staff = staffRepository.findByEmailAddress(request.getEmailAddress());
        if (adopter.isPresent() && !type) {
            String token = jwtService.generateToken(adopter.get());
            return AuthenticationResponse.builder()
                    .token(token)
                    .build();
        } else if (staff.isPresent() && type) {
            String token = jwtService.generateToken(staff.get());
            return AuthenticationResponse.builder()
                    .token(token)
                    .build();
        } else {
            return AuthenticationResponse.builder()
                    .token("Unauthorized")
                    .build();
        }
    }

}
