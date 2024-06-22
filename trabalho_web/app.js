const express = require('express');
const app = express();
const ejs = require('ejs');
const Sequelize = require('sequelize');
const session = require('express-session');
const bcrypt = require('bcrypt');

// Importa os modelos e a conexão Sequelize do arquivo models/index.js
const db = require('./models');
const { User, Product } = db; 

// Testa a conexão
(async () => {
    try {
        await db.sequelize.authenticate();
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
    }
})();

// Sincroniza os modelos com o banco de dados
// (cria as tabelas se não existirem)
db.sequelize.sync();

// Configurações do express
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Configurações de sessão
app.use(session({
    secret: 'sua_chave_secreta',
    resave: false,
    saveUninitialized: false,
}));

// Importa controladores
const userController = require('./controllers/users');
const productController = require('./controllers/products');

// Define as rotas
app.get('/', userController.index);
app.get('/login', userController.login);
app.post('/login', userController.authenticate(User, bcrypt));
app.get('/register', userController.register);
app.post('/register', userController.createUser(User, bcrypt));
app.get('/user-profile', userController.userProfile);
app.get('/edit-profile', userController.editProfile);
app.post('/edit-profile', userController.updateProfile(User, bcrypt));
app.get('/logout', userController.logout);

app.get('/products', productController.listProducts(Product));
app.get('/add-product', productController.addProduct);
app.post('/add-product', productController.createProduct(Product));
app.get('/edit-product/:id', productController.editProduct(Product));
app.post('/edit-product/:id', productController.updateProduct(Product));
app.get('/delete-product/:id', productController.deleteProduct(Product));

// Inicia o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});