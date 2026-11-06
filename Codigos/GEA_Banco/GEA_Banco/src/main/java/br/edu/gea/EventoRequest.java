package br.edu.gea;
import jakarta.validation.constraints.NotBlank; import jakarta.validation.constraints.Size;
public class EventoRequest {
 @NotBlank @Size(max=140) public String nome;
 @NotBlank @Size(max=100) public String data;
 @NotBlank @Size(max=140) public String local;
 @NotBlank @Size(max=2000) public String descricao;
 @NotBlank @Size(max=80) public String categoria;
}
