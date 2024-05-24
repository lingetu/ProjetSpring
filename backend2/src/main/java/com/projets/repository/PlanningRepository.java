package com.projets.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projets.model.Planning;

@Repository
public interface PlanningRepository extends JpaRepository<Planning, Integer> {
}