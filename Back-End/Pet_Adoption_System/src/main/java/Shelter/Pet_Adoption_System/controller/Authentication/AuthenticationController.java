package Shelter.Pet_Adoption_System.controller.Authentication;

import Shelter.Pet_Adoption_System.controller.Requests.AdopterRegisterRequest;
import Shelter.Pet_Adoption_System.controller.Requests.LoginRequest;
import Shelter.Pet_Adoption_System.controller.Requests.StaffRegisterRequest;
import Shelter.Pet_Adoption_System.controller.Responses.AuthenticationResponse;
import Shelter.Pet_Adoption_System.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173/")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService service;

    @PostMapping("/staffRegister")
    public ResponseEntity<AuthenticationResponse> staffRegister(
            @RequestBody StaffRegisterRequest request
    ) {
        return ResponseEntity.ok(service.staffRegister(request));
    }

    @PostMapping("/adopterRegister")
    public ResponseEntity<AuthenticationResponse> adopterRegister(
            @RequestBody AdopterRegisterRequest request
    ) {
        return ResponseEntity.ok(service.adopterRegister(request));
    }

    @PostMapping("/authenticateAdopter")
    public ResponseEntity<AuthenticationResponse> authenticateAdopter(
            @RequestBody LoginRequest request
    ) {
        AuthenticationResponse token = service.login(request, false);
        if (token.getToken().equals("Unauthorized"))
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(token);
        else
            return ResponseEntity.ok(token);
    }

    @PostMapping("/authenticateStaff")
    public ResponseEntity<AuthenticationResponse> authenticateStaff(
            @RequestBody LoginRequest request
    ) {
        AuthenticationResponse token = service.login(request, true);
        if (token.getToken().equals("Unauthorized"))
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(token);
        else
            return ResponseEntity.ok(token);
    }
}
