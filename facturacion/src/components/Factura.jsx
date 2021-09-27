import React, {useState , useEffect} from 'react';
import axios from 'axios';
import {Modal , ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Facturas () {
const baseUrl = "https://localhost:44303/api/Factura";
const [data, setData]=useState([]);
const [modalInsertar, setModalInsertar]=useState(false);
const [modalEliminar , setModalEliminar]=useState(false);
const [modalEditar, setModalEditar]=useState(false);
const [facturaSeleccionado, setFacturaSeleccionado]=useState({
 idFactura: '',
 idCliente: '',
 fecha: ''
 
});

const handleChange=e=>{
    const {name, value}=e.target;
    setFacturaSeleccionado({
        ...facturaSeleccionado,
        [name]: value
    });
    console.log(facturaSeleccionado);
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
    delete facturaSeleccionado.idFactura;
    await axios.post(baseUrl, facturaSeleccionado)
    .then(response=>{
        setData(data.concat(response.data));
        abrirCerrarModalInsertar();
    }).catch(error=>{
        console.log(error);
    })
    }

    const peticionPut = async ()=>{
        await axios.put(baseUrl + "/" + facturaSeleccionado.idFactura, facturaSeleccionado)
        .then(response=>{
            var respuesta = response.data;
            var dataAuxiliar = data;
            dataAuxiliar.map(Factura=>{
                if (Factura.idFactura === facturaSeleccionado.idFactura) {
                    Factura.idFactura = respuesta.idFactura;
                    Factura.idCliente = respuesta.idCliente;
                    Factura.fecha = respuesta.fecha;
                    
                    
                }
            });
            abrirCerrarModalEditar();
        }).catch(error=>{
            console.log(error);
        })
        }

        const peticionDelete = async ()=>{
            await axios.delete(baseUrl + "/" + facturaSeleccionado.idFactura)
            .then(response=>{
            setData(data.filter(Factura=>Factura.idFactura !== response.data));
                abrirCerrarModalEliminar();
            }).catch(error=>{
                console.log(error);
            })
            }


const seleccionarFactura=(Factura, caso)=>{
    setFacturaSeleccionado(Factura);
    (caso === "Editar")?
    abrirCerrarModalEditar(): abrirCerrarModalEliminar();
}


useEffect(()=>{
    peticionGet();
},[])

    return(
        <div className="App">
            <br />
            <button  onClick={()=>abrirCerrarModalInsertar()} className="btn btn-success ">Insertar Factura</button>
            <br />
        <table className="table Table-bordered">
         <thead>
             <tr>
                 <th>Id  Factura</th>
                 <th>Id Cliente</th>
                 <th>Fecha</th>
                 <th>Acciones</th>
             </tr>
         </thead>
         <tbody>
             {data.map(Factura=>(
                 <tr key={Factura.idFactura}>
                     <td>{Factura.idFactura}</td>
                     <td>{Factura.idCliente}</td>
                     <td>{Factura.fecha}</td>
                     <td>
                         <button className="btn btn-primary" onClick={()=>seleccionarFactura(Factura, "Editar")}>Editar</button> {" "}
                         <button className="btn btn-danger" onClick={()=>seleccionarFactura(Factura, "Eliminar")}>Eliminar</button>{" "}
                     </td>
                 </tr>
             ))}
         </tbody>
        </table>
    <Modal isOpen={modalInsertar}>
        <ModalHeader>Insertar Factura</ModalHeader>
        <ModalBody>
            <div className="form-group">
                <label>ID Cliente:</label>
                <br />
                <input type="number" className="form-control" name="idcliente" onChange={handleChange} />
                <br />
                <label>Fecha:</label>
                <br />
                <input type="date" className="form-control" name="fecha" onChange={handleChange}/>
                <br />
            </div>
        </ModalBody>
        <ModalFooter>
            <button className="btn btn-primary" onClick={()=>peticionPost()}>Insertar</button>{" "}
            <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()} >Cancelar</button>
        </ModalFooter>
    </Modal>


    <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Factura</ModalHeader>
        <ModalBody>
            <div className="form-group">
                <label>Id Factura:</label>
                <br />
                <input type="number" className="form-control" name="idfactura" readOnly value={facturaSeleccionado && facturaSeleccionado.idFactura} />
                <br />
                <label>Id Cliente:</label>
                <br />
                <input type="number" className="form-control" name="idcliente" onChange={handleChange} value={facturaSeleccionado && facturaSeleccionado.idCliente} />
                <br />
                <label>Fecha:</label>
                <br />
                <input type="date" className="form-control" name="fecha" onChange={handleChange} value={facturaSeleccionado && facturaSeleccionado.fecha} />
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
            ¿Estas seguro que deseas eliminar la factura {facturaSeleccionado && facturaSeleccionado.idFactura} ?
        </ModalBody>
        <ModalFooter>
            <button className="btn btn-danger" onClick={()=>peticionDelete()}>Si</button>
            <button className="btn btn-secondary" onClick={()=>abrirCerrarModalEliminar()}>No</button>
        </ModalFooter>
    </Modal> 


        </div>
    );
} 