| **Requisito**                                               | **Caso de uso/história**                              | **Entidades envolvidas**                     | **Tela prevista**                | **No MVP?** |
| ----------------------------------------------------------- | ----------------------------------------------------- | -------------------------------------------- | -------------------------------- | ----------- |
| **RF01 — Cadastrar eventos acadêmicos**                     | UC01 — Cadastrar Evento                               | Evento, Categoria, Evento_Categoria, Usuário | Tela de cadastro de evento       | **Sim**     |
| **RF02 — Cadastrar participantes**                          | UC02 — Cadastrar Participante                         | Usuário                                      | Tela de cadastro de participante | **Sim**     |
| **RF03 — Realizar inscrição em eventos**                    | UC03 — Realizar Inscrição                             | Usuário, Evento, Inscrição                   | Tela de inscrição em evento      | **Sim**     |
| **RF04 — Cadastrar palestrantes**                           | UC04 — Cadastrar Palestrante                          | Palestrante, Evento_Palestrante, Evento      | Tela de cadastro de palestrante  | **Não**     |
| **RF05 — Cadastrar programação**                            | UC05 — Cadastrar Programação                          | Evento, Palestrante                          | Tela de cadastro da programação  | **Não**     |
| **RF06 — Emitir certificados**                              | UC06 — Emitir Certificado                             | Usuário, Evento, Inscrição                   | Tela de emissão de certificado   | **Não**     |
| **RF07 — Consultar lista de inscritos**                     | UC07 — Consultar Inscritos                            | Evento, Inscrição, Usuário                   | Tela de lista de inscritos       | **Sim**     |
| **RF08 — Enviar confirmação de inscrição**                  | UC08 — Confirmar Inscrição                            | Usuário, Inscrição, Evento                   | Tela de confirmação de inscrição | **Não**     |
| **RF09 — Controlar presença**                               | UC09 — Registrar Presença                             | Usuário, Evento, Inscrição                   | Tela de controle de presença     | **Sim**     |
| **RF10 — Gerar relatórios**                                 | UC10 — Gerar Relatórios                              | Evento, Usuário, Inscrição, Palestrante      | Tela de relatórios               | **Não**     |
| **RN01 — Controlar disponibilidade de vagas**               | UC03 — Realizar Inscrição                             | Evento, Inscrição                            | Tela de inscrição em evento      | **Sim**     |
| **RN02 — Emitir certificado somente com frequência mínima** | UC06 — Emitir Certificado / UC09 — Registrar Presença | Usuário, Evento, Inscrição                   | Tela de emissão de certificado   | **Não**     |
| **RN03 — Todo evento deve possuir organizador responsável** | UC01 — Cadastrar Evento                               | Usuário, Evento                              | Tela de cadastro de evento       | **Sim**     |
| **RN04 — Impedir inscrição duplicada**                      | UC03 — Realizar Inscrição                             | Usuário, Evento, Inscrição                   | Tela de inscrição em evento      | **Sim**     |
| **RN05 — Encerrar inscrições na data limite**               | UC03 — Realizar Inscrição                             | Evento, Inscrição                            | 
Tela de inscrição em evento      | **Sim**     |


| **Requisito**                                               | **Caso de uso/história**  | **Entidades envolvidas** | **Tela prevista** | **No MVP?** |
| ----------------------------------------------------------- | ------------------------- | ------------------------ | ----------------- | ----------- |
| **RNF01 — Interface intuitiva e de fácil utilização**       | Todos os casos de uso     | —                        | Todas as telas    | **Sim**     |
| **RNF02 — Responder às solicitações em até 3 segundos**     | Todos os casos de uso     | —                        | Todas as telas    | **Não**     |
| **RNF03 — Garantir autenticação e segurança dos dados**     | UC11 — Realizar Login     | Usuário                  | Tela de login     | **Sim**     |
| **RNF04 — Disponibilidade durante o período de inscrições** | UC03 — Realizar Inscrição | Evento, Inscrição        | Tela de inscrição | **Sim**     |
| **RNF05 — Compatibilidade com navegadores e dispositivos**  | Todos os casos de uso     | —                        | Todas as telas    | **Sim**     |
