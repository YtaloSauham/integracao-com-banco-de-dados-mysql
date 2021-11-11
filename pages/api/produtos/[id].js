const db = require('../../../config/db')

export default function handle(req,res){
      
    if(req.method==="GET"){
        GETbyID(req,res)
        }
    if(req.method==="DELETE"){
            DELETEbyID(req,res)
            }

        
        if(req.method==="PUT"){
                PUT(req,res)
                }
            

    
    function GETbyID(req,res){
       
        db('produto')
        .select('codigo', 'descricao', 'marca','tamanho','quantidade','precocusto','precovenda')
        .where('codigo',req.query.id)
        .then(produtos => res.json(produtos))
        .catch(err => res.status(500).send(err))
             
    }

     
    function PUT(req,res){
        const product={...req.body}
        db('produto')
        .update(product)
        .where({ codigo: req.query.id})
        .then(_ => res.status(204).send())
        .catch(err => res.status(500).send(err))
             
    }


    function DELETEbyID(req,res){
     
        db('produto')
        .where('codigo',req.query.id)
        .del()
        .then(produtos => res.json(produtos))
        .catch(err => res.status(500).send(err))
             
    }
    
}
