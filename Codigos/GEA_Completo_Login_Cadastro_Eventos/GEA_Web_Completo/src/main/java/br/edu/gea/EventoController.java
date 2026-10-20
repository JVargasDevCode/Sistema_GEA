package br.edu.gea;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/eventos")
public class EventoController {
    private final List<Evento> eventos = List.of(
        new Evento(1L, "Semana Acadêmica 2026", "15 a 17 de outubro de 2026",
                "Auditório Principal",
                "Palestras, oficinas e atividades para a comunidade acadêmica.",
                "Acadêmico"),
        new Evento(2L, "Congresso de Tecnologia", "20 a 22 de outubro de 2026",
                "Bloco B",
                "Encontro para compartilhar tendências, projetos e experiências em tecnologia.",
                "Tecnologia"),
        new Evento(3L, "Festa Universitária", "05 de novembro de 2026",
                "Quadra Poliesportiva",
                "Uma oportunidade para integração e confraternização entre estudantes.",
                "Social")
    );

    @GetMapping
    public List<Evento> listar(HttpSession session) {
        exigirLogin(session);
        return eventos;
    }

    private void exigirLogin(HttpSession session) {
        if (session.getAttribute("usuarioEmail") == null) {
            throw new org.springframework.web.server.ResponseStatusException(
                    org.springframework.http.HttpStatus.UNAUTHORIZED, "Faça login para consultar os eventos.");
        }
    }

    Evento obterPorId(Long id) {
        return eventos.stream()
                .filter(evento -> evento.id().equals(id))
                .findFirst()
                .orElseThrow(() -> new org.springframework.web.server.ResponseStatusException(
                        org.springframework.http.HttpStatus.NOT_FOUND, "Evento não encontrado."));
    }

    @GetMapping("/{id}")
    public Evento buscarPorId(@PathVariable Long id, HttpSession session) {
        exigirLogin(session);
        return eventos.stream()
                .filter(evento -> evento.id().equals(id))
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Evento não encontrado."));
    }
}
