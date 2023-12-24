package Shelter.Pet_Adoption_System.controller.Authentication;

import Shelter.Pet_Adoption_System.controller.Requests.LoginRequest;
import Shelter.Pet_Adoption_System.controller.Requests.RegisterRequest;
import Shelter.Pet_Adoption_System.controller.Responses.AuthenticationResponse;
import Shelter.Pet_Adoption_System.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:XXXX/")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        AuthenticationResponse token = service.register(request);
        if (token.getToken().equals("FORBIDDEN"))
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(token);
        else
            return ResponseEntity.ok(token);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody LoginRequest request
    ) {
        AuthenticationResponse token = service.login(request);
        if (token.getToken().equals("Unauthorized"))
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(token);
        else
            return ResponseEntity.ok(token);
    }
}
