package com.projets.model;

import java.util.Date;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Planning {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String type; // Général ou Spécifique
    private String TypeEvenement;
    private Date DateDebut;
    private Date DateFin;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getTypeEvenement() {
		return TypeEvenement;
	}
	public void setTypeEvenement(String typeEvenement) {
		TypeEvenement = typeEvenement;
	}
	public Date getDateDebut() {
		return DateDebut;
	}
	public void setDateDebut(Date dateDebut) {
		DateDebut = dateDebut;
	}
	public Date getDateFin() {
		return DateFin;
	}
	public void setDateFin(Date dateFin) {
		DateFin = dateFin;
	}
	public Planning(int id, String type, String typeEvenement, Date dateDebut, Date dateFin) {
		super();
		this.id = id;
		this.type = type;
		TypeEvenement = typeEvenement;
		DateDebut = dateDebut;
		DateFin = dateFin;
	}
	public Planning() {
		super();
		// TODO Auto-generated constructor stub
	}   
    
}