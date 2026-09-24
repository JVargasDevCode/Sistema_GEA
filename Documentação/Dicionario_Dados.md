# Dicionário de Dados — Sistema de Gestão de Eventos Acadêmicos

Este documento descreve a estrutura das tabelas e atributos do banco de dados relacional do sistema.

---

## 1. Tabela: `usuario`
Armazena as informações dos usuários cadastrados no sistema (Participantes, Organizadores e Administradores).

| Campo | Tipo de Dado | Tamanho | Requerido | Descrição / Restrições |
| :--- | :--- | :--- | :--- | :--- |
| `id` | INT (PK) | - | Sim | Identificador único do usuário (Auto-incremento). |
| `nome` | VARCHAR | 100 | Sim | Nome completo do usuário. |
| `email` | VARCHAR | 100 | Sim | Endereço de e-mail (Único). |
| `senha` | VARCHAR | 255 | Sim | Hash criptografado da senha. |
| `perfil` | ENUM | - | Sim | Valore possíveis: `'PARTICIPANTE'`, `'ORGANIZADOR'`, `'ADMIN'`. |
| `data_cadastro` | TIMESTAMP | - | Sim | Data e hora em que o cadastro foi efetuado. |

---

## 2. Tabela: `evento`
Registra os eventos acadêmicos cadastrados no sistema.

| Campo | Tipo de Dado | Tamanho | Requerido | Descrição / Restrições |
| :--- | :--- | :--- | :--- | :--- |
| `id` | INT (PK) | - | Sim | Identificador único do evento (Auto-incremento). |
| `titulo` | VARCHAR | 150 | Sim | Nome do evento acadêmico. |
| `descricao` | TEXT | - | Não | Descrição detalhada sobre o evento. |
| `data_inicio` | DATETIME | - | Sim | Data e hora do início do evento. |
| `data_fim` | DATETIME | - | Sim | Data e hora do encerramento do evento. |
| `local` | VARCHAR | 150 | Sim | Localização física (ex: Auditório A) ou link virtual. |
| `vagas_totais` | INT | - | Sim | Quantidade limite de vagas oferecidas. |
| `vagas_disponiveis` | INT | - | Sim | Vagas remanescentes para inscrição. |
| `organizador_id` | INT (FK) | - | Sim | Chave estrangeira referente a `usuario.id`. |

---

## 3. Tabela: `palestrante`
Registra os dados dos palestrantes e ministrantes das atividades.

| Campo | Tipo de Dado | Tamanho | Requerido | Descrição / Restrições |
| :--- | :--- | :--- | :--- | :--- |
| `id` | INT (PK) | - | Sim | Identificador único do palestrante (Auto-incremento). |
| `nome` | VARCHAR | 100 | Sim | Nome completo do palestrante. |
| `biografia` | TEXT | - | Não | Resumo acadêmico/profissional. |
| `email` | VARCHAR | 100 | Sim | E-mail de contato do palestrante. |
| `instituicao` | VARCHAR | 100 | Não | Empresa ou universidade de origem. |

---

## 4. Tabela: `sessao` (Programação / Atividades)
Armazena a programação do evento (Palestras, Minicursos e Oficinas).

| Campo | Tipo de Dado | Tamanho | Requerido | Descrição / Restrições |
| :--- | :--- | :--- | :--- | :--- |
| `id` | INT (PK) | - | Sim | Identificador único da sessão (Auto-incremento). |
| `evento_id` | INT (FK) | - | Sim | Chave estrangeira referente a `evento.id`. |
| `palestrante_id` | INT (FK) | - | Sim | Chave estrangeira referente a `palestrante.id`. |
| `titulo` | VARCHAR | 150 | Sim | Título da atividade/palestra. |
| `tipo` | ENUM | - | Sim | Valores: `'PALESTRA'`, `'MINICURSO'`, `'OFICINA'`. |
| `data_hora_inicio` | DATETIME | - | Sim | Data e horário de início da sessão. |
| `data_hora_fim` | DATETIME | - | Sim | Data e horário de término da sessão. |
| `local` | VARCHAR | 100 | Sim | Sala, laboratório ou auditório específico. |

---

## 5. Tabela: `inscricao`
Relaciona os participantes aos eventos em que se inscreveram.

| Campo | Tipo de Dado | Tamanho | Requerido | Descrição / Restrições |
| :--- | :--- | :--- | :--- | :--- |
| `id` | INT (PK) | - | Sim | Identificador único da inscrição (Auto-incremento). |
| `usuario_id` | INT (FK) | - | Sim | Chave estrangeira referente ao participante (`usuario.id`). |
| `evento_id` | INT (FK) | - | Sim | Chave estrangeira referente a `evento.id`. |
| `data_inscricao` | TIMESTAMP | - | Sim | Data/hora de confirmação da inscrição. |
| `status` | ENUM | - | Sim | Valores: `'CONFIRMADA'`, `'CANCELADA'`, `'EM_ESPERA'`. |
| `percentual_frequencia`| DECIMAL(5,2)| - | Não | Frequência calculada no evento (0.00 a 100.00%). |

---

## 6. Tabela: `presenca`
Controle individual de presença por atividade/sessão.

| Campo | Tipo de Dado | Tamanho | Requerido | Descrição / Restrições |
| :--- | :--- | :--- | :--- | :--- |
| `id` | INT (PK) | - | Sim | Identificador único do registro de presença. |
| `inscricao_id` | INT (FK) | - | Sim | Chave estrangeira referente a `inscricao.id`. |
| `sessao_id` | INT (FK) | - | Sim | Chave estrangeira referente a `sessao.id`. |
| `presente` | BOOLEAN | - | Sim | `TRUE` se marcou presença, `FALSE` caso contrário. |
| `data_hora_registro` | TIMESTAMP | - | Sim | Momento em que a presença foi validada. |

---

## 7. Tabela: `certificado`
Registra os certificados gerados para os participantes aptos (Frequência >= 75%).

| Campo | Tipo de Dado | Tamanho | Requerido | Descrição / Restrições |
| :--- | :--- | :--- | :--- | :--- |
| `id` | INT (PK) | - | Sim | Identificador único do certificado. |
| `inscricao_id` | INT (FK) | - | Sim | Chave estrangeira referente a `inscricao.id` (Único). |
| `codigo_validacao` | VARCHAR | 64 | Sim | Hash/Código único para validação pública do certificado. |
| `data_emissao` | TIMESTAMP | - | Sim | Data e hora da emissão do documento. |
| `url_pdf` | VARCHAR | 255 | Não | Caminho ou URL de armazenamento do PDF. |

---

## 8. Tabela: `avaliacao`
Armazena a opinião e nota enviada pelos participantes sobre o evento.

| Campo | Tipo de Dado | Tamanho | Requerido | Descrição / Restrições |
| :--- | :--- | :--- | :--- | :--- |
| `id` | INT (PK) | - | Sim | Identificador único da avaliação. |
| `inscricao_id` | INT (FK) | - | Sim | Chave estrangeira referente a `inscricao.id`. |
| `nota` | INT | - | Sim | Nota atribuída ao evento (de 1 a 5). |
| `comentario` | TEXT | - | Não | Feedback descritivo sobre o evento. |
| `data_avaliacao` | TIMESTAMP | - | Sim | Data e hora de envio da avaliação. |
