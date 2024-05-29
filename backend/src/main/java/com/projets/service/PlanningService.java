package com.projets.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projets.model.Planning;
import com.projets.repository.PlanningRepository;

@Service
public class PlanningService {

    @Autowired
    private PlanningRepository planningRepository;

    public List<Planning> getAllPlannings() {
        return planningRepository.findAll();
    }

    public Planning getPlanningById(Integer id) {
        return planningRepository.findById(id).orElse(null);
    }

    public Planning createPlanning(Planning planning) {
        return planningRepository.save(planning);
    }

    public void deletePlanning(Integer id) {
        planningRepository.deleteById(id);
    }

    public List<Planning> getPlanningsByUtilisateurId(Integer utilisateurId) {
        return planningRepository.findByUtilisateurId(utilisateurId);
    }
    
    public List<Planning> getPlanningsByAgendaId(Integer agendaId) {
        return planningRepository.findByAgendaId(agendaId);
    }
    
    
}
