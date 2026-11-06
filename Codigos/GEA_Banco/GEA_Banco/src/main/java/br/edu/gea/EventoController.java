package br.edu.gea;
import jakarta.servlet.http.HttpSession; import jakarta.validation.Valid;
import org.springframework.http.*; import org.springframework.web.bind.annotation.*; import org.springframework.web.server.ResponseStatusException; import java.util.List;
@RestController @RequestMapping("/api/eventos")
public class EventoController {
 private final EventoRepository eventos; private final AuthController auth;
 public EventoController(EventoRepository eventos,AuthController auth){this.eventos=eventos;this.auth=auth;}
 @GetMapping public List<Evento> listar(HttpSession s){auth.atual(s);return eventos.findByAtivoTrueOrderByIdDesc();}
 @GetMapping("/{id}") public Evento buscar(@PathVariable Long id,HttpSession s){auth.atual(s);return eventos.findById(id).filter(Evento::isAtivo).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Evento não encontrado."));}
 @PostMapping public ResponseEntity<Evento> criar(@Valid @RequestBody EventoRequest r,HttpSession s){auth.atual(s);return ResponseEntity.status(HttpStatus.CREATED).body(eventos.save(new Evento(r.nome,r.data,r.local,r.descricao,r.categoria)));}
 @PutMapping("/{id}") public Evento atualizar(@PathVariable Long id,@Valid @RequestBody EventoRequest r,HttpSession s){auth.atual(s);Evento e=buscarInterno(id);e.atualizar(r.nome,r.data,r.local,r.descricao,r.categoria);return eventos.save(e);}
 @DeleteMapping("/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void excluir(@PathVariable Long id,HttpSession s){auth.atual(s);Evento e=buscarInterno(id);e.desativar();eventos.save(e);}
 private Evento buscarInterno(Long id){return eventos.findById(id).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Evento não encontrado."));}
}
