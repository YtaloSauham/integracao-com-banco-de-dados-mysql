import { useReducer } from 'react'

const db =require('../../../config/db')
const { existsOrError, notExistsOrError, equalsOrError } =require('../../../config/validation')



export default function dbController(req,res){
    
    if(req.method==="GET"){
        GET(req,res)
    }
    if(req.method==="POST"){
        POST(req,res)
    }


    async function POST(req,res){
        const product={...req.body}
        try {
            existsOrError(product.descricao, 'Descricao não informado')
            existsOrError(product.marca, 'Marca não informada')
            existsOrError(product.tamanho, 'Tamanho não informado')
            existsOrError(product.quantidade, 'Quantidade não informado')
            existsOrError(product.precocusto, 'Preco de custo não informado')
            existsOrError(product.precovenda, 'Preco de venda não informado')
            


            const produtctFromDB = await db('produto')
            .where({ codigo: product.codigo }).first()
            notExistsOrError(produtctFromDB, 'Produto já cadastrado')
            
            
        

        } catch (error) {
            return res.status(400).send(error)
            
        }
       
            db('produto')
            .insert(product)
            .then(_=>res.status(204).send())
            .catch(err => res.status(500).send(err))
        
    }



    function GET(req,res){
        db('produto')
        .select('codigo', 'descricao', 'marca','tamanho','quantidade','precocusto','precovenda')
        .then(produtos => res.json(produtos))
        .catch(err => res.status(500).send(err))
             
    }


 

}
