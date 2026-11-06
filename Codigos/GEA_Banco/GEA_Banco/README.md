# GEA — Gestão de Eventos Acadêmicos

Versão evoluída do projeto, com **Java 17, Spring Boot, API REST e PostgreSQL**.

## O que já está implementado

- Cadastro e login com senha criptografada (BCrypt).
- Persistência de usuários, eventos e inscrições no PostgreSQL.
- Listagem e consulta de detalhes de eventos.
- Criação, edição e desativação lógica de eventos pela API.
- Inscrição do usuário autenticado, com bloqueio de inscrição ativa duplicada.
- Consulta das próprias inscrições e cancelamento.
- Atualização básica do nome no perfil.
- Dados iniciais de demonstração para eventos.

## Tecnologias

- Java 17+
- Spring Boot 3.5.6
- Spring Data JPA / Hibernate
- PostgreSQL 16
- HTML, CSS e JavaScript

## Como executar

### 1. Iniciar o banco

É necessário ter Docker Desktop instalado e aberto. Na pasta que contém `docker-compose.yml`, execute:

```bash
docker compose up -d
```

Isso cria o banco `gea_db`, usuário `gea_user` e senha `gea123` na porta `5432`.

### 2. Abrir o projeto

Abra a pasta `GEA_Web_Completo` no IntelliJ IDEA e aguarde o Maven carregar as dependências.

### 3. Executar

Execute a classe `GeaApplication.java` ou rode:

```bash
mvn spring-boot:run
```

Acesse: http://localhost:8080

O Hibernate cria/atualiza as tabelas automaticamente (`ddl-auto=update`). Os eventos de demonstração são inseridos somente quando a tabela de eventos está vazia.

## Configuração alternativa

As variáveis `DB_URL`, `DB_USER` e `DB_PASSWORD` podem substituir as configurações padrão de `application.properties`.

## Principais endpoints

| Método | Endpoint | Descrição |
|---|---|---|
| POST | `/api/auth/register` | Cadastro |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Consultar perfil |
| PUT | `/api/auth/me` | Atualizar nome do perfil |
| POST | `/api/auth/logout` | Encerrar sessão |
| GET | `/api/eventos` | Listar eventos |
| GET | `/api/eventos/{id}` | Detalhes do evento |
| POST | `/api/eventos` | Criar evento |
| PUT | `/api/eventos/{id}` | Editar evento |
| DELETE | `/api/eventos/{id}` | Desativar evento |
| POST | `/api/inscricoes` | Inscrever-se |
| GET | `/api/inscricoes` | Listar minhas inscrições |
| PATCH | `/api/inscricoes/{id}/cancelar` | Cancelar inscrição |

As rotas que consultam dados exigem sessão autenticada. No momento, as operações de gerenciamento de eventos exigem login, mas **ainda não possuem controle de perfil administrador**.

## O que ainda falta (intencionalmente)

O projeto está em estágio avançado, mas não é uma versão final de produção. Próximas atividades sugeridas:

1. Implementar perfis e autorização (administrador/participante), protegendo criação, edição e exclusão de eventos.
2. Criar telas completas no frontend para perfil, minhas inscrições e gerenciamento de eventos.
3. Adicionar filtros por data, categoria e disponibilidade.
4. Definir regras de lotação e encerramento de inscrições.
5. Criar migrations versionadas com Flyway, substituindo o `ddl-auto=update`.
6. Implementar testes automatizados de integração e validação de permissões.
7. Revisar segurança de sessão/CSRF e configurar credenciais por variáveis de ambiente antes de publicar.

## Observações acadêmicas

O banco de dados é PostgreSQL e os dados não são mais mantidos apenas em listas em memória. A aplicação usa JPA para mapear as classes Java em tabelas relacionais. A interface atual foi mantida como base; algumas funcionalidades novas já existem na API, mas ainda precisam de telas próprias.


## Área "Minhas inscrições"

Após entrar, o participante pode abrir **Minhas inscrições** no menu para consultar apenas as próprias inscrições, visualizar o evento e cancelar uma inscrição ativa. A tela consome `GET /api/inscricoes` e `PATCH /api/inscricoes/{id}/cancelar`; o backend valida a sessão e impede que um usuário consulte ou cancele inscrições de outra pessoa.


## Atualização da interface — Minhas inscrições e imagens

- Após entrar, o participante encontra o botão **Minhas inscrições** no cabeçalho e também ao lado do título da página de eventos.
- A área consulta `GET /api/inscricoes` e mostra somente as inscrições do usuário autenticado.
- Cada inscrição exibe evento, categoria, curso, turno, data, status, atalho para os detalhes e opção de cancelamento quando ativa.
- As imagens ilustrativas por categoria ficam em `src/main/resources/static/images/` e são servidas localmente pela aplicação; não dependem de internet.
- Após confirmar uma inscrição, a tela de sucesso também oferece acesso direto a **Minhas inscrições**.

### Atualizar a versão em execução

1. Pare a execução anterior de `GeaApplication` no IntelliJ pelo botão vermelho **Stop**. Se a porta 8080 continuar ocupada, feche a outra execução que estiver usando essa porta antes de iniciar esta versão.
2. Abra esta pasta do projeto no IntelliJ e aguarde a sincronização Maven.
3. Execute `GeaApplication` uma única vez.
4. No navegador, atualize com `Ctrl + F5` para recarregar os arquivos locais de CSS e JavaScript.
5. Entre na conta e use o botão **Minhas inscrições**.

**Banco de dados:** mantenha o mesmo contêiner e o mesmo volume PostgreSQL já utilizados. Não remova o volume `gea_data`, pois ele contém os dados persistidos.

## Telas adicionais desta versão

Esta versão também inclui as telas informativas **Comitês**, **Atléticas**, **Editais**, **Ingressos** e **Contato**, além das telas de autenticação, eventos e inscrições já existentes. As telas informativas são conteúdo demonstrativo no front-end; elas não criam inscrições externas nem representam editais ou atléticas oficiais.

Os arquivos Java, a configuração do PostgreSQL, o `pom.xml`, o `docker-compose.yml` e os recursos de imagens do projeto-base foram preservados. Os arquivos `index.html`, `app.js` e `styles.css` foram atualizados para incluir as novas telas.
