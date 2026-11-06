package br.edu.gea;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EventoRepository extends JpaRepository<Evento, Long> {
    List<Evento> findByAtivoTrueOrderByIdDesc();
    boolean existsByNome(String nome);
}
