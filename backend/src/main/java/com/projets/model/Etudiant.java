package com.projets.model;

import java.util.List;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
public class Etudiant extends Utilisateur {
    private String matricule;

    // Getters et setters
    public String getMatricule() {
        return matricule;
    }

    public void setMatricule(String matricule) {
        this.matricule = matricule;
    }

    // Constructeur avec tous les champs, y compris ceux de la superclasse
    public Etudiant(int id, String nom, String email, String motDePasse, List<Planning> plannings, String matricule) {
        super(id, nom, email, motDePasse, plannings);
        this.matricule = matricule;
    }

    // Constructeur sans argument
    public Etudiant() {
        super();
    }

    // Constructeur avec les champs de la superclasse seulement
    public Etudiant(int id, String nom, String email, String motDePasse, List<Planning> plannings) {
        super(id, nom, email, motDePasse, plannings);
    }
}
