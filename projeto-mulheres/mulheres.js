const express = require('express') // aqui estou iniciando o express
const router = express.Router() // aqui estou configurando a primeira parte da rota
const cors = require('cors') // chamando o pacote cors que permite instalar e consumir a api

const conectaBancoDeDados = require('./banco-de-dadosl') // estou ligando o arquivo banco de dados
conectaBancoDeDados() // chamando a função que conecta o banco de dados

const Mulher = require('./mulher-model')
const app = express() // aqui estou iniciando o app
app.use(express.json())
app.use(cors)
const porta = 3333 // aqui estou criando a porta

// get
async function mostraMulheres(request, response) {
  try {
    const mulheresBanco = await Mulher.find()
    response.json(mulheresBanco)
  } catch (erro) {
    console.log(erro)
  }
}

// post
async function criarMulher(request, response) {
  const novaMulher = new Mulher({
    nome: request.body.nome,
    imagem: request.body.imagem,
    minibio: request.body.minibio,
    citacao: request.body.citacao
  })

  try {
    const mulherCriada = await novaMulher.save()
    response.status(201).json(mulherCriada)
  } catch (erro) {
    console.log(erro)
  }
}

// path
async function corrigeMulher(request, response) {
  try {
    const mulherEncontrada = await Mulher.findById(request.params.id)

    if (request.body.nome) {
      mulherEncontrada.nome = request.body.nome
    }

    if (request.body.minibio) {
      mulherEncontrada.minibio = request.body.minibio
    }

    if (request.body.imagem) {
      mulherEncontrada.imagem = request.body.imagem
    }

    if (request.body.citacao) {
      mulherEncontrada.citacao = request.body.citacao
    }
    const mulherAtualizada = await mulherEncontrada.save()
    response.json(mulherAtualizada)
  } catch (erro) {
    console.log(erro)
  }
}

// delete
async function deletaMulher(request, response) {
  try {
    await Mulher.findByIdAndDelete(request.params.id)
    response.json({ mensagem: 'mulher deletada com sucesso!' })
  } catch (erro) {
    console.log(erro)
  }
}

// porta
function mostraPorta() {
  console.log(porta)
}

app.use(router.get('/mulheres', mostraMulheres)) // configurei rota get/ mulheres
app.use(router.post('/mulheres', criarMulher)) // criando post mulheres
app.use(router.patch('/mulheres/:id', corrigeMulher)) // configurei rota path
app.use(router.delete('/mulheres/:id', deletaMulher)) // criando a rota delete
app.listen(porta, mostraPorta) // servidor ouvindo a porta
