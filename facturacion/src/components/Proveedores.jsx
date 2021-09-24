import React, {useState , useEffect} from 'react';
import axios from 'axios';
import {Modal , ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Proveedores () {
const baseUrl = "https://localhost:44303/api/Proveedor";
const [data, setData]=useState([]);
const [modalInsertar, setModalInsertar]=useState(false);
const [modalEliminar , setModalEliminar]=useState(false);
const [modalEditar, setModalEditar]=useState(false);
const [proveedorSeleccionado, setProveedorSeleccionado]=useState({
 idProveedor: '',
 nombre: '',
 nit: '',
 telefono: '',
 direccion: ''
 
});

const handleChange=e=>{
    const {name, value}=e.target;
    setProveedorSeleccionado({
        ...proveedorSeleccionado,
        [name]: value
    });
    console.log(proveedorSeleccionado);
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
    delete proveedorSeleccionado.idProveedor;
    await axios.post(baseUrl, proveedorSeleccionado)
    .then(response=>{
        setData(data.concat(response.data));
        abrirCerrarModalInsertar();
    }).catch(error=>{
        console.log(error);
    })
    }

    const peticionPut = async ()=>{
        await axios.put(baseUrl + "/" + proveedorSeleccionado.idProveedor, proveedorSeleccionado)
        .then(response=>{
            var respuesta = response.data;
            var dataAuxiliar = data;
            dataAuxiliar.map(Proveedor=>{
                if (Proveedor.idproveedor === proveedorSeleccionado.idProveedor) {
                    Proveedor.nombre = respuesta.nombre;
                    Proveedor.nit = respuesta.nit;
                    Proveedor.telefono = respuesta.telefono;
                    Proveedor.direccion = respuesta.direccion;
                    
                }
            });
            abrirCerrarModalEditar();
        }).catch(error=>{
            console.log(error);
        })
        }

        const peticionDelete = async ()=>{
            await axios.delete(baseUrl + "/" + proveedorSeleccionado.idProveedor)
            .then(response=>{
            setData(data.filter(Proveedor=>Proveedor.idProveedor !== response.data));
                abrirCerrarModalEliminar();
            }).catch(error=>{
                console.log(error);
            })
            }


const seleccionarProveedor=(Proveedor, caso)=>{
    setProveedorSeleccionado(Proveedor);
    (caso === "Editar")?
    abrirCerrarModalEditar(): abrirCerrarModalEliminar();
}


useEffect(()=>{
    peticionGet();
},[])

    return(
        <div className="App">
            <br />
            <button onClick={()=>abrirCerrarModalInsertar()} className="btn btn-success">Insertar Proveedor</button>
            <br />
        <table className="table Table-bordered">
         <thead>
             <tr>
                 <th>IdProveedor</th>
                 <th>Nombre</th>
                 <th>Nit</th>
                 <th>Telefono</th>
                 <th>Direccion</th>
                 <th>Acciones</th>
             </tr>
         </thead>
         <tbody>
             {data.map(Proveedor=>(
                 <tr key={Proveedor.idProveedor}>
                     <td>{Proveedor.idProveedor}</td>
                     <td>{Proveedor.nombre}</td>
                     <td>{Proveedor.nit}</td>
                     <td>{Proveedor.telefono}</td>
                     <td>{Proveedor.direccion}</td>
                     <td>
                         <button className="btn btn-primary" onClick={()=>seleccionarProveedor(Proveedor, "Editar")}>Editar</button> {" "}
                         <button className="btn btn-danger" onClick={()=>seleccionarProveedor(Proveedor, "Eliminar")}>Eliminar</button>{" "}
                     </td>
                 </tr>
             ))}
         </tbody>
        </table>
    <Modal isOpen={modalInsertar}>
        <ModalHeader>Insertar Proveedor</ModalHeader>
        <ModalBody>
            <div className="form-group">
                <label>Nombre:</label>
                <br />
                <input type="text" className="form-control" name="nombre" onChange={handleChange} />
                <br />
                <label>Nit:</label>
                <br />
                <input type="number" className="form-control" name="nit" onChange={handleChange}/>
                <br />
                <label>Telefono:</label>
                <br />
                <input type="number" className="form-control" name="telefono" onChange={handleChange}/>
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
        <ModalHeader>Editar Proveedor</ModalHeader>
        <ModalBody>
            <div className="form-group">
                <label>Id Proveedor:</label>
                <br />
                <input type="number" className="form-control" name="IdProducto" readOnly value={proveedorSeleccionado && proveedorSeleccionado.idProveedor} />
                <br />
                <label>Nombre:</label>
                <br />
                <input type="text" className="form-control" name="nombre" onChange={handleChange} value={proveedorSeleccionado && proveedorSeleccionado.nombre} />
                <br />
                <label>Nit:</label>
                <br />
                <input type="number" className="form-control" name="nit" onChange={handleChange} value={proveedorSeleccionado && proveedorSeleccionado.nit} />
                <br />
                <label>Telefono:</label>
                <br />
                <input type="number" className="form-control" name="telefono" onChange={handleChange} value={proveedorSeleccionado && proveedorSeleccionado.telefono} />
                <br />
                <label>Direccion:</label>
                <br />
                <input type="text" className="form-control" name="direccion" onChange={handleChange} value={proveedorSeleccionado && proveedorSeleccionado.direccion} />
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
            ¿Estas seguro que deseas eliminar el proveedor {proveedorSeleccionado && proveedorSeleccionado.nombre} ?
        </ModalBody>
        <ModalFooter>
            <button className="btn btn-danger" onClick={()=>peticionDelete()}>Si</button>
            <button className="btn btn-secondary" onClick={()=>abrirCerrarModalEliminar()}>No</button>
        </ModalFooter>
    </Modal> 


        </div>
    );
} 