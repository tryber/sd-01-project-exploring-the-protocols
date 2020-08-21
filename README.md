
# Boas vindas ao projeto Explorando os protocolos

Você já usa o GitHub diariamente para desenvolver os exercícios, certo? Agora, para desenvolver os projetos, você deverá seguir as instruções a seguir. Fique atento a cada passo, e se tiver qualquer dúvida, nos envie por Slack! #vqv 🚀

Aqui você vai encontrar os detalhes de como estruturar o desenvolvimento do seu projeto a partir deste repositório, utilizando uma branch específica e um Pull Request para colocar seus códigos.

---

## O que deverá ser desenvolvido

Você irá refatorar parte de um servidor HTTP, porém, esse servidor não está utilizando o módulo HTTP e sim o módulo `net`, ou seja, só temos a camada de transporte implementada (TCP).

O objetivo da refatoração é implementar algumas partes da camada de apresentação HTTP sem utilizar bibliotecas ou módulos para isso.

Durante o projeto, iremos passar por todas as camadas da pilha de protocolos `TCP/IP`. Neste projeto, você **expandirá** o seu conhecimento de protocolos, explorando e aprendendo como lidar com as operações de rede!

O _servidor_ deverá responder uma página HTML através do HTTP, mostrando algumas informações sobre o _client_, como dados sobre a localização, o dispositivo e a empresa provedora de internet.

## Desenvolvimento

O servidor TCP responde com uma página HTML, porém, deverá ser adicionado a ele as informações de _control_ do protocolo HTTP que representam o início e o final da _response_.

Você terá que utilizar o módulo `net` para descobrir como é uma requisição e uma resposta HTTP de maneira "crua", ou seja, sem estar encapsulada pelo protocolo.

