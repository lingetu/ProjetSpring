package com.projets.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projets.model.Agenda;
import com.projets.repository.AgendaRepository;

@Service
public class AgendaService {

    @Autowired
    private AgendaRepository agendaRepository;

    public List<Agenda> getAllAgendas() {
        return agendaRepository.findAll();
    }

    public Agenda getAgendaById(Integer id) {
        return agendaRepository.findById(id).orElse(null);
    }

    public Agenda createAgenda(Agenda agenda) {
        return agendaRepository.save(agenda);
    }

    public void deleteAgenda(Integer id) {
        agendaRepository.deleteById(id);
    }
}
