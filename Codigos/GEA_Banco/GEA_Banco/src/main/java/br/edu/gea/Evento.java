package br.edu.gea;
import jakarta.persistence.*;
@Entity @Table(name="eventos")
public class Evento {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @Column(nullable=false,length=140) private String nome;
 @Column(nullable=false,length=100) private String data;
 @Column(nullable=false,length=140) private String local;
 @Column(nullable=false,length=2000) private String descricao;
 @Column(nullable=false,length=80) private String categoria;
 @Column(nullable=false) private boolean ativo=true;
 protected Evento(){}
 public Evento(String nome,String data,String local,String descricao,String categoria){this.nome=nome;this.data=data;this.local=local;this.descricao=descricao;this.categoria=categoria;}
 public Long getId(){return id;} public String getNome(){return nome;} public String getData(){return data;} public String getLocal(){return local;} public String getDescricao(){return descricao;} public String getCategoria(){return categoria;} public boolean isAtivo(){return ativo;}
 public void atualizar(String nome,String data,String local,String descricao,String categoria){this.nome=nome;this.data=data;this.local=local;this.descricao=descricao;this.categoria=categoria;}
 public void desativar(){this.ativo=false;}
}
