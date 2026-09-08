# Dicionário de Dados

## Tabela: Usuário

| Campo | Tipo | Tamanho | Obrigatório | Chave | Descrição |
|---|---|---:|---|---|---|
| id | INTEGER | — | Sim | PK | Identificador único do usuário. |
| nome | VARCHAR | 100 | Sim | — | Nome completo do usuário. |
| email | VARCHAR | 100 | Sim | — | Endereço de e-mail utilizado pelo usuário. |
| senha | VARCHAR | 255 | Sim | — | Senha utilizada para autenticação no sistema. |
| perfil | VARCHAR | 20 | Sim | — | Define o perfil de acesso do usuário: ESTUDANTE, ORGANIZADOR ou ADMIN. |

## Tabela: Evento

| Campo | Tipo | Tamanho | Obrigatório | Chave | Descrição |
|---|---|---:|---|---|---|
| id | INTEGER | — | Sim | PK | Identificador único do evento. |
| titulo | VARCHAR | 255 | Sim | — | Nome ou título do evento acadêmico. |
| dataInicio | DATE | — | Sim | — | Data de início do evento. |
| dataLimiteInscricao | DATE | — | Sim | — | Data limite para realização das inscrições. |
| vagasTotais | INTEGER | — | Sim | — | Quantidade total de vagas disponíveis para o evento. |
| vagasDisponiveis | INTEGER | — | Sim | — | Quantidade de vagas ainda disponíveis para inscrição. |
| ativo | BOOLEAN | — | Não | — | Indica se o evento está ativo. Possui valor padrão TRUE. |

## Tabela: Inscrição

| Campo | Tipo | Tamanho | Obrigatório | Chave | Descrição |
|---|---|---:|---|---|---|
| id | INTEGER | — | Sim | PK | Identificador único da inscrição. |
| eventoId | INTEGER | — | Sim | FK | Identifica o evento no qual o usuário está inscrito. |
| usuarioId | INTEGER | — | Sim | FK | Identifica o usuário que realizou a inscrição. |
| dataInscricao | DATE | — | Sim | — | Data em que a inscrição foi realizada. |
| status | VARCHAR | 20 | Sim | — | Situação atual da inscrição. |

## Tabela: Categoria

| Campo | Tipo | Tamanho | Obrigatório | Chave | Descrição |
|---|---|---:|---|---|---|
| id | INTEGER | — | Sim | PK | Identificador único da categoria. |
| nome | VARCHAR | 100 | Sim | — | Nome da categoria do evento. |
| descricao | TEXT | — | Não | — | Descrição da categoria. |

## Tabela: Evento_Categoria

| Campo | Tipo | Tamanho | Obrigatório | Chave | Descrição |
|---|---|---:|---|---|---|
| id | INTEGER | — | Sim | PK | Identificador único do relacionamento. |
| eventoId | INTEGER | — | Sim | FK | Identifica o evento relacionado à categoria. |
| categoriaId | INTEGER | — | Sim | FK | Identifica a categoria relacionada ao evento. |

## Tabela: Palestrante

| Campo | Tipo | Tamanho | Obrigatório | Chave | Descrição |
|---|---|---:|---|---|---|
| id | INTEGER | — | Sim | PK | Identificador único do palestrante. |
| nome | VARCHAR | 100 | Sim | — | Nome completo do palestrante. |
| email | VARCHAR | 100 | Sim | — | Endereço de e-mail do palestrante. |
| instituicao | VARCHAR | 100 | Não | — | Instituição à qual o palestrante está vinculado. |
| descricao | TEXT | — | Não | — | Informações adicionais sobre o palestrante. |

## Tabela: Evento_Palestrante

| Campo | Tipo | Tamanho | Obrigatório | Chave | Descrição |
|---|---|---:|---|---|---|
| id | INTEGER | — | Sim | PK | Identificador único do relacionamento. |
| eventoId | INTEGER | — | Sim | FK | Identifica o evento relacionado ao palestrante. |
| palestranteId | INTEGER | — | Sim | FK | Identifica o palestrante relacionado ao evento. |
