# Especificação de casos de uso ou histórias de usuário

## Funcionalidades prioritárias

### 1. Realizar inscrição

**Ator:** Acadêmico

**Objetivo:** Permitir que o acadêmico realize a inscrição em um evento.

O acadêmico acessa o sistema, consulta os eventos disponíveis, escolhe um evento e realiza sua inscrição. O sistema deve verificar se ainda existem vagas e, após a inscrição, enviar uma confirmação.

**História de usuário:**

**Como** acadêmico, **quero** realizar minha inscrição em um evento disponível, **para** garantir minha participação.

**Critérios de aceitação:**

- O sistema deve apresentar os eventos disponíveis.
- O sistema deve verificar se existem vagas antes de confirmar a inscrição.
- O sistema deve registrar a inscrição do acadêmico.
- O sistema deve enviar uma confirmação após a inscrição ser realizada.
- O sistema não deve permitir inscrição quando não houver vagas.

---

### 2. Gerenciar eventos

**Ator:** Organizador

**Objetivo:** Permitir que o responsável pelo evento cadastre e gerencie os eventos.

O organizador precisa conseguir criar e administrar os eventos que serão disponibilizados aos acadêmicos, mantendo informações como programação e atividades.

**História de usuário:**

**Como** organizador, **quero** cadastrar e gerenciar os eventos, **para** disponibilizá-los aos acadêmicos e manter suas informações atualizadas.

**Critérios de aceitação:**

- O organizador deve conseguir cadastrar um evento.
- O organizador deve conseguir alterar as informações do evento.
- O organizador deve conseguir organizar a programação.
- As informações atualizadas devem ficar disponíveis para consulta.

---

### 3. Controlar presença

**Ator:** Organizador

**Objetivo:** Registrar a participação dos acadêmicos nos eventos.

Depois que os acadêmicos realizam suas inscrições, o organizador precisa controlar quem efetivamente participou das atividades. Essa funcionalidade também é importante porque a presença pode estar relacionada à emissão posterior do certificado.

**História de usuário:**

**Como** organizador, **quero** registrar a presença dos acadêmicos nas atividades do evento, **para** manter o controle dos participantes e possibilitar a emissão dos certificados.

**Critérios de aceitação:**

- O sistema deve apresentar os acadêmicos inscritos.
- O organizador deve conseguir registrar a presença.
- O sistema deve armazenar o registro de presença.
- O registro deve ficar associado ao acadêmico e à atividade correspondente.

---

### 4. Gerar certificados

**Ator:** Organizador

**Consulta:** Palestrante/Acadêmico

**Objetivo:** Emitir certificados para os participantes que cumpriram os requisitos do evento.

Essa é uma funcionalidade importante porque representa uma das entregas finais do sistema. O controle de presença pode ser utilizado para determinar quais acadêmicos estão aptos a receber o certificado.

**História de usuário:**

**Como** organizador, **quero** gerar certificados para os participantes que cumpriram os requisitos do evento, **para** disponibilizar a comprovação de participação.

**Critérios de aceitação:**

- O sistema deve verificar os registros necessários para a emissão.
- O organizador deve conseguir gerar os certificados.
- O certificado deve estar associado ao participante e ao evento.
- O acadêmico deve conseguir consultar seu certificado após sua emissão.

---

### 5. Consultar programação

**Atores:** Acadêmico e Palestrante

**Objetivo:** Permitir que os participantes e palestrantes visualizem as atividades programadas para o evento.

A consulta da programação é fundamental para que os acadêmicos saibam quais atividades acontecerão e para que os palestrantes possam verificar seus compromissos dentro do evento.

**História de usuário:**

**Como** acadêmico ou palestrante, **quero** consultar a programação do evento, **para** saber quais atividades serão realizadas, seus horários e minha participação nelas.

**Critérios de aceitação:**

- O sistema deve apresentar a programação do evento.
- As atividades devem ser organizadas de acordo com seus horários.
- O usuário deve conseguir visualizar as atividades disponíveis.
- O palestrante deve conseguir identificar as atividades relacionadas à sua participação.

---

## Tabela das funcionalidades prioritárias

| ID | História | Ator | Prioridade |
| --- | --- | --- | --- |
| **HU01** | Realizar inscrição | Acadêmico | Alta |
| **HU02** | Gerenciar eventos | Organizador | Alta |
| **HU03** | Controlar presença | Organizador | Alta |
| **HU04** | Gerar certificados | Organizador | Alta |
| **HU05** | Consultar programação | Acadêmico/Palestrante | Média |
