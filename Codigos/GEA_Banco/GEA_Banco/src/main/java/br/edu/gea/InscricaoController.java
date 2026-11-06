package br.edu.gea;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/inscricoes")
public class InscricaoController {

    private final InscricaoRepository inscricoes;
    private final EventoRepository eventos;
    private final AuthController auth;

    public InscricaoController(InscricaoRepository i, EventoRepository e, AuthController a) {
        inscricoes = i;
        eventos = e;
        auth = a;
    }

    @PostMapping
    @Transactional
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, Object> inscrever(@Valid @RequestBody InscricaoRequest r, HttpSession s) {
        Usuario u = auth.atual(s);

        String nomeInformado = r.getNome().trim();
        String emailInformado = r.getEmail().trim();
        if (!u.getNome().trim().equalsIgnoreCase(nomeInformado)
                || !u.getEmail().trim().equalsIgnoreCase(emailInformado)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "A inscrição deve ser feita com o mesmo nome e e-mail cadastrados na sua conta. Não é permitido inscrever outra pessoa usando seu login.");
        }

        Evento e = eventos.findById(r.getEventoId())
                .filter(Evento::isAtivo)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Evento não encontrado."));

        // A tabela mantém uma única linha por usuário/evento. Se já houve cancelamento, reativa a inscrição existente.
        Inscricao i = inscricoes.findByUsuarioIdAndEventoId(u.getId(), e.getId())
                .orElse(null);

        if (i != null) {
            if (i.isAtiva()) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Você já possui inscrição ativa neste evento.");
            }
            i.reativar(r.getCurso().trim(), r.getTurno().trim());
        } else {
            i = new Inscricao(e, u, r.getCurso().trim(), r.getTurno().trim());
        }

        i = inscricoes.save(i);
        return dto(i);
    }

    @GetMapping
    @Transactional(readOnly = true)
    public List<Map<String, Object>> minhas(HttpSession s) {
        Usuario u = auth.atual(s);
        return inscricoes.buscarMinhasInscricoesAtivas(u.getId())
                .stream().map(this::dto).toList();
    }

    @PatchMapping("/{id}/cancelar")
    @Transactional
    public Map<String, String> cancelar(@PathVariable Long id, HttpSession s) {
        Usuario u = auth.atual(s);
        Inscricao i = inscricoes.buscarPorIdComRelacionamentos(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Inscrição não encontrada."));

        if (!i.getUsuario().getId().equals(u.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Você não pode cancelar esta inscrição.");
        }
        if (!i.isAtiva()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Esta inscrição já foi cancelada.");
        }

        i.cancelar();
        inscricoes.save(i);
        return Map.of("mensagem", "Inscrição cancelada.");
    }

    private Map<String, Object> dto(Inscricao i) {
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("id", i.getId());
        m.put("eventoId", i.getEvento().getId());
        m.put("eventoNome", i.getEvento().getNome());
        m.put("eventoData", i.getEvento().getData());
        m.put("eventoLocal", i.getEvento().getLocal());
        m.put("eventoCategoria", i.getEvento().getCategoria());
        m.put("nome", i.getUsuario().getNome());
        m.put("email", i.getUsuario().getEmail());
        m.put("curso", i.getCurso());
        m.put("turno", i.getTurno());
        m.put("criadaEm", i.getCriadaEm());
        m.put("ativa", i.isAtiva());
        return m;
    }
}
