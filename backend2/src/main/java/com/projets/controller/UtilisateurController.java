package com.projets.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.projets.model.Utilisateur;
import com.projets.repository.UtilisateurRepository;

@RestController
public class UtilisateurController {
    @Autowired UtilisateurRepository utilisateurRepository;
  
    @GetMapping("/utilisateurs")
    public List<Utilisateur> getUtilisateurs(){
    	return utilisateurRepository.findAll();
    }
    
    @GetMapping("/utilisateurs/{id}")
    public Utilisateur getUtilisateur(@PathVariable("id") Integer id){
    	return utilisateurRepository.findById(id).get();
    }
    
    @PostMapping("/utilisateurs")
    public Utilisateur save(@RequestBody Utilisateur u){
    	utilisateurRepository.save(u);
    	return u;
    }
    
}
