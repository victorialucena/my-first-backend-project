const express = require('express'); // Iniciando o express
const cors = require('cors'); // Chamando o pacote cors que permite instalar e consumir a API

const conectaBancoDeDados = require('./banco-de-dados'); // Ligando o arquivo banco de dados
conectaBancoDeDados(); // Chamando a função que conecta o banco de dados

const Mulher = require('./mulher-model');
const app = express(); // Iniciando o app
const router = express.Router(); // Configurando a primeira parte da rota

app.use(express.json());
app.use(cors()); // Chamando o middleware cors

const porta = process.env.PORT || 3333; // Usando a variável de ambiente PORT

// Get
async function mostraMulheres(request, response) {
  try {
    const mulheresBanco = await Mulher.find();
    response.json(mulheresBanco);
  } catch (erro) {
    console.log(erro);
    response.status(500).json({ message: "Erro ao buscar mulheres" });
  }
}

// Post
async function criarMulher(request, response) {
  const novaMulher = new Mulher({
    nome: request.body.nome,
    imagem: request.body.imagem,
    minibio: request.body.minibio,
    citacao: request.body.citacao,
  });

  try {
    const mulherCriada = await novaMulher.save();
    response.status(201).json(mulherCriada);
  } catch (erro) {
    console.log(erro);
    response.status(500).json({ message: "Erro ao criar mulher" });
  }
}

// Patch
async function corrigeMulher(request, response) {
  try {
    const mulherEncontrada = await Mulher.findById(request.params.id);

    if (request.body.nome) {
      mulherEncontrada.nome = request.body.nome;
    }

    if (request.body.minibio) {
      mulherEncontrada.minibio = request.body.minibio;
    }

    if (request.body.imagem) {
      mulherEncontrada.imagem = request.body.imagem;
    }

    if (request.body.citacao) {
      mulherEncontrada.citacao = request.body.citacao;
    }

    const mulherAtualizada = await mulherEncontrada.save();
    response.json(mulherAtualizada);
  } catch (erro) {
    console.log(erro);
    response.status(500).json({ message: "Erro ao atualizar mulher" });
  }
}

// Delete
async function deletaMulher(request, response) {
  try {
    await Mulher.findByIdAndDelete(request.params.id);
    response.json({ mensagem: 'Mulher deletada com sucesso!' });
  } catch (erro) {
    console.log(erro);
    response.status(500).json({ message: "Erro ao deletar mulher" });
  }
}

// Porta
function mostraPorta() {
  console.log(`Servidor rodando na porta ${porta}`);
}

// Configuração das rotas
router.get('/mulheres', mostraMulheres);
router.post('/mulheres', criarMulher);
router.patch('/mulheres/:id', corrigeMulher);
router.delete('/mulheres/:id', deletaMulher);

app.use(router);
app.listen(porta, mostraPorta); // Servidor ouvindo a porta
