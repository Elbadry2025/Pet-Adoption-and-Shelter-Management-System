package Shelter.Pet_Adoption_System.Config;

import Shelter.Pet_Adoption_System.model.Person.Adopters;
import Shelter.Pet_Adoption_System.model.Person.Staff;
import Shelter.Pet_Adoption_System.repsitory.AdoptersRepository;
import Shelter.Pet_Adoption_System.repsitory.StaffRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfiguration {
    private final AdoptersRepository adoptersRepository;
    private final StaffRepository staffRepository;

    @Bean
    public UserDetailsService userDetailsService() {
        return username -> {
            Optional<Adopters> optionalAdopter = adoptersRepository.findByEmailAddress(username);
            Optional<Staff> optionalStaff = staffRepository.findByEmailAddress(username);
            if (optionalAdopter.isPresent()) {
                return optionalAdopter.get();
            } else if (optionalStaff.isPresent()) {
                return optionalStaff.get();
            } else {
                throw new UsernameNotFoundException("User Email Not Found");
            }
        };
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService());
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }
}