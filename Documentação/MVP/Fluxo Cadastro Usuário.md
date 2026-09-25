## Definição de um fluxo completo
Para demonstrar o funcionamento do MVP, foi selecionado o fluxo de cadastro de usuário, por ser uma etapa essencial para o acesso ao sistema.

### Fluxo escolhido

**Tela Inicial → Cadastro de Usuário → Preenchimento dos dados → Validação → Cadastro realizado com sucesso → Login**

### Requisitos envolvidos

| Etapa | Requisito |
|---|---|
| Acesso à Tela Inicial | — |
| Cadastro do usuário | **RF02** |
| Validação dos dados | **RF02** |
| Confirmação do cadastro | **RF02** |
| Autenticação posterior | **RNF03** |

### Telas envolvidas

| Etapa | Tela |
|---|---|
| Início | **Tela Inicial** |
| Cadastro | **Tela de Cadastro de Usuário** |
| Conclusão | **Feedback de Cadastro Realizado** |
| Acesso posterior | **Tela de Login** |

### Entidades do banco de dados envolvidas

| Entidade | Participação no fluxo |
|---|---|
| **Usuário** | Armazena os dados cadastrados pelo usuário e suas informações de acesso. |

