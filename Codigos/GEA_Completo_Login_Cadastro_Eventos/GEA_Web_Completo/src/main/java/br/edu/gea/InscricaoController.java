package br.edu.gea;

import jakarta.validation.Valid;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/api/inscricoes")
public class InscricaoController {
    private final EventoController eventoController;
    private final List<Inscricao> inscricoes = new CopyOnWriteArrayList<>();
    private final AtomicLong sequencia = new AtomicLong(1);

    public InscricaoController(EventoController eventoController) {
        this.eventoController = eventoController;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Inscricao inscrever(@Valid @RequestBody InscricaoRequest request, HttpSession session) {
        exigirLogin(session);
        Evento evento;
        try {
            evento = eventoController.obterPorId(request.getEventoId());
        } catch (ResponseStatusException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "O evento selecionado não existe.");
        }

        String emailNormalizado = request.getEmail().trim().toLowerCase();
        boolean duplicada = inscricoes.stream().anyMatch(i ->
                i.eventoId().equals(request.getEventoId())
                && i.email().equalsIgnoreCase(emailNormalizado));

        if (duplicada) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT, "Este e-mail já possui inscrição neste evento.");
        }

        Inscricao inscricao = new Inscricao(
                sequencia.getAndIncrement(),
                evento.id(),
                evento.nome(),
                request.getNome().trim(),
                emailNormalizado,
                request.getCurso().trim(),
                request.getTurno().trim(),
                LocalDateTime.now()
        );
        inscricoes.add(inscricao);
        return inscricao;
    }

    @GetMapping
    public List<Inscricao> listar(HttpSession session) {
        exigirLogin(session);
        return List.copyOf(inscricoes);
    }

    private void exigirLogin(HttpSession session) {
        if (session.getAttribute("usuarioEmail") == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Faça login para acessar as inscrições.");
        }
    }
}
