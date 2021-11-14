import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout/Layout'
import styles from '../styles/Home.module.css'
import { Table,Button,Form,Row,Col } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import axios from 'axios'



const baseUrl='http://localhost:3000/api/produtos'
export default function Home() {
  const [produtos,setProdutos]=useState([])
  const [codigo,setCodigo]=useState('')
  const [descricao,setDescricao]=useState('')
  const [marca,setMarca]=useState('')
  const [tamanho,setTamanho]=useState('')
  const [quantidade,setQuantidade]=useState('')
  const [custo,setCusto]=useState('')
  const [venda,setVenda]=useState('')
  const [validated, setValidated] = useState(false);
  const [isLoading,setLoading]=useState(false);
  
  useEffect(()=>{
    setInterval(()=>{axios.get(baseUrl)
      .then((res)=>{setProdutos(res.data)})
      .catch((err)=>{console.log(err)})
      
    
    },5000)
    
   },[])



   function save(event){
    event.preventDefault();
    const method = codigo ? 'put' : 'post'
    const url= codigo ? `${baseUrl}/${codigo}` : baseUrl
    const form = event.currentTarget;
    if (form.checkValidity() === false){
      event.stopPropagation();
    }
    else{
      console.log("ENTROU AQUI")
        setLoading(true)    
       axios[method](url,{codigo,descricao,marca,tamanho,quantidade,custo,venda})
        .then(()=>clear())
        .catch(()=>console.log("deu ruim"))
    }
    setLoading(false)
    setValidated(true)   
        }


        function update(produtos){
          setCodigo(produtos.codigo)
          setDescricao(produtos.descricao)
          setMarca(produtos.marca)
          setTamanho(produtos.tamanho)
          setQuantidade(produtos.quantidade)
          setCusto(produtos.precocusto)
          setVenda(produtos.precovenda)
           }
  
      async function remove(id_delete){
          await axios.delete(`${baseUrl}/${id_delete}`)
  
      }
  
      function clear(){
        setCodigo('')
        setDescricao('')
        setMarca('')
        setTamanho('')
        setQuantidade('')
        setCusto('')
        setVenda('')
      }



  function renderTable(){
    return (             
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>Codigo</th>
                    <th>Descrição</th>
                    <th>Marca</th>
                    <th>Tamanho</th>
                    <th>Quantidade</th>
                    <th>Preço custo</th>
                    <th>Preço venda</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </Table>
    )
}

function renderRows(){
  return produtos?.map((produtos,i)=>{
      return  (
          <tr key={produtos.codigo}> 
          <td>{produtos.codigo}</td>
              <td>{produtos.descricao}</td>
              <td>{produtos.marca}</td>
              <td>{produtos.tamanho}</td>
              <td>{produtos.quantidade}</td>
              <td>{produtos.precocusto}</td>
              <td>{produtos.precovenda}</td>
              <td>
                  
                  <Button size="sm" className={styles.button_Edit} variant="warning" onClick={()=>{update(produtos)}}>
                     edit
                      </Button>

                  <Button size="sm" className={styles.button_Remove} variant="danger" onClick={()=>{remove(produtos.codigo)}}>del</Button>
                
              </td>
          
          </tr>
              )
   })
}

  return (
    <div>
      <Layout>
      <Head>
        <title>Interface Felipe</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Form noValidate validated={validated} onSubmit={save}>
            <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCodigo">
            <Form.Label>Codigo</Form.Label>
            <Form.Control type="number" placeholder="Ex:23" value={codigo} onChange={(e)=>setCodigo(e.target.value)} required/>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">Digite um Codigo valido</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridDescricao">
            <Form.Label>Descrição</Form.Label>
            <Form.Control type="text" placeholder="Ex:Camisa Branca" value={descricao} onChange={(e)=>setDescricao(e.target.value)} required/>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">Digite uma Descrição </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlIds="formGridMarca">
            <Form.Label>Marca</Form.Label>
            <Form.Control type="text" placeholder="Ex:Lacoste" value={marca} onChange={(e)=>setMarca(e.target.value)} required/>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">Digite a Marca </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlIds="formGridTamanho">
            <Form.Label>Tamanho</Form.Label>
            <Form.Control type="text" placeholder="Ex:M" value={tamanho} onChange={(e)=>setTamanho(e.target.value)} required/>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">Digite o Tamanho </Form.Control.Feedback>
            </Form.Group>
            
            </Row>
            <Row>
            <Form.Group as={Col} controlIds="formGridQuantidade">
            <Form.Label>Quantidade</Form.Label>
            <Form.Control type="text" placeholder="Ex:M" value={quantidade} onChange={(e)=>setQuantidade(e.target.value)} required/>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">Digite a Quantidade</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} controlIds="formGridCusto">
            <Form.Label>Preco de Custo</Form.Label>
            <Form.Control type="text" placeholder="Ex:25.5" value={custo} onChange={(e)=>setCusto(e.target.value)} required/>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">Digite o Preço de Custo</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} controlIds="formGridVenda">
            <Form.Label>Preco de venda</Form.Label>
            <Form.Control type="text" placeholder="Ex:25.5" value={venda} onChange={(e)=>setVenda(e.target.value)} required/>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">Digite o Preço de Venda</Form.Control.Feedback>
            </Form.Group>
            </Row>
            <Button variant="primary"
            disabled={isLoading} 
            type="submit">{isLoading ? 'Salvando…' : 'Salvar'} </Button>
          <Button  variant="secondary"  active onClick={e=>{clear()}}>Cancelar</Button >
          </Form>
      {renderTable()}
      </Layout>
      
    

     
    </div>
  )
}
