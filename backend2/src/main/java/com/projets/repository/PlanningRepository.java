package com.projets.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.projets.model.Planning;

import java.util.List;

public interface PlanningRepository extends JpaRepository<Planning, Integer> {
    List<Planning> findByUtilisateurId(Integer utilisateurId);
    List<Planning> findByAgendaId(Integer agendaId);
}
