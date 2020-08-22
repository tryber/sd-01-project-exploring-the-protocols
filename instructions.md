1 - Fazer Download do arquivo ngrok através do site https://dashboard.ngrok.com/get-started/setup;
2 - Pegar o arquivo baixado e extrair o ngrok de dentro do mesmo;
3 - Colocar o arquivo na raíz do projeto;
4 - Fazer a conexão da conta através do comando ./ngrok authtoken 1gQSteKwhDXOZjdNGUtHHtIPj7j_6YYp1Vbhgi1PfT8R2dWC6 , esperar a confirmação de autenticação;
5 - Baixar arquivo ngrok com npm install ngrok;
6 - Colocar no package.json dentro do script a configuração "start": "ngrok http https://localhost:8080/";
7 - Rodar o comando npm start;
