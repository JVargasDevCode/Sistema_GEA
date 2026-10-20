package br.edu.gea;

public record Evento(
        Long id,
        String nome,
        String data,
        String local,
        String descricao,
        String categoria
) {}
