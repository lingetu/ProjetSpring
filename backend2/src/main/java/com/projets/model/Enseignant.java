package com.projets.model;

import jakarta.persistence.Entity;

@Entity
public class Enseignant extends Utilisateur {
    private String specialisation;

    // getters et setters
    public String getSpecialisation() {
        return specialisation;
    }

    public void setSpecialisation(String specialisation) {
        this.specialisation = specialisation;
    }

	public Enseignant(String specialisation) {
		super();
		this.specialisation = specialisation;
	}

	public Enseignant() {
		super();
	}
    
}