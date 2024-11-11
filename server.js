const express = require('express')
const path = require('path')
const port = process.env.PORT || 4000;

const { engine } = require('express-handlebars')
const bodyParser = require('body-parser')

//import BD
const connectDb = require('./db')
const bookRoutes = require('./controllers/book.controller')

//uso
const app = express()
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
// rotas
app.use('/books', bookRoutes)


//configure view engine
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', engine({
  extname: "hbs",//index.hbs
  layoutsDir: path.join(__dirname, 'views/layouts'),
  defaultLayout: 'mainLayout.hbs'
}))
app.set('view engine', '.hbs')

connectDb()
.then(data => {
    console.log(' >> banco de dados conectado com sucesso:\n')
    //app.listen(8000, () => {
      app.listen(port, () => {
        console.log('Servidor rodando na porta 8000:\n')
    }).on('error', err =>
        console.log('Erro ao ligar o servidor:\n', err))
})
.catch(err => console.log('Nao foi possivel conectar ao Banco de Dados:\n', err))
