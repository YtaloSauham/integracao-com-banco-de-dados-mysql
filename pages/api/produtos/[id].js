const db = require('../../../config/db')

export default function handle(req,res){
      
    if(req.method==="GET"){
        GETbyID(req,res)
        }

    
    function GETbyID(req,res){
        const id=req.query.id
        db('produto')
        .select('codigo', 'descricao', 'marca','tamanho','quantidade','precocusto','precovenda')
        .where('codigo',id)
        .then(produtos => res.json(produtos))
        .catch(err => res.status(500).send(err))
             
    }
    
}