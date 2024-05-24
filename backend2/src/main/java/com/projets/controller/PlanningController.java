package com.projets.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.projets.model.Planing;
import com.projets.service.PlaningService;

import java.util.List;

@RestController
@RequestMapping("/planings")
public class PlanningController {
    @Autowired
    private PlanningService planingService;

    @GetMapping
    public List<Planing> getPlanings() {
        return planingService.getAllPlanings();
    }

    @GetMapping("/{id}")
    public Planing getPlaning(@PathVariable("id") Integer id) {
        return planingService.getPlaningById(id).orElse(null);
    }

    @PostMapping
    public Planing save(@RequestBody Planing planing) {
        return planingService.savePlaning(planing);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Integer id) {
        planingService.deletePlaning(id);
    }
}
