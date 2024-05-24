package com.projets.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projets.model.Agenda;

@Repository
public interface AgendaRepository extends JpaRepository<Agenda, Integer> {
}