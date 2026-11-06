package br.edu.gea;
import jakarta.servlet.http.HttpSession; import jakarta.validation.Valid;
import org.springframework.http.*; import org.springframework.web.bind.annotation.*; import org.springframework.web.server.ResponseStatusException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder; import java.util.Map;
@RestController @RequestMapping("/api/auth")
public class AuthController {
 private final UsuarioRepository usuarios; private final BCryptPasswordEncoder encoder=new BCryptPasswordEncoder();
 public AuthController(UsuarioRepository usuarios){this.usuarios=usuarios;}
 @PostMapping("/register") public ResponseEntity<?> cadastrar(@Valid @RequestBody CadastroRequest r){
  if(!r.getSenha().equals(r.getConfirmarSenha())) throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"A senha e a confirmação não são iguais.");
  String email=r.getEmail().trim().toLowerCase();
  if(usuarios.existsByEmailIgnoreCase(email)) throw new ResponseStatusException(HttpStatus.CONFLICT,"Já existe uma conta com esse e-mail.");
  usuarios.save(new Usuario(r.getNome().trim(),email,encoder.encode(r.getSenha())));
  return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("mensagem","Cadastro realizado com sucesso."));
 }
 @PostMapping("/login") public Map<String,String> login(@Valid @RequestBody LoginRequest r,HttpSession s){
  Usuario u=usuarios.findByEmailIgnoreCase(r.getEmail().trim()).orElseThrow(()->new ResponseStatusException(HttpStatus.UNAUTHORIZED,"E-mail ou senha incorretos."));
  if(!encoder.matches(r.getSenha(),u.getSenhaHash())) throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"E-mail ou senha incorretos.");
  s.setAttribute("usuarioId",u.getId()); s.setAttribute("usuarioEmail",u.getEmail()); s.setAttribute("usuarioNome",u.getNome());
  return Map.of("mensagem","Login realizado com sucesso.","nome",u.getNome());
 }
 @GetMapping("/me") public Map<String,Object> me(HttpSession s){Usuario u=atual(s);return Map.of("id",u.getId(),"nome",u.getNome(),"email",u.getEmail());}
 @PutMapping("/me") public Map<String,Object> atualizar(@RequestBody Map<String,String> body,HttpSession s){
  Usuario u=atual(s); String nome=body.getOrDefault("nome","").trim();
  if(nome.isBlank()||nome.length()>100) throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Informe um nome com até 100 caracteres.");
  u.atualizarPerfil(nome); usuarios.save(u); s.setAttribute("usuarioNome",nome); return Map.of("mensagem","Perfil atualizado.","nome",nome,"email",u.getEmail());
 }
 @PostMapping("/logout") public Map<String,String> logout(HttpSession s){s.invalidate();return Map.of("mensagem","Você saiu da sua conta.");}
 Usuario atual(HttpSession s){Object id=s.getAttribute("usuarioId"); if(id==null) throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Faça login para continuar.");return usuarios.findById((Long)id).orElseThrow(()->new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Usuário não encontrado."));}
}
