package Shelter.Pet_Adoption_System.service.FilterService;


import Shelter.Pet_Adoption_System.controller.DTO.FilterPetsDto;
import Shelter.Pet_Adoption_System.model.Pets.Pets;
import Shelter.Pet_Adoption_System.model.Shelters.Shelters;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

import java.util.Objects;

@RequiredArgsConstructor
@Repository
public class FilterPets<T extends Comparable<T>> implements IFilter {
    private final EntityManager entityManager;

    private static List<Predicate> getPredicates(Object criteria, CriteriaBuilder criteriaBuilder, Root<Pets> root) {
        List<Predicate> predicates = new ArrayList<>();
        ObjectMapper objectMapper = new ObjectMapper();
        FilterPetsDto filterPetDto = objectMapper.convertValue(criteria, FilterPetsDto.class);
        setRangesPredicates(criteriaBuilder, root, predicates, filterPetDto);
        setBooleanPredicates(criteriaBuilder, root, predicates, filterPetDto);
        setStringsPredicates(criteriaBuilder, root, predicates, filterPetDto);
        return predicates;
    }


    private static void setRangesPredicates(
            CriteriaBuilder criteriaBuilder,
            Root<Pets> root,
            List<Predicate> predicates,
            FilterPetsDto filterPetsDto
    ) {
        predicates.add(criteriaBuilder
                .greaterThanOrEqualTo(root.get("age"), filterPetsDto.getAge()));
    }

    private static void setBooleanPredicates(
            CriteriaBuilder criteriaBuilder,
            Root<Pets> root,
            List<Predicate> predicates,
            FilterPetsDto filterPetsDto
    ) {
        if (filterPetsDto.isHouse_trained())
            predicates.add(criteriaBuilder
                    .isTrue(root.get("house_trained")));
        if (filterPetsDto.isVaccinated())
            predicates.add(criteriaBuilder
                    .isTrue(root.get("vaccinated")));
        if (filterPetsDto.isNeutered())
            predicates.add(criteriaBuilder
                    .isTrue(root.get("neutered")));
    }

    private static void setStringsPredicates(
            CriteriaBuilder criteriaBuilder,
            Root<Pets> root,
            List<Predicate> predicates,
            FilterPetsDto filterPetsDto
    ) {
        if (!Objects.equals(filterPetsDto.getName(), "")) {
            predicates.add(criteriaBuilder
                    .like(root.get("name"), "%" + filterPetsDto.getName() + "%"));
        }
        if (!Objects.equals(filterPetsDto.getBreed(), "")) {
            predicates.add(criteriaBuilder
                    .like(root.get("breed"), "%" + filterPetsDto.getBreed() + "%"));
        }
        if (!Objects.equals(filterPetsDto.getBehavior(), "")) {
            predicates.add(criteriaBuilder
                    .like(root.get("behavior"), "%" + filterPetsDto.getBehavior() + "%"));
        }
        if (!Objects.equals(filterPetsDto.getSpecies(), "")) {
            predicates.add(criteriaBuilder
                    .like(root.get("species"), "%" + filterPetsDto.getSpecies() + "%"));
        }
        if (!Objects.equals(filterPetsDto.getShelter_location(), "")) {
            Join<Pets, Shelters> shelterJoin = root.join("shelter_id");
            predicates.add(criteriaBuilder
                    .like(shelterJoin.get("location"), "%" + filterPetsDto.getShelter_location() + "%"));
        }
    }

    @Override
    public List<Pets> filter(Object criteria) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Pets> criteriaQuery = criteriaBuilder.createQuery(Pets.class);
        Root<Pets> root = criteriaQuery.from(Pets.class);
        List<Predicate> predicates = getPredicates(criteria, criteriaBuilder, root);
        criteriaQuery.where(criteriaBuilder.and(predicates.toArray(new Predicate[0])));
        return entityManager.createQuery(criteriaQuery).getResultList();
    }
}
