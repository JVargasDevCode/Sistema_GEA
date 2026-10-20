# GEA — Gestão de Eventos Acadêmicos (web)

Stack: Java 17+, Spring Boot, Maven, HTML, CSS e JavaScript.

## Funcionalidades
- Tela inicial com opções Entrar e Criar conta.
- Cadastro de usuário com validação de campos, e-mail, senha mínima de 6 caracteres, confirmação de senha e e-mail duplicado.
- Cadastro inválido mostra mensagem e retorna à tela inicial após 2,2 segundos.
- Senhas protegidas com BCrypt (não armazenadas em texto puro).
- Login real com sessão HTTP.
- Eventos, detalhes e inscrições protegidos: é necessário estar autenticado.
- Pesquisa e filtro de eventos.
- Inscrição com nome, e-mail, curso, turno e aceite dos termos.
- Impede inscrição duplicada para mesmo evento e e-mail.

## Executar no IntelliJ
1. Abra a pasta que contém este `pom.xml` como projeto Maven ou clique com o botão direito em `pom.xml` > Add as Maven Project.
2. Use JDK 17 ou superior.
3. Aguarde o Maven baixar as dependências.
4. Execute `src/main/java/br/edu/gea/GeaApplication.java`.
5. Acesse http://localhost:8080.

## Endpoints
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/logout`
- `GET /api/eventos`
- `GET /api/eventos/{id}`
- `POST /api/inscricoes`
- `GET /api/inscricoes`

## Observações
Usuários e inscrições ficam em memória e são apagados ao reiniciar o servidor. As sessões são gerenciadas pelo Spring/Tomcat. É um projeto didático, não uma configuração de produção.
