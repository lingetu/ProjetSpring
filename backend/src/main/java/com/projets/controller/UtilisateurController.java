package com.projets.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.projets.model.Enseignant;
import com.projets.model.Etudiant;
import com.projets.model.Utilisateur;
import com.projets.repository.UtilisateurRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/utilisateurs")
@CrossOrigin(origins = "http://localhost:4200")
public class UtilisateurController {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    private static final Logger logger = LoggerFactory.getLogger(UtilisateurController.class);

    @GetMapping
    public List<Utilisateur> getUtilisateurs() {
        logger.info("Fetching all users");
        return utilisateurRepository.findAll();
    }

    @GetMapping("/{id}")
    public Utilisateur getUtilisateur(@PathVariable("id") Integer id) {
        logger.info("Fetching user with id {}", id);
        return utilisateurRepository.findById(id).orElse(null);
    }

    @PostMapping("/")
    public Utilisateur save(@RequestBody Utilisateur u) {
        logger.info("Saving user with email {}", u.getEmail());

        if (u instanceof Etudiant) {
            Etudiant etudiant = (Etudiant) u;
            return utilisateurRepository.save(etudiant);
        } else if (u instanceof Enseignant) {
            Enseignant enseignant = (Enseignant) u;
            return utilisateurRepository.save(enseignant);
        } else {
            throw new IllegalArgumentException("Unknown user type");
        }
    }

    @DeleteMapping("/{id}")
    public void deleteUtilisateur(@PathVariable("id") Integer id) {
        logger.info("Deleting user with id {}", id);
        utilisateurRepository.deleteById(id);
    }

    @PostMapping("/login")
    public Utilisateur login(@RequestBody Utilisateur u) {
        logger.info("Login attempt for user with email {}", u.getEmail());
        Utilisateur utilisateur = utilisateurRepository.findByEmailAndMotDePasse(u.getEmail(), u.getMotDePasse());
        if (utilisateur != null) {
            logger.info("Login successful for user with email {}", u.getEmail());
            return utilisateur;
        } else {
            logger.warn("Login failed for user with email {}", u.getEmail());
            throw new RuntimeException("Invalid credentials");
        }
    }
}
