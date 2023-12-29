package Shelter.Pet_Adoption_System.model.Person;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@Data
@MappedSuperclass
@NoArgsConstructor
@AllArgsConstructor
public abstract class Person implements UserDetails {


    @Column(name = "name")
    protected String name;

    @Column(name = "email_address", unique = true, nullable = false)
    protected String emailAddress;

    @Column(name = "phone_number")
    protected String phoneNumber;

    @Column(name = "password_hash")
    protected String passwordHash;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getUsername() {
        return emailAddress;
    }

    @Override
    public String getPassword() {
        return passwordHash;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}