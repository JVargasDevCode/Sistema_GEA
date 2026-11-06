package br.edu.gea;
import jakarta.persistence.*; import java.time.LocalDateTime;
@Entity @Table(name="inscricoes",uniqueConstraints=@UniqueConstraint(columnNames={"usuario_id","evento_id"}))
public class Inscricao {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @ManyToOne(optional=false,fetch=FetchType.LAZY) @JoinColumn(name="evento_id") private Evento evento;
 @ManyToOne(optional=false,fetch=FetchType.LAZY) @JoinColumn(name="usuario_id") private Usuario usuario;
 @Column(nullable=false,length=100) private String curso;
 @Column(nullable=false,length=30) private String turno;
 @Column(nullable=false) private LocalDateTime criadaEm;
 @Column(nullable=false) private boolean ativa=true;
 protected Inscricao(){}
 public Inscricao(Evento evento,Usuario usuario,String curso,String turno){this.evento=evento;this.usuario=usuario;this.curso=curso;this.turno=turno;this.criadaEm=LocalDateTime.now();}
 public Long getId(){return id;} public Evento getEvento(){return evento;} public Usuario getUsuario(){return usuario;} public String getCurso(){return curso;} public String getTurno(){return turno;} public LocalDateTime getCriadaEm(){return criadaEm;} public boolean isAtiva(){return ativa;}
 public void cancelar(){ativa=false;}
 public void reativar(String curso,String turno){this.curso=curso;this.turno=turno;this.criadaEm=LocalDateTime.now();this.ativa=true;}
}
