package br.edu.gea;
import jakarta.persistence.*;
@Entity @Table(name="usuarios")
public class Usuario {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @Column(nullable=false,length=100) private String nome;
 @Column(nullable=false,unique=true,length=150) private String email;
 @Column(nullable=false) private String senhaHash;
 protected Usuario(){}
 public Usuario(String nome,String email,String senhaHash){this.nome=nome;this.email=email;this.senhaHash=senhaHash;}
 public Long getId(){return id;} public String getNome(){return nome;} public String getEmail(){return email;} public String getSenhaHash(){return senhaHash;}
 public void atualizarPerfil(String nome){this.nome=nome;}
}
