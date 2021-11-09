const database=require('../../config/db');

const dados={
    codigo:20,
    descricao:'camisa polo',
    marca:'Lacoste',
    tamanho:'M',
    quantidade:20,
    precocusto:2.90,
    precovenda:3.70
}


function save(){
database('produto')
.insert(dados)
.then(_=>console.log(dados))
}


save()





