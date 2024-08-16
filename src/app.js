import express from "express";  


const app = express();

const lista =[
    {
        id: 1, 
        name: "Maçã",
        quantity: 1,
        type: "Fruta",
    },
    {
        id: 2, 
        name: "Frances",
        quantity: 2,
        type: "Paes",
    }
    ];

app.get("/lista", (req, res)=> {
    res.send(lista);
});

app.get("/lista/:id", (req, res)=>{
    const id = req.params.id;
    const item = lista.find(item=>{
        return item.id === Number(id);

    })
    res.send(item);
});

app.listen(5000,()=>{
    console.log("o servidor esta rodando na porta 5000");
});




