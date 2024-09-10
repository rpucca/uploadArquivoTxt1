//parte 01 https://www.youtube.com/watch?v=-tAf3q1mKvk&ab_channel=Celke
//parte 02 https://www.youtube.com/watch?v=iTdB0VKuwTc&ab_channel=Celke
 
//chamar biblioteca express
const express = require('express');
//chamar biblioteca cvs
const csv = require('csv');
//chamar biblioteca file system
const fs = require('fs');
// Incluir a conexão com banco de dados
const db = require('./db/models');

//const { delimiter } = require('path');

//estanciar express
const app = express();

//criar rota 
app.get("/", (req, res) => {
    const arquivoCSV = "arquivo.csv";
    fs.createReadStream(arquivoCSV)

        // pipe - conectar fluxos de leitura e escrita, sem armazenar os dados intermediários em memória
        // columns: true - Primeira linha do arquivo CSV seja tratada como cabeçalho, o nome do cabeçalho corresponde o nome da coluna no banco de dados
        // Delimitador é ; (ponto e vírgula)
        .pipe(csv.parse({columns:true,delimiter: ';'}))
        
        //ler linhas do arquivo
        .on('data', async(dadosLinha) => {
            console.log(dadosLinha);

            // Recuperar o registro do banco de dados
            // Indicar quais colunas recuperar
            // Acrescentado condição para indicar qual registro deve ser retornado do banco de dados    
            const user = await db.Users.findOne({
                attributes: ['id'], where: { cpf: dadosLinha.cpf }
            });

            // Acessa o IF quando o usuário não está cadastrado no banco de dados
            if (!user) {
                // Cadastrar o usuário no banco de dados
                await db.Users.create(dadosLinha);
            }

        });

    return res.send("Importação concluída.");
});

//iniciar servidor 
app.listen(8080, () => {
    console.log("servidor iniciado na porta 8080, http://localhost/8080"); 
});