package br.edu.gea;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final Map<String, Usuario> usuarios = new ConcurrentHashMap<>();
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> cadastrar(@Valid @RequestBody CadastroRequest request) {
        String nome = request.getNome().trim();
        String email = normalizarEmail(request.getEmail());

        if (!request.getSenha().equals(request.getConfirmarSenha())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A senha e a confirmação não são iguais.");
        }

        Usuario novo = new Usuario(nome, email, passwordEncoder.encode(request.getSenha()));
        Usuario existente = usuarios.putIfAbsent(email, novo);
        if (existente != null) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Já existe uma conta cadastrada com esse e-mail.");
        }

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("mensagem", "Cadastro realizado com sucesso. Agora entre com seu e-mail e senha."));
    }

    @PostMapping("/login")
    public Map<String, String> login(@Valid @RequestBody LoginRequest request, HttpSession session) {
        String email = normalizarEmail(request.getEmail());
        Usuario usuario = usuarios.get(email);

        if (usuario == null || !passwordEncoder.matches(request.getSenha(), usuario.senhaHash())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "E-mail ou senha incorretos.");
        }

        session.setAttribute("usuarioEmail", usuario.email());
        session.setAttribute("usuarioNome", usuario.nome());
        return Map.of("mensagem", "Login realizado com sucesso.", "nome", usuario.nome());
    }

    @GetMapping("/me")
    public Map<String, String> usuarioAtual(HttpSession session) {
        String email = (String) session.getAttribute("usuarioEmail");
        String nome = (String) session.getAttribute("usuarioNome");
        if (email == null || nome == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Você precisa entrar para acessar esta área.");
        }
        return Map.of("email", email, "nome", nome);
    }

    @PostMapping("/logout")
    public Map<String, String> logout(HttpSession session) {
        session.invalidate();
        return Map.of("mensagem", "Você saiu da sua conta.");
    }

    private String normalizarEmail(String email) {
        return email.trim().toLowerCase();
    }
}
