Ngrok:

1- Acesse o site https://dashboard.ngrok.com/get-started/setup crie sua conta e baixe o ngrok. Não feche nesse link, pois iremos utilizar novamente no requisito 4.
2- Copie e cole o arquivo baixado na raiz do projeto.
3- Utilize o comando unzip /path/to/ngrok.zip para extrair o Ngrok. Pode apagar o ngrok zipado.
4- Acesse o link do requisito 1 e cole na raiz do projeto o comando na seção "2. Connect your account".
5- Rode esse comando na raiz do projeto: npm i ngrok.
6 Acesse o package.json e coloque o comando a seguir dentro do objeto scripts: "start": "ngrok http https://localhost:8080/".

Nodejs:
1- Rode o comando 'node src/' dentro da raiz do projeto.
