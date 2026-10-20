package br.edu.gea;

import java.time.LocalDateTime;

public record Inscricao(
        Long id,
        Long eventoId,
        String eventoNome,
        String nome,
        String email,
        String curso,
        String turno,
        LocalDateTime criadaEm
) {}
