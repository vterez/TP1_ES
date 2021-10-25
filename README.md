# TP1_ES

Neste projeto, desenvolvemos um sistema de gerenciamento de avaliações para estudantes. 

## Funcionalidades

Nele, há duas utilidades principais, detalhadas a seguir.

### Gerenciamento de disciplinas

É possível cadastrar as disciplinas que estão sendo cursadas, bem como diversas informações específicas de cada uma, como:

* Dados gerais, como horário, nome e contatos do docente, local e horário de aula.
* Atividades que serão desenvolvidas ao longo do curso, juntamente com materiais didáticos referentes a cada avaliação.
* Histórico de notas na disciplina, que é ligado ao item anterior para manter o registro de resultados obtidos sempre atualizado.

### Calendário de próximas atividades

Uma agenda que mostra as atividades que estão por vir e que emite lembretes que podem ser configurados pelo usuário.

## Tecnologias utilizadas

* Back-end: desenvolvido na linguagem Python, utilizando o framework Django.
* Banco de dados: utilizamos o banco SQLite, que é bem integrado ao Django.
* Front-end: desenvolvido utilizando o framework Angular.

## Execução

### Preparação do ambiente

O projeto foi desenvolvido para uso exclusivo no computador (desktop) e é necessário que o dispositivo possua as seguintes ferramentas instaladas:
* Interpretador Python (versão 3.0 ou superior)
* Biblioteca Django para Python (versão 2.6 ou superior)
* Ambiente Node JS (versão 17 ou superior)
* Framework Angular (versão 9 ou superior)

Munido dessas ferramentas, para utilizar o programa, siga os seguintes passos:
* Clone o repositório.
* Entre no diretório 'back-end', abra o console nessa pasta e execute o comando **_PYTHON_ manage.py runserver**, onde _PYTHON_ é o nome do comando de invocação do interpretador Python no dispositivo. Minimize esse console.
* Entre no diretório 'front-end', abra o console nessa pasta e execute o comando **ng serve --open**. Minimize esse console.
* O comando anterior deve abrir uma janela do navegador padrão do dispositivo. Caso ele não abra automaticamente, abra-o e acesse o site **localhost:4200**. 
* Utilize o programa conforme as instruções do próximo tópico.
* Para finalizar o programa, abra os dois terminais minimizados e pressione CTRL+C. Caso o terminal pergunte se você deseja finalizar o programa, informe que sim.

### Utilização

Ao terminar de seguir os passos de inicialização, você será enviado à tela inicial do programa, onde é possível cadastrar uma conta ou fazer login no ambiente. Feito o login, basta clicar nos menus que aparecem na tela para navegar pelas disciplinas ou pelo calendário e começar a organizar sua vida acadêmica.

Quando o programa é encerrado, todos os cadastros feitos são mantidos no banco de dados. Caso deseje zerar o banco, acesse o diretório 'back-end' e exclua o arquivo **db.sqlite3**.
