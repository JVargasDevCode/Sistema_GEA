package br.edu.gea;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.AssertTrue;

public class InscricaoRequest {
    @NotNull(message = "Selecione um evento.")
    private Long eventoId;

    @NotBlank(message = "Informe seu nome.")
    private String nome;

    @NotBlank(message = "Informe seu e-mail.")
    @Email(message = "Informe um e-mail válido.")
    private String email;

    @NotBlank(message = "Informe seu curso.")
    private String curso;

    @NotBlank(message = "Selecione seu turno.")
    private String turno;

    @AssertTrue(message = "É necessário aceitar os termos e condições.")
    private boolean aceitouTermos;

    public Long getEventoId() { return eventoId; }
    public void setEventoId(Long eventoId) { this.eventoId = eventoId; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getCurso() { return curso; }
    public void setCurso(String curso) { this.curso = curso; }
    public String getTurno() { return turno; }
    public void setTurno(String turno) { this.turno = turno; }
    public boolean isAceitouTermos() { return aceitouTermos; }
    public void setAceitouTermos(boolean aceitouTermos) { this.aceitouTermos = aceitouTermos; }
}
