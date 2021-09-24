import React, {useState , useEffect} from 'react';
import axios from 'axios';
import {Modal , ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Clientes () {
const baseUrl = "https://localhost:44303/api/Cliente";
const [data, setData]=useState([]);
const [modalInsertar, setModalInsertar]=useState(false);
const [modalEliminar , setModalEliminar]=useState(false);
const [modalEditar, setModalEditar]=useState(false);
const [clienteSeleccionado, setClienteSeleccionado]=useState({
 idCliente: '',
 nombre: '',
 identificacion: '',
 telefono: '',
 direccion: ''
});

const handleChange=e=>{
    const {name, value}=e.target;
    setClienteSeleccionado({
        ...clienteSeleccionado,
        [name]: value
    });
    console.log(clienteSeleccionado);
}


const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
}

const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
}

const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
}


const peticionGet = async ()=>{
await axios.get(baseUrl)
.then(response=>{
    setData(response.data);
}).catch(error=>{
    console.log(error);
})
}

const peticionPost = async ()=>{
    delete clienteSeleccionado.idCliente;
    await axios.post(baseUrl, clienteSeleccionado)
    .then(response=>{
        setData(data.concat(response.data));
        abrirCerrarModalInsertar();
    }).catch(error=>{
        console.log(error);
    })
    }

    const peticionPut = async ()=>{
        clienteSeleccionado.identificacion=parseInt(clienteSeleccionado.identificacion);
        clienteSeleccionado.telefono=parseInt(clienteSeleccionado.telefono);
        await axios.put(baseUrl + "/" + clienteSeleccionado.idCliente, clienteSeleccionado)
        .then(response=>{
            var respuesta = response.data;
            var dataAuxiliar = data;
            dataAuxiliar.map(Cliente=>{
                if (Cliente.idCliente === clienteSeleccionado.idCliente) {
                    Cliente.nombre = respuesta.nombre;
                    Cliente.identificacion = respuesta.identificacion;
                    Cliente.telefono = respuesta.telefono;
                    Cliente.direccion = respuesta.direccion;
                    
                }
            });
            abrirCerrarModalEditar();
        }).catch(error=>{
            console.log(error);
        })
        }

        const peticionDelete = async ()=>{
            await axios.delete(baseUrl + "/" + clienteSeleccionado.idCliente)
            .then(response=>{
            setData(data.filter(Cliente=>Cliente.idCliente !== response.data));
                abrirCerrarModalEliminar();
            }).catch(error=>{
                console.log(error);
            })
            }


const seleccionarCliente=(Cliente, caso)=>{
    setClienteSeleccionado(Cliente);
    (caso === "Editar")?
    abrirCerrarModalEditar(): abrirCerrarModalEliminar();
}


useEffect(()=>{
    peticionGet();
},[])

    return(
        <div className="App">
            <br />
            <button onClick={()=>abrirCerrarModalInsertar()} className="btn btn-success">Insertar Cliente</button>
            <br />
        <table className="table Table-bordered">
         <thead>
             <tr>
                 <th>IdCliente</th>
                 <th>Nombre</th>
                 <th>Identificacion</th>
                 <th>Telefono</th>
                 <th>Direccion</th>
                 <th>Acciones</th>
             </tr>
         </thead>
         <tbody>
             {data.map(Cliente=>(
                 <tr key={Cliente.idCliente}>
                     <td>{Cliente.idCliente}</td>
                     <td>{Cliente.nombre}</td>
                     <td>{Cliente.identificacion}</td>
                     <td>{Cliente.telefono}</td>
                     <td>{Cliente.direccion}</td>
                     <td>
                         <button className="btn btn-primary" onClick={()=>seleccionarCliente(Cliente, "Editar")}>Editar</button> {" "}
                         <button className="btn btn-danger" onClick={()=>seleccionarCliente(Cliente, "Eliminar")}>Eliminar</button>{" "}
                     </td>
                 </tr>
             ))}
         </tbody>
        </table>
    <Modal isOpen={modalInsertar}>
        <ModalHeader>Insertar Cliente</ModalHeader>
        <ModalBody>
            <div className="form-group">
                <label>Nombre:</label>
                <br />
                <input type="text" className="form-control" name="nombre" onChange={handleChange} />
                <br />
                <label>Identificacion:</label>
                <br />
                <input type="number" className="form-control" name="identificacion" onChange={handleChange}/>
                <br />
                <label>Telefono:</label>
                <br />
                <input type="number" className="form-control" name="telefono" onChange={handleChange} />
                <br />
                <label>Direccion:</label>
                <br />
                <input type="text" className="form-control" name="direccion" onChange={handleChange}/>
                <br />
            </div>
        </ModalBody>
        <ModalFooter>
            <button className="btn btn-primary" onClick={()=>peticionPost()}>Insertar</button>{" "}
            <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()} >Cancelar</button>
        </ModalFooter>
    </Modal>


    <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Cliente</ModalHeader>
        <ModalBody>
            <div className="form-group">
                <label>Id Cliente:</label>
                <br />
                <input type="number" className="form-control" name="IdCliente" readOnly value={clienteSeleccionado && clienteSeleccionado.idCliente} />
                <br />
                <label>Nombre:</label>
                <br />
                <input type="text" className="form-control" name="nombre" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.nombre} />
                <br />
                <label>Identificacion:</label>
                <br />
                <input type="number" className="form-control" name="identificacion" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.identificacion} />
                <br />
                <label>Telefono:</label>
                <br />
                <input type="number" className="form-control" name="telefono" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.telefono} />
                <br />
                <label>Direccion:</label>
                <br />
                <input type="text" className="form-control" name="direccion" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.direccion} />
                <br />
            </div>
        </ModalBody>
        <ModalFooter>
            <button className="btn btn-primary" onClick={()=>peticionPut()} >Editar</button>{" "}
            <button className="btn btn-danger" onClick={()=>abrirCerrarModalEditar()}>Cancelar</button>
        </ModalFooter>
    </Modal>


    <Modal isOpen={modalEliminar} >
        <ModalBody>
            ¿Estas seguro que deseas eliminar el cliente {clienteSeleccionado && clienteSeleccionado.nombre} ?
        </ModalBody>
        <ModalFooter>
            <button className="btn btn-danger" onClick={()=>peticionDelete()}>Si</button>
            <button className="btn btn-secondary" onClick={()=>abrirCerrarModalEliminar()}>No</button>
        </ModalFooter>
    </Modal> 


        </div>
    );
} 