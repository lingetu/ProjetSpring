package com.projets.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.projets.model.Utilisateur;

public interface UtilisateurRepository extends JpaRepository<Utilisateur, Integer> {
    Utilisateur findByEmailAndMotDePasse(String email, String motDePasse);
}
