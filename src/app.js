import express,{json} from "express";  


const app = express();
app.use(json());

const items =[
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

app.get("/items", (req, res)=> {

    const item = req.query;
    
    if(item.type){
        const typeList = items.filter(itemList =>{
            return itemList.type.includes(item.type);
        });

        return res.send(typeList);
    }

    res.send(items);
});

app.get("/items/:id", (req, res)=>{
    const id = req.params.id;

    

    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
        return res.status(400).send("Bad Request");
    }   

    const item = items.find(item=>{
        return item.id === Number(id);
    });

    if(!item){
        return res.status(404).send("Not Found");
    } 
    res.send(item);
});

app.listen(5000,()=>{
    console.log("o servidor esta rodando na porta 5000");
});

app.post("/items", (req, res)=>{
    const listItem = req.body;
    const repeatedName = items.find((item) => item.name === listItem.name);
    if(repeatedName){
        return res.status(409).send("Conflict");
    }
    if(!listItem.name || !listItem.quantity || !listItem.type){
        return res.status(422).send("Unprocessable Entity");
    }

    items.push({
        id: items.length + 1,
        ...listItem
    });
    res.status(201).send("Created");
})


