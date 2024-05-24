package com.projets.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.projets.model.Planning;
import com.projets.service.PlanningService;

@RestController
public class PlanningController {

    @Autowired
    private PlanningService planningService;

    @GetMapping("/plannings")
    public List<Planning> getPlannings() {
        return planningService.getAllPlannings();
    }

    @GetMapping("/plannings/{id}")
    public Planning getPlanning(@PathVariable("id") Integer id) {
        return planningService.getPlanningById(id);
    }

    @PostMapping("/plannings")
    public Planning save(@RequestBody Planning planning) {
        return planningService.createPlanning(planning);
    }

    @PostMapping("/plannings/delete/{id}")
    public void deletePlanning(@PathVariable("id") Integer id) {
        planningService.deletePlanning(id);
    }

    @GetMapping("/utilisateurs/{utilisateurId}/plannings")
    public List<Planning> getPlanningsByUtilisateurId(@PathVariable("utilisateurId") Integer utilisateurId) {
        return planningService.getPlanningsByUtilisateurId(utilisateurId);
    }
}
