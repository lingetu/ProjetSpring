package com.projets.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.projets.model.Agenda;
import com.projets.service.AgendaService;

@RestController
public class AgendaController {

    @Autowired
    private AgendaService agendaService;

    @GetMapping("/agendas")
    public List<Agenda> getAgendas() {
        return agendaService.getAllAgendas();
    }

    @GetMapping("/agendas/{id}")
    public Agenda getAgenda(@PathVariable("id") Integer id) {
        return agendaService.getAgendaById(id);
    }

    @PostMapping("/agendas")
    public Agenda save(@RequestBody Agenda agenda) {
        return agendaService.createAgenda(agenda);
    }

    @PostMapping("/agendas/delete/{id}")
    public void deleteAgenda(@PathVariable("id") Integer id) {
        agendaService.deleteAgenda(id);
    }
}
