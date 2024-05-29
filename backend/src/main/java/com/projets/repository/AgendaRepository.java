package com.projets.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.projets.model.Agenda;

public interface AgendaRepository extends JpaRepository<Agenda, Integer> {
}
