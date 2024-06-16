const mongoose = require('mongoose')
require('dotenv').config()

async function conectaBancoDeDados() {

 try{
  console.log('conexao com o banco de dados inciou')

  await mongoose.connect(process.env.MONGO_URL)
  console.log('conexao c o banco feita com sucesso');
 } catch(error){
  console.log(error)
 }
}

module.exports = conectaBancoDeDados;
