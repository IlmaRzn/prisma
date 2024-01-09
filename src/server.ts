import express from 'express'

import { PrismaClient } from '@prisma/client'

const app = express()

const server = new PrismaClient();

app.use(express.json());
app.post("/users", async (req,res)=>{
   const user= await server.user.create({
        data: {
            name:"geetha",
            gender:"Female",
            address:"kandy"
        }
    })
    return res.json(user).send()
})

app.get ("/users",async (req,res)=>{
    try{
        const users = await server.user.findMany()
        return res.json(users)
    } catch(error){
        console.log(error)
        return res.status(500).json({error})
    }
})

app.put("/users/:id", async (req,res) =>{
    try{
        const {id} = req.params;
        const {name, gender, address} = req.body;
        const updateUser = await server.user.update({
            where:{
                id:parseInt(id),
            },
            data:{
                name:"kamala",
                gender,
                address,
            },
        })
        return res.json(updateUser);
    } catch(error){
        console.error(error)
        return res.status(500).json ({error})
    }
})

app.delete("/users/:id", async (req,res)=>{
    try{
        const {id} = req.params
        await server.user.delete({
            where:{
                id: parseInt(id)
            }
        })
        return res.json({message:"user deleted "});
    } catch(error){
        console.error(error)
    }
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}..`))