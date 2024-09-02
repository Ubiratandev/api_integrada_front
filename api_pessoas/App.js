import express from "express";
import pessoa_controler from "./Pessoas_controler.js"
import cors from 'cors';
const App=express();
App.use(express.json());

App.use(cors({
origin:'http://localhost:3001',
methods:['GET','POST','PUT','DELETE'],
allowedHeaders: ['Content-type','Authorization']

}));

App.use((req, res, next) => {
    console.log(`Recebido ${req.method} na rota ${req.path}`);
    next();
});

//ROTA POST
App.post('/pessoas',pessoa_controler.storeUsers);

//rota getall
App.get('/pessoasAll',pessoa_controler.showAllUsers)

//rota get com id
App.get('/pessoas/:id',pessoa_controler.showUser)

//rota get com termo especifico
App.get('/pessoas', pessoa_controler.showUserFind);

//ROTA DE PUT

App.put('/pessoas/:id',pessoa_controler.updateUser)


App.delete('/pessoas/:id',pessoa_controler.deleteUser)

export default App; 