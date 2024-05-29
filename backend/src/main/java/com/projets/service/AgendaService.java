package com.projets.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.projets.model.Agenda;
import com.projets.repository.AgendaRepository;

import java.util.List;

@Service
public class AgendaService {

    @Autowired
    private AgendaRepository agendaRepository;

    public Agenda getAgendaById(Integer id) {
        return agendaRepository.findById(id).orElse(null);
    }

    public List<Agenda> getAllAgendas() {
        return agendaRepository.findAll();
    }

    public Agenda createAgenda(Agenda agenda) {
        return agendaRepository.save(agenda);
    }

    public void deleteAgenda(Integer id) {
        agendaRepository.deleteById(id);
    }
}
