package com.projets.model;

import java.util.List;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
public class Enseignant extends Utilisateur {
    private String specialisation;

    // Getters et setters
    public String getSpecialisation() {
        return specialisation;
    }

    public void setSpecialisation(String specialisation) {
        this.specialisation = specialisation;
    }

    // Constructeur avec tous les champs, y compris ceux de la superclasse
    public Enseignant(int id, String nom, String email, String motDePasse, List<Planning> plannings, String specialisation) {
        super(id, nom, email, motDePasse, plannings);
        this.specialisation = specialisation;
    }

    // Constructeur sans argument
    public Enseignant() {
        super();
    }

    // Constructeur avec les champs de la superclasse seulement
    public Enseignant(int id, String nom, String email, String motDePasse, List<Planning> plannings) {
        super(id, nom, email, motDePasse, plannings);
    }
}