O código também realiza uma consulta à API pública [iplocation](https://iplocation.com/) onde, através de uma chamada HTTPS, passando um endereço de IP externo, é possível extrair algumas informações sobre o _client_.

Utilizaremos o _ngrok_ para criar um túnel para o nosso projeto, tornando possível acessá-lo através da internet e não somente local. Dessa forma conseguiremos acessá-lo de outros dispositivos e conseguiremos ter acesso ao endereço de IP externo do _client_ que fizer a requisição através da _request_ e, então, utilizaremos esse IP para extrair as informações pela API _iplocation_.

**E atenção!** Esse trabalho usa bastante o que vocês aprenderam nos exercícios da aula de [arquitetura de redes](https://course.betrybe.com/computer-science/network-architecture#exerc%C3%ADcios). Usem-nos de referência, assim como a [documentação do módulo NET do Node.js](https://nodejs.org/api/net.html#net_net_createserver_options_connectionlistener). E contem com nossa ajuda também no Slack! 👊 

> **Dica**: Se estiver com dificuldades para avançar no projeto, dê uma olhada [nesse artigo](https://www.mattzeunert.com/2018/10/25/manually-making-an-http-request-with-nodejs.html), pois ele faz algo bem parecido com o que estamos pedindo! 😉

## Requisitos do projeto

### 1 - Criar um servidor TCP utilizando o módulo net que exiba no console todo o conteúdo recebido

Faça um _script_ (`exploiters/serverExploiter.js`) para criar um servidor TCP que mostre no console todo o conteúdo recebido. Depois, podemos acessá-lo pelo navegador e descobrir como é o `data` de uma requisição HTTP.

> **Dica**: Não se preocupe em responder o navegador da maneira correta, só queremos descobrir a estrutura da _request_. Além disso, volte ao [conteúdo de Arquitetura de redes](https://course.betrybe.com/computer-science/network-architecture) para retomar alguns conceitos importantes! Além do conteúdo escrito você também pode consultar o [gabarito dos exercícios](https://course.betrybe.com/computer-science/network-architecture/solutions).

### 2 - Criar um script utilizando o módulo net capaz de realizar um chamada HTTP a um server

Crie um novo script (`exploiters/clientExploiter.js`), que utilize a _request_ extraída no [requisito anterior (1)](#-1---Criar-um-servidor-TCP-utilizando-o-módulo-net-que-exiba-no-console-todo-o-conteúdo-recebido), realizando as devidas modificações para fazer uma request HTTP à página do Google (`google.com`) e, então, exiba no console a resposta "crua" dada pelo servidor da Google. **Ou seja: crie uma requisição HTTP "na mão" usando de base a requisição capturada no requisito anterior! Você pode utilizar, pra fazer essa requisição "na mão", o `client.write` do NET**

Agora descobrimos como é uma response HTTP sem encapsulá-la.

> **Dica**: Na request existem características que indicam ao HTTP onde a request finaliza, então, tenha certeza que pegou todo o conteúdo, inclusive quebras de linhas. Para representar as quebras de linhas você pode utilizar `\r\n` ou "template strings"

### 3 - Criar um server TCP utilizando o módulo net capaz de responder com uma mensagem HTTP

Utilizando a _response_ capturada no [requisito anterior (2)](#-2---Criar-um-script-utilizando-o-módulo-net-capaz-de-realizar-um-chamada-HTTP-a-um-server), faça um _server_ (`exploiters/httpServer.js`) que responda uma página HTML, faça as devidas modificações na response para que retorne uma mensagem com o **status code HTTP 200**.

### 4 - Configurar uma chamada HTTPS à API `iplocation`

No projeto temos o arquivo `location.js`, responsável por fazer a _request_ HTTPS à API `iplocation`. Altere o objeto `options` desse arquivo para a seguinte configuração:

- hostname: "iplocation.com";

- port: Preencha com a porta padrão HTTPS;

- path: '/';

- method: POST;

- headers: Adicione o header "Content-Type", com o valor "application/x-www-form-urlencoded".

### 5 - Configurar a request HTTPS para enviar o endereço IP

Ainda no arquivo `location`, **antes de finalizar a request**, adicione uma linha que envie o ip do cliente, utilizando o método `write` da requisição. A _API_ espera receber a seguinte mensagem texto: "ip=CLIENT_IP".

> **Dica**: A API espera receber um body sem nenhuma formatação. Envie a string conforme exemplo, substituindo o CLIENT_IP pela variável recebida no método.

### 6 - Adicionar a estrutura de início de requisição HTTP

No arquivo `index.js` do projeto, altere a variável `startOfResponse` para receber a estrutura que descobrimos anteriormente, da mesma forma que fizemos no [requisito 3](#-3---Criar-um-server-TCP-utilizando-o-módulo-net-capaz-de-responder-com-uma-mensagem-HTTP). Faça as devidas alterações para que a resposta tenha os seguintes valores:

- Versão 1.1 do protocolo HTTP;

- Status code `HTTP 200`;

- Header "Content-Type" como "text/html; charset=UTF-8".

> **Dica**: Mais uma vez, não esqueça das quebras de linhas 😉. Não é necessário nenhum outro header além do "Content-Type".

### 7 - Adicionar a estrutura de fim da requisição HTTP

Ainda no arquivo `index.js`, altere a variável `endOfResponse` para receber a estrutura utilizada pelo HTTP para informar o fim de uma request.

### 8 - Identificar o endereço de IP do client

Utilizando a função `getHeaderValue`, extraia do data o header `X-Forwarded-For`. Esse header será adicionado pelo nosso proxy, contendo o endereço de IP do _client_. Passe esse IP para a função `getLocationInfos`, para que possamos extrair dados através dele.

> **Dica**: Converta o data para String antes de extrair os headers.

### 9 - Responder o IP do client

Adicione mais um comando `write`, na estrutura do response, para responder com o endereço de IP do _client_ extraído no [requisito 8](#-8---Identificar-o-endereço-de-IP-do-client).

### 10 - Responder informações extraídas através do IP do client

Adicione mais comandos `write`, na estrutura do response. A resposta da API `iplocation` deverá conter as seguintes informações:

- Cidade;

- Código Postal (da cidade);

- Região e nome da região;

- Nome do país;

- Companhia (nome da provedora de internet);

### 11 - Criar um túnel através do Ngrok.

Crie um túnel para seu `localhost`, utilizando o `Ngrok`. Em seguida, acesse-o de diferentes dispositivos de rede para testar o funcionamento do nosso projeto.

Adicione no arquivo `instructions.md` o passo-a-passo com os comandos `ngrok` e `Node.js` para executar e realizar a publicação do projeto.

> **Dica**: Consulte o `getting stated` na [documentação do ngrok](https://ngrok.com/docs).

## Bônus

### 12 - Responder dados do dispositivo (client)

Utilizando também a função para extrair informações dos _headers_ da _request_, extraia o conteúdo do _header_ `User-Agent` e adicione o na estrutura da response.

> **Dica**: Converta o data para String antes de extrair os headers.

### 13 - Criar um endpoint `/server`

Identifique, através da mensagem da requisição, se o endpoint enviado corresponde a `/server` e o método é `GET`.

### 14 - Responder a request com os resources do Server

Ao identificar a correspondência do [requisito anterior (13)](#-13---Criar-um-endpoint-/server), utilizando os módulos nativos do `node.js` para chamadas ao sistema operacional, responda, ao invés dos dados do _client_, dados do server:

- O Sistema Operacional, sua versão e arquitetura;

- Informações sobre a CPU - quantidade de cores, o modelo e velocidade de cada um;

- Quantidade de memória total em gigabytes (GB).

---

## Instruções para entregar seu projeto:

### ANTES DE COMEÇAR A DESENVOLVER:

1. Clone o repositório

- `git clone [endereço SSH do repositório]`.
- Entre na pasta do repositório que você acabou de clonar:
  - `cd pasta-do-repositorio`

2. Instale as dependências

- `npm install`

3. Crie uma branch a partir da branch `master`

- Verifique que você está na branch `master`
  - Exemplo: `git branch`
- Se não estiver, mude para a branch `master`
  - Exemplo: `git checkout master`
- Agora crie uma branch à qual você vai submeter os `commits` do seu projeto
  - Você deve criar uma branch no seguinte formato: `nome-de-usuario-nome-do-projeto`
  - Exemplo: `git checkout -b joaozinho-explorando-os-protocolos`

4. Adicione as mudanças ao _stage_ do Git e faça um `commit`

- Verifique que as mudanças ainda não estão no _stage_
  - Exemplo: `git status` (deve aparecer listado o arquivo _index.js_ em vermelho)
- Adicione o arquivo alterado ao _stage_ do Git
  - Exemplo:
    - `git add .` (adicionando todas as mudanças - _que estavam em vermelho_ - ao stage do Git)
    - `git status` (deve aparecer listado o arquivo _index.js_ em verde)
- Faça o `commit` inicial
  - Exemplo:
    - `git commit -m 'iniciando o projeto Explorando os Protocolos'` (fazendo o primeiro commit)
    - `git status` (deve aparecer uma mensagem tipo _nothing to commit_ )

5. Adicione a sua branch com o novo `commit` ao repositório remoto

- Usando o exemplo anterior: `git push -u origin joaozinho-explorando-os-protocolos`

6. Crie um novo `Pull Request` _(PR)_

- Vá até a página de _Pull Requests_ do repositório no GitHub
- Clique no botão verde _"New pull request"_
- Clique na caixa de seleção _"Compare"_ e escolha a sua branch **com atenção**
- Clique no botão verde _"Create pull request"_
- Adicione uma descrição para o _Pull Request_ e clique no botão verde _"Create pull request"_
- **Não se preocupe em preencher mais nada por enquanto!**
- Volte até a página de _Pull Requests_ do repositório e confira que o seu _Pull Request_ está criado

---

### DURANTE O DESENVOLVIMENTO

- Faça `commits` das alterações que você fizer no código regularmente

- Lembre-se de sempre após um (ou alguns) `commits` atualizar o repositório remoto

- Os comandos que você utilizará com mais frequência são:
  1. `git status` _(para verificar o que está em vermelho - fora do stage - e o que está em verde - no stage)_
  2. `git add` _(para adicionar arquivos ao stage do Git)_
  3. `git commit` _(para criar um commit com os arquivos que estão no stage do Git)_
  4. `git push -u nome-da-branch` _(para enviar o commit para o repositório remoto na primeira vez que fizer o `push` de uma nova branch)_
  5. `git push` _(para enviar o commit para o repositório remoto após o passo anterior)_

---

### DEPOIS DE TERMINAR O DESENVOLVIMENTO

Para **"entregar"** seu projeto, siga os passos a seguir:

- Vá até a página **DO SEU** _Pull Request_, adicione a label de _"code-review"_ e marque seus colegas
  - No menu à direita, clique no _link_ **"Labels"** e escolha a _label_ **code-review**
  - No menu à direita, clique no _link_ **"Assignees"** e escolha **o seu usuário**
  - No menu à direita, clique no _link_ **"Reviewers"** e digite `students`, selecione o time `tryber/students-sd-xx`

Se ainda houver alguma dúvida sobre como entregar seu projeto, [aqui tem um video explicativo](https://vimeo.com/362189205).

---

### REVISANDO UM PULL REQUEST

⚠⚠⚠

À medida que você e os outros alunos forem entregando os projetos, vocês serão alertados **via Slack** para também fazer a revisão dos _Pull Requests_ dos seus colegas. Fiquem atentos às mensagens do _"Pull Reminders"_ no _Slack_!

Use o material que você já viu sobre [Code Review](https://course.betrybe.com/real-life-engineer/code-review/) para te ajudar a revisar os projetos que chegaram para você.
=======
# Boas vindas ao projeto Explorando os protocolos

Você já usa o GitHub diariamente para desenvolver os exercícios, certo? Agora, para desenvolver os projetos, você deverá seguir as instruções a seguir. Fique atento a cada passo, e se tiver qualquer dúvida, nos envie por Slack! #vqv 🚀

Aqui você vai encontrar os detalhes de como estruturar o desenvolvimento do seu projeto a partir deste repositório, utilizando uma branch específica e um Pull Request para colocar seus códigos.

---

## O que deverá ser desenvolvido

Você irá refatorar parte de um servidor HTTP, porém, esse servidor não está utilizando o módulo HTTP e sim o módulo `net`, ou seja, só temos a camada de transporte implementada (TCP).

O objetivo da refatoração é implementar algumas partes da camada de apresentação HTTP sem utilizar bibliotecas ou módulos para isso.

Durante o projeto, iremos passar por todas as camadas da pilha de protocolos `TCP/IP`. Neste projeto, você **expandirá** o seu conhecimento de protocolos, explorando e aprendendo como lidar com as operações de rede!

O _servidor_ deverá responder uma página HTML através do HTTP, mostrando algumas informações sobre o _client_, como dados sobre a localização, o dispositivo e a empresa provedora de internet.

## Desenvolvimento

O servidor TCP responde com uma página HTML, porém, deverá ser adicionado a ele as informações de _control_ do protocolo HTTP que representam o início e o final da _response_.

Você terá que utilizar o módulo `net` para descobrir como é uma requisição e uma resposta HTTP de maneira "crua", ou seja, sem estar encapsulada pelo protocolo.

O código também realiza uma consulta à API pública [iplocation](https://iplocation.com/) onde, através de uma chamada HTTPS, passando um endereço de IP externo, é possível extrair algumas informações sobre o _client_.

Utilizaremos o _ngrok_ para criar um túnel para o nosso projeto, tornando possível acessá-lo através da internet e não somente local. Dessa forma conseguiremos acessá-lo de outros dispositivos e conseguiremos ter acesso ao endereço de IP externo do _client_ que fizer a requisição através da _request_ e, então, utilizaremos esse IP para extrair as informações pela API _iplocation_.

**E atenção!** Esse trabalho usa bastante o que vocês aprenderam nos exercícios da aula de [arquitetura de redes](https://course.betrybe.com/computer-science/network-architecture#exerc%C3%ADcios). Usem-nos de referência, assim como a [documentação do módulo NET do Node.js](https://nodejs.org/api/net.html#net_net_createserver_options_connectionlistener). E contem com nossa ajuda também no Slack! 👊 

> **Dica**: Se estiver com dificuldades para avançar no projeto, dê uma olhada [nesse artigo](https://www.mattzeunert.com/2018/10/25/manually-making-an-http-request-with-nodejs.html), pois ele faz algo bem parecido com o que estamos pedindo! 😉

## Requisitos do projeto

### 1 - Criar um servidor TCP utilizando o módulo net que exiba no console todo o conteúdo recebido

Faça um _script_ (`exploiters/serverExploiter.js`) para criar um servidor TCP que mostre no console todo o conteúdo recebido. Depois, podemos acessá-lo pelo navegador e descobrir como é o `data` de uma requisição HTTP.

> **Dica**: Não se preocupe em responder o navegador da maneira correta, só queremos descobrir a estrutura da _request_. Além disso, volte ao [conteúdo de Arquitetura de redes](https://course.betrybe.com/computer-science/network-architecture) para retomar alguns conceitos importantes! Além do conteúdo escrito você também pode consultar o [gabarito dos exercícios](https://course.betrybe.com/computer-science/network-architecture/solutions).

### 2 - Criar um script utilizando o módulo net capaz de realizar um chamada HTTP a um server

Crie um novo script (`exploiters/clientExploiter.js`), que utilize a _request_ extraída no [requisito anterior (1)](#-1---Criar-um-servidor-TCP-utilizando-o-módulo-net-que-exiba-no-console-todo-o-conteúdo-recebido), realizando as devidas modificações para fazer uma request HTTP à página do Google (`google.com`) e, então, exiba no console a resposta "crua" dada pelo servidor da Google. **Ou seja, crie uma requisição HTTP “na mão” usando como base a resposta de saída da requisição do requisito 1. Você irá copiar o response do requisito anterior para montar sua requisição neste requisito. Você pode utilizar, pra fazer essa requisição “na mão”, o client.write do NET.**

Agora descobrimos como é uma response HTTP sem encapsulá-la.

> **Dica**: Na request existem características que indicam ao HTTP onde a request finaliza, então, tenha certeza que pegou todo o conteúdo, inclusive quebras de linhas. Para representar as quebras de linhas você pode utilizar `\r\n` ou "template strings"

### 3 - Criar um server TCP utilizando o módulo net capaz de responder com uma mensagem HTTP

Utilizando a _response_ capturada no [requisito anterior (2)](#-2---Criar-um-script-utilizando-o-módulo-net-capaz-de-realizar-um-chamada-HTTP-a-um-server), faça um _server_ (`exploiters/httpServer.js`) que responda uma página HTML, faça as devidas modificações na response para que retorne uma mensagem com o **status code HTTP 200**.

### 4 - Configurar uma chamada HTTPS à API `iplocation`

No projeto temos o arquivo `location.js`, responsável por fazer a _request_ HTTPS à API `iplocation`. Altere o objeto `options` desse arquivo para a seguinte configuração:

- hostname: "iplocation.com";

- port: Preencha com a porta padrão HTTPS;

- path: '/';

- method: POST;

- headers: Adicione o header "Content-Type", com o valor "application/x-www-form-urlencoded".

### 5 - Configurar a request HTTPS para enviar o endereço IP

Ainda no arquivo `location`, **antes de finalizar a request**, adicione uma linha que envie o ip do cliente, utilizando o método `write` da requisição. A _API_ espera receber a seguinte mensagem texto: "ip=CLIENT_IP".

> **Dica**: A API espera receber um body sem nenhuma formatação. Envie a string conforme exemplo, substituindo o CLIENT_IP pela variável recebida no método.

### 6 - Adicionar a estrutura de início de requisição HTTP

No arquivo `index.js` do projeto, altere a variável `startOfResponse` para receber a estrutura que descobrimos anteriormente, da mesma forma que fizemos no [requisito 3](#-3---Criar-um-server-TCP-utilizando-o-módulo-net-capaz-de-responder-com-uma-mensagem-HTTP). Faça as devidas alterações para que a resposta tenha os seguintes valores:

- Versão 1.1 do protocolo HTTP;

- Status code `HTTP 200`;

- Header "Content-Type" como "text/html; charset=UTF-8".

> **Dica**: Mais uma vez, não esqueça das quebras de linhas 😉. Não é necessário nenhum outro header além do "Content-Type".

### 7 - Adicionar a estrutura de fim da requisição HTTP

Ainda no arquivo `index.js`, altere a variável `endOfResponse` para receber a estrutura utilizada pelo HTTP para informar o fim de uma request.

### 8 - Identificar o endereço de IP do client

Utilizando a função `getHeaderValue`, extraia do data o header `X-Forwarded-For`. Esse header será adicionado pelo nosso proxy, contendo o endereço de IP do _client_. Passe esse IP para a função `getLocationInfos`, para que possamos extrair dados através dele.

> **Dica**: Converta o data para String antes de extrair os headers.

### 9 - Responder o IP do client

Adicione mais um comando `write`, na estrutura do response, para responder com o endereço de IP do _client_ extraído no [requisito 8](#-8---Identificar-o-endereço-de-IP-do-client).

### 10 - Responder informações extraídas através do IP do client

Adicione mais comandos `write`, na estrutura do response. A resposta da API `iplocation` deverá conter as seguintes informações:

- Cidade;

- Código Postal (da cidade);

- Região e nome da região;

- Nome do país;

- Companhia (nome da provedora de internet);

### 11 - Criar um túnel através do Ngrok.

Crie um túnel para seu `localhost`, utilizando o `Ngrok`. Em seguida, acesse-o de diferentes dispositivos de rede para testar o funcionamento do nosso projeto.

Adicione no arquivo `instructions.md` o passo-a-passo com os comandos `ngrok` e `Node.js` para executar e realizar a publicação do projeto.

> **Dica**: Consulte o `getting stated` na [documentação do ngrok](https://ngrok.com/docs).

## Bônus

### 12 - Responder dados do dispositivo (client)

Utilizando também a função para extrair informações dos _headers_ da _request_, extraia o conteúdo do _header_ `User-Agent` e adicione o na estrutura da response.

> **Dica**: Converta o data para String antes de extrair os headers.

### 13 - Criar um endpoint `/server`

Identifique, através da mensagem da requisição, se o endpoint enviado corresponde a `/server` e o método é `GET`.

### 14 - Responder a request com os resources do Server

Ao identificar a correspondência do [requisito anterior (13)](#-13---Criar-um-endpoint-/server), utilizando os módulos nativos do `node.js` para chamadas ao sistema operacional, responda, ao invés dos dados do _client_, dados do server:

- O Sistema Operacional, sua versão e arquitetura;

- Informações sobre a CPU - quantidade de cores, o modelo e velocidade de cada um;

- Quantidade de memória total em gigabytes (GB).

---

## Instruções para entregar seu projeto:

### ANTES DE COMEÇAR A DESENVOLVER:

1. Clone o repositório

- `git clone [endereço SSH do repositório]`.
- Entre na pasta do repositório que você acabou de clonar:
  - `cd pasta-do-repositorio`

2. Instale as dependências

- `npm install`

3. Crie uma branch a partir da branch `master`

- Verifique que você está na branch `master`
  - Exemplo: `git branch`
- Se não estiver, mude para a branch `master`
  - Exemplo: `git checkout master`
- Agora crie uma branch à qual você vai submeter os `commits` do seu projeto
  - Você deve criar uma branch no seguinte formato: `nome-de-usuario-nome-do-projeto`
  - Exemplo: `git checkout -b joaozinho-explorando-os-protocolos`

4. Adicione as mudanças ao _stage_ do Git e faça um `commit`

- Verifique que as mudanças ainda não estão no _stage_
  - Exemplo: `git status` (deve aparecer listado o arquivo _index.js_ em vermelho)
- Adicione o arquivo alterado ao _stage_ do Git
  - Exemplo:
    - `git add .` (adicionando todas as mudanças - _que estavam em vermelho_ - ao stage do Git)
    - `git status` (deve aparecer listado o arquivo _index.js_ em verde)
- Faça o `commit` inicial
  - Exemplo:
    - `git commit -m 'iniciando o projeto Explorando os Protocolos'` (fazendo o primeiro commit)
    - `git status` (deve aparecer uma mensagem tipo _nothing to commit_ )

5. Adicione a sua branch com o novo `commit` ao repositório remoto

- Usando o exemplo anterior: `git push -u origin joaozinho-explorando-os-protocolos`

6. Crie um novo `Pull Request` _(PR)_

- Vá até a página de _Pull Requests_ do repositório no GitHub
- Clique no botão verde _"New pull request"_
- Clique na caixa de seleção _"Compare"_ e escolha a sua branch **com atenção**
- Clique no botão verde _"Create pull request"_
- Adicione uma descrição para o _Pull Request_ e clique no botão verde _"Create pull request"_
- **Não se preocupe em preencher mais nada por enquanto!**
- Volte até a página de _Pull Requests_ do repositório e confira que o seu _Pull Request_ está criado

---

### DURANTE O DESENVOLVIMENTO

- Faça `commits` das alterações que você fizer no código regularmente

- Lembre-se de sempre após um (ou alguns) `commits` atualizar o repositório remoto

- Os comandos que você utilizará com mais frequência são:
  1. `git status` _(para verificar o que está em vermelho - fora do stage - e o que está em verde - no stage)_
  2. `git add` _(para adicionar arquivos ao stage do Git)_
  3. `git commit` _(para criar um commit com os arquivos que estão no stage do Git)_
  4. `git push -u nome-da-branch` _(para enviar o commit para o repositório remoto na primeira vez que fizer o `push` de uma nova branch)_
  5. `git push` _(para enviar o commit para o repositório remoto após o passo anterior)_

---

### DEPOIS DE TERMINAR O DESENVOLVIMENTO

Para **"entregar"** seu projeto, siga os passos a seguir:

- Vá até a página **DO SEU** _Pull Request_, adicione a label de _"code-review"_ e marque seus colegas
  - No menu à direita, clique no _link_ **"Labels"** e escolha a _label_ **code-review**
  - No menu à direita, clique no _link_ **"Assignees"** e escolha **o seu usuário**
  - No menu à direita, clique no _link_ **"Reviewers"** e digite `students`, selecione o time `tryber/students-sd-xx`

Se ainda houver alguma dúvida sobre como entregar seu projeto, [aqui tem um video explicativo](https://vimeo.com/362189205).

---

### REVISANDO UM PULL REQUEST

⚠⚠⚠

À medida que você e os outros alunos forem entregando os projetos, vocês serão alertados **via Slack** para também fazer a revisão dos _Pull Requests_ dos seus colegas. Fiquem atentos às mensagens do _"Pull Reminders"_ no _Slack_!

Use o material que você já viu sobre [Code Review](https://course.betrybe.com/real-life-engineer/code-review/) para te ajudar a revisar os projetos que chegaram para você.

