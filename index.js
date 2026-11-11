import db from './repository/index.js'
import express from 'express'

const app = express()

app.use(express.json())

//POST

app.post("/api/v1/tarefa", (req, res) => {
    const {id, descricao, data, concluido} = req.body

    if(!id || !descricao || !data || concluido === undefined){
        res.send({ message: "É necessário enviar tudo."})
        return
    }

    db.push({id, descricao, data, concluido})
    res.send({message: "Tarefa cadastrada"})

})

// GET


app.get("/api/v1/tarefa/naoconc", (req, res) => {

    const tarefas = db.filter(p => p.concluido === false)

    res.send(tarefas)
})

app.get("/api/v1/tarefa/:id", (req, res) => {
    const id = req.params.id
    const tarefa = db.find(p => p.id == id)
    const descricao = tarefa.descricao
    const data = tarefa.data
    const concluido = tarefa.concluido

    if(!tarefa){
        res.status(404).send({ message: "Tarefa não encontrada"})
        return
    }

    res.send({descricao, data, concluido})
})

// PUT

app.put("/api/v1/tarefa/alterdata/:id", (req, res) => {
    const id = req.params.id
    const { data } = req.body
    const tarefa = db.find(p => p.id == id)

    if(!tarefa){
        res.status(404).send({ message: "Tarefa não encontrada"})
        return
    }

    tarefa.data = data
    res.send({ message: "Data alterada com sucesso"})
})

app.put("/api/v1/tarefa/alterdesc/:id", (req, res) => {
    const id = req.params.id
    const { descricao } = req.body
    const tarefa = db.find(p => p.id == id)

    if(!tarefa){
        res.status(404).send({ message: "Tarefa não encontrada"})
        return
    }

    tarefa.descricao = descricao
    res.send({ message: "Descrição alterada com sucesso"})
})

app.put("/api/v1/tarefa/concluir/:id", (req, res) => {
    const id = req.params.id
    const tarefa = db.find(p => p.id == id)

    if(!tarefa){
        res.status(404).send({ message: "Tarefa não encontrada"})
        return
    }

    tarefa.concluido = true
    res.send({ message: "Estado alterado com sucesso"})
})

// DELETE

app.delete("/api/v1/tarefa/:id", (req, res) => {
    const id = req.params.id
    const tarefaIndex = db.findIndex(p => p.id == id)

    if(tarefaIndex === -1){
        res.status(404).send({ message: "Tarefa não encontrada"})
        return
    }

    db.splice(tarefaIndex, 1)
    res.send({message: "Tarefa excluída com sucesso"})
})

// SERVIDOR

// legal, seu conceito sai junto com os demais -

app.listen(3000, ()=>{
    console.log("Servidor rodando: porta 3000")
})