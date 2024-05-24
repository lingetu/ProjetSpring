package com.projets.model;

import jakarta.persistence.Entity;

@Entity
public class Etudiant extends Utilisateur {
    private String matricule;

    // getters et setters
    public String getMatricule() {
        return matricule;
    }

    public void setMatricule(String matricule) {
        this.matricule = matricule;
    }

	public Etudiant(int id, String nom, String email, String motDePasse, String matricule) {
		super(id, nom, email, motDePasse);
		this.matricule = matricule;
	}

	public Etudiant() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Etudiant(int id, String nom, String email, String motDePasse) {
		super(id, nom, email, motDePasse);
		// TODO Auto-generated constructor stub
	}
    
}