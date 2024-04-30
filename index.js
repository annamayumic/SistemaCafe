const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require("./database/database.js");
const Produtos = require('./database/Produtos.js')
const Clientes = require('./database/Clientes.js')

connection.authenticate()
.then(()=>{
  console.log("conexao feita com banco de dados")
})
.catch((erro)=>{
  console.log(erro)
});

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/', (req,res)=>{
  res.render('index')
})
app.get('/admin/produtos', (req,res)=>{
  Produtos.findAll().then(produtos=>{
    res.render('admin/produtos',{produtos:produtos})
})
  })
  

app.get('/admin/construtor', (req, res)=>{
  res.render('admin/construtor.ejs')
})
app.post('/novoProd', (req,res)=>{
  let titulo = req.body.titulo;
  let preco = req.body.preco;
  let imagem = req.body.imagem;
  let status = req.body.status;
  Produtos.create({
    titulo : titulo,
    preco: preco,
    imagem:imagem,
    status:status
  }).then(()=>{
    res.redirect('/admin/produtos')
  }).catch((err)=>{console.log(err)})
})

app.get('/admin/index', (req, res)=>{
  res.render('admin/index.ejs')
})

app.get('/clientes/clientes', (req, res)=>{
  Clientes.findAll().then((clientes)=>{
     res.render('clientes/login', {clientes:clientes})
  })
 
})

app.post('/novaMesa', (req,res)=>{
  let numero = req.body.numero
  Clientes.create({
    numero:numero
  }).then(()=>{
    res.redirect('clientes/clientes')
  })
  
})

app.get('/clientes/clientes/:numero', (req,res)=>{
  var numero = req.params.numero;

  Clientes.findOne({
    where:{
      numero:numero
    }
  }).then(clientes =>{
    if(clientes != undefined){
      Produtos.findAll({where:{status:'1'}}).then( produtos =>{
        res.render('clientes/clientes.ejs', {produtos:produtos})
      })
    }
  }).catch(err=>{
    res.redirect('/clientes/clientes')
  })
})

app.get('/cozinha/cozinha', (req, res)=>{
  res.render('cozinha/cozinha.ejs')
})



app.listen(5000, ()=>{console.log("app rodando")
});
