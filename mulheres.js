const express = require('express')
const router = express.Router();


const app = express()

const porta = 3333

const mulheres = [
 {
  nome:'vic',
  imagem: 'imagem1',
  miniBio: 'front end'
 },
 {
  nome:'vic2',
  imagem: 'imagem2',
  miniBio: 'front end'
 },
 {
  nome:'vic3',
  imagem: 'imagem3',
  miniBio: 'front end'
 }
]

function mostraMulheres(request, response){
   response.json(mulheres);
}

function mostraPorta() {
  console.log(porta)
}

app.use(router.get('/mulheres', mostraMulheres));

app.listen(porta, mostraPorta)
