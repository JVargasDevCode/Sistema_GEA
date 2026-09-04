# GEA — Gestão de Eventos Acadêmicos

Sistema web para gerenciamento de eventos acadêmicos, como semanas acadêmicas, palestras, workshops e minicursos.

### Descrição resumida
O GEA é um sistema web voltado à organização de eventos acadêmicos — como semanas acadêmicas, palestras, workshops e minicursos — que centraliza o cadastro de eventos, atividades e palestrantes, permite a inscrição dos participantes com controle automático de vagas, registra presença, possibilita avaliação das atividades e emite certificados automaticamente para quem atinge a frequência mínima exigida.

## Documentação

* [Contexto](Contexto.md)
* [Contexto e Problema](Contexto_E_Problema.md)
* [Objetivos](Objetivos.md)
* [Público-alvo e Perfis de Usuário](publico-alvo-e-perfis.md)
* [Escopo](Escopo.md)
* [Tecnologias Utilizadas](Tecnologias_Utilizadas.md)

## Tecnologias

* Java
* Python
* JavaScript
* React
* HTML5
* CSS3
* PostgreSQL
* SQL
* Visual Studio Code
=======
# GEA — Gestão de Eventos Acadêmicos.

Plataforma web centralizada para planejamento, inscrições, controle de presença e certificação automatizada de eventos acadêmicos.

---

## 📌 Visão Geral

O **GEA** simplifica a gestão de semanas acadêmicas, palestras, workshops e minicursos. A ferramenta centraliza cadastros, gerencia vagas em tempo real, valida frequência e automatiza a geração de certificados para os participantes elegíveis.

---

## 🎯 Contexto & Problema

Instituições de ensino frequentemente enfrentam gargalos no gerenciamento de eventos acadêmicos devido ao uso de ferramentas descentralizadas e processos manuais:

* **Inconsistência de Dados:** Uso de planilhas dispersas e formulários avulsos para inscrição.
* **Ineficiência Operacional:** Controle manual de vagas, listas de presença impressas em papel e emissão individual de certificados.
* **Falta de Transparência:** Ausência de confirmações instantâneas de vaga para os estudantes e atrasos na entrega dos comprovantes de participação.

### Solução Proposta
O GEA reduz erros de alocação de vagas, elimina retrabalho administrativo, padroniza a coleta de presença e fornece relatórios consolidados para análise de impacto e qualidade dos eventos institucionais.

---

## 🎯 Objetivos

### Objetivo Geral
Desenvolver uma aplicação web integrada para gestão, acompanhamento e certificação automática de eventos acadêmicos.

### Objetivos Específicos
* **Centralização:** Permitir o cadastro simplificado de eventos, cronogramas de atividades e palestrantes.
* **Automação de Vagas:** Gerenciar inscrições com controle dinâmico e limite por atividade.
* **Presença & Certificação:** Registrar a frequência dos participantes e emitir certificados automaticamente para quem cumprir os requisitos mínimos.
* **Tomada de Decisão:** Gerar relatórios consolidados sobre adesão, participação e avaliação das atividades.

---

## 👥 Perfis de Usuário

| Perfil | Responsabilidades & Ações |
| :--- | :--- |
| **Organizador / Administrador** | Gerencia eventos, atividades e palestrantes; monitora inscrições; registra presenças; acessa relatórios analíticos e valida a emissão de certificados. |
| **Participante** | Explora a programação; realiza inscrições em atividades; acompanha status de vaga; avalia sessões frequentadas e realiza o download de certificados. |

> **Nota:** Palestrantes são cadastrados como entidade vinculada às atividades (mini bio e contatos), sem perfil de acesso exclusivo nesta versão.

---

## 🗺️ Escopo do Projeto

### ✅ Funcionalidades Incluídas (v1.0)
- Cadastro de eventos, cronogramas, sessões e palestrantes.
- Sistema de inscrição on-line com controle automático de capacidade.
- Registro e validação de presença dos participantes.
- Regra de cálculo de frequência e emissão automática de certificados em PDF.
- Módulo de avaliação do evento pelos participantes.
- Painel de relatórios (inscrições, presença e feedbacks).

### ⛔ Fora do Escopo Atual
- Gestão de pagamentos ou cobrança de taxa de inscrição.
- Integração via API com sistemas acadêmicos legados.
- Aplicativo móvel nativo (a interface será estritamente web/responsiva).
- Validação de certificados via QR Code ou autenticação em Blockchain.
- Notificações ativas via SMS ou WhatsApp.

---

## ⚠️ Restrições

1. **Prazo:** O desenvolvimento está restrito ao cronograma do 1º bimestre acadêmico.
2. **Arquitetura:** Aplicação 100% web com suporte a layout responsivo para navegadores.
3. **Tecnologia:** Uso exclusivo de tecnologias dominadas pela equipe de desenvolvimento.
4. **Orçamento:** Custo zero — sem utilização de gateways de pagamento ou serviços de mensageria pagos.
>>>>>>> e762bdb54596b6f494e673dcb14afdf319b05636
