package br.edu.gea;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface InscricaoRepository extends JpaRepository<Inscricao, Long> {

    boolean existsByUsuarioIdAndEventoIdAndAtivaTrue(Long usuarioId, Long eventoId);

    Optional<Inscricao> findByUsuarioIdAndEventoId(Long usuarioId, Long eventoId);

    @Query("""
        SELECT i
        FROM Inscricao i
        JOIN FETCH i.evento
        JOIN FETCH i.usuario
        WHERE i.usuario.id = :usuarioId AND i.ativa = true
        ORDER BY i.criadaEm DESC
        """)
    List<Inscricao> buscarMinhasInscricoesAtivas(@Param("usuarioId") Long usuarioId);

    @Query("""
        SELECT i
        FROM Inscricao i
        JOIN FETCH i.evento
        JOIN FETCH i.usuario
        WHERE i.id = :id
        """)
    Optional<Inscricao> buscarPorIdComRelacionamentos(@Param("id") Long id);
}
