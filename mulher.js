const express = require('express')
const router = express.Router();


const app = express()

const porta = 3333

function mostraMulher(request, response){
  response.json({
    nome: 'Victoria Lucena',
    imagem: 'https://pbs.twimg.com/profile_images/1792390071041081344/X_lAu4Di_400x400.jpg',
    miniBio: 'Desenvolvedora front end e me aventurando em desenvolvimento back-end :)'
  })
}

function mostraPorta() {
  console.log(porta)
}

app.use(router.get('/mulher', mostraMulher));

app.listen(porta, mostraPorta)
