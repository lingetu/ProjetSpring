package com.projets.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.projets.model.Planning;
import com.projets.model.Agenda;
import com.projets.model.Utilisateur;
import com.projets.service.PlanningService;
import com.projets.service.AgendaService;
import com.projets.service.UtilisateurService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class PlanningController {

    @Autowired
    private PlanningService planningService;

    @Autowired
    private AgendaService agendaService;

    @Autowired
    private UtilisateurService utilisateurService;

    private static final Logger logger = LoggerFactory.getLogger(PlanningController.class);

    @GetMapping("/api/plannings")
    public List<Planning> getPlannings() {
        return planningService.getAllPlannings();
    }

    @GetMapping("/api/plannings/{id}")
    public Planning getPlanning(@PathVariable("id") Integer id) {
        return planningService.getPlanningById(id);
    }

    @PostMapping("/api/plannings")
    public Planning save(@RequestBody Planning planning) {
        Planning savedPlanning = planningService.createPlanning(planning);
        logger.info("Planning inséré: " + savedPlanning);
        return savedPlanning;
    }

    @PostMapping("/api/plannings/delete/{id}")
    public void deletePlanning(@PathVariable("id") Integer id) {
        planningService.deletePlanning(id);
    }

    @GetMapping("/api/utilisateurs/{utilisateurId}/plannings")
    public List<Planning> getPlanningsByUtilisateurId(@PathVariable("utilisateurId") Integer utilisateurId) {
        return planningService.getPlanningsByUtilisateurId(utilisateurId);
    }
    
    @GetMapping("/api/agendas/{agendaId}/plannings")
    public List<Planning> getPlanningsByAgendaId(@PathVariable("agendaId") Integer agendaId) {
        return planningService.getPlanningsByAgendaId(agendaId);
    }
}
