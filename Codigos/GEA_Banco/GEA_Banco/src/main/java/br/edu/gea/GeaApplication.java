package br.edu.gea;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class GeaApplication {
    public static void main(String[] args) {
        SpringApplication.run(GeaApplication.class, args);
    }

    @Bean
    CommandLineRunner seed(EventoRepository repo) {
        return args -> {

            if (!repo.existsByNome("Semana Acadêmica 2026")) {
                repo.save(new Evento("Semana Acadêmica 2026", "15 a 17 de outubro de 2026", "Auditório Principal",
                        "Palestras, oficinas e atividades para a comunidade acadêmica.", "Acadêmico"));
            }
            if (!repo.existsByNome("Congresso de Tecnologia")) {
                repo.save(new Evento("Congresso de Tecnologia", "20 a 22 de outubro de 2026", "Bloco B",
                        "Encontro para compartilhar tendências, projetos e experiências em tecnologia.", "Tecnologia"));
            }
            if (!repo.existsByNome("Festa Universitária")) {
                repo.save(new Evento("Festa Universitária", "05 de novembro de 2026", "Quadra Poliesportiva",
                        "Uma oportunidade para integração e confraternização entre estudantes.", "Social"));
            }

            if (!repo.existsByNome("Mostra de Pesquisa e Inovação")) {
                repo.save(new Evento("Mostra de Pesquisa e Inovação", "19 de novembro de 2026", "Centro de Convenções",
                        "Apresentação de projetos, iniciação científica e trabalhos desenvolvidos pelos estudantes.", "Acadêmico"));
            }
            if (!repo.existsByNome("Hackathon Universitário 2026")) {
                repo.save(new Evento("Hackathon Universitário 2026", "26 e 27 de novembro de 2026", "Laboratórios de Informática — Bloco C",
                        "Desafio colaborativo de programação para criar soluções digitais para problemas reais.", "Tecnologia"));
            }
            if (!repo.existsByNome("Noite Cultural Universitária")) {
                repo.save(new Evento("Noite Cultural Universitária", "04 de dezembro de 2026", "Espaço de Convivência",
                        "Uma noite de música, apresentações artísticas e integração entre cursos.", "Social"));
            }
        };
    }
}
