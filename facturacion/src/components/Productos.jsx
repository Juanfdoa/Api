import React, {useState , useEffect} from 'react';
import axios from 'axios';
import {Modal , ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Productos () {
const baseUrl = "https://localhost:44303/api/Producto";
const [data, setData]=useState([]);
const [modalInsertar, setModalInsertar]=useState(false);
const [modalEliminar , setModalEliminar]=useState(false);
const [modalEditar, setModalEditar]=useState(false);
const [productoSeleccionado, setProductoSeleccionado]=useState({
 idProducto: '',
 nombre: '',
 precio: ''
 
});

const handleChange=e=>{
    const {name, value}=e.target;
    setProductoSeleccionado({
        ...productoSeleccionado,
        [name]: value
    });
    console.log(productoSeleccionado);
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
    delete productoSeleccionado.idProducto;
    await axios.post(baseUrl, productoSeleccionado)
    .then(response=>{
        setData(data.concat(response.data));
        abrirCerrarModalInsertar();
    }).catch(error=>{
        console.log(error);
    })
    }

    const peticionPut = async ()=>{
        await axios.put(baseUrl + "/" + productoSeleccionado.idProducto, productoSeleccionado)
        .then(response=>{
            var respuesta = response.data;
            var dataAuxiliar = data;
            dataAuxiliar.map(Producto=>{
                if (Producto.idProducto === productoSeleccionado.idProducto) {
                    Producto.nombre = respuesta.nombre;
                    Producto.precio = respuesta.precio;
                    
                    
                }
            });
            abrirCerrarModalEditar();
        }).catch(error=>{
            console.log(error);
        })
        }

        const peticionDelete = async ()=>{
            await axios.delete(baseUrl + "/" + productoSeleccionado.idProducto)
            .then(response=>{
            setData(data.filter(Producto=>Producto.idProducto !== response.data));
                abrirCerrarModalEliminar();
            }).catch(error=>{
                console.log(error);
            })
            }


const seleccionarProducto=(Producto, caso)=>{
    setProductoSeleccionado(Producto);
    (caso === "Editar")?
    abrirCerrarModalEditar(): abrirCerrarModalEliminar();
}


useEffect(()=>{
    peticionGet();
},[])

    return(
        <div className="App">
            <br />
            <button onClick={()=>abrirCerrarModalInsertar()} className="btn btn-success">Insertar Producto</button>
            <br />
        <table className="table Table-bordered">
         <thead>
             <tr>
                 <th>IdProducto</th>
                 <th>Nombre</th>
                 <th>Precio</th>
                 <th>Acciones</th>
             </tr>
         </thead>
         <tbody>
             {data.map(Producto=>(
                 <tr key={Producto.idProducto}>
                     <td>{Producto.idProducto}</td>
                     <td>{Producto.nombre}</td>
                     <td>{Producto.precio}</td>
                     <td>
                         <button className="btn btn-primary" onClick={()=>seleccionarProducto(Producto, "Editar")}>Editar</button> {" "}
                         <button className="btn btn-danger" onClick={()=>seleccionarProducto(Producto, "Eliminar")}>Eliminar</button>{" "}
                     </td>
                 </tr>
             ))}
         </tbody>
        </table>
    <Modal isOpen={modalInsertar}>
        <ModalHeader>Insertar Producto</ModalHeader>
        <ModalBody>
            <div className="form-group">
                <label>Nombre:</label>
                <br />
                <input type="text" className="form-control" name="nombre" onChange={handleChange} />
                <br />
                <label>Precio:</label>
                <br />
                <input type="number" className="form-control" name="precio" onChange={handleChange}/>
                <br />
               
            </div>
        </ModalBody>
        <ModalFooter>
            <button className="btn btn-primary" onClick={()=>peticionPost()}>Insertar</button>{" "}
            <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()} >Cancelar</button>
        </ModalFooter>
    </Modal>


    <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Producto</ModalHeader>
        <ModalBody>
            <div className="form-group">
                <label>Id Producto:</label>
                <br />
                <input type="number" className="form-control" name="IdProducto" readOnly value={productoSeleccionado && productoSeleccionado.idProducto} />
                <br />
                <label>Nombre:</label>
                <br />
                <input type="text" className="form-control" name="nombre" onChange={handleChange} value={productoSeleccionado && productoSeleccionado.nombre} />
                <br />
                <label>Precio:</label>
                <br />
                <input type="number" className="form-control" name="precio" onChange={handleChange} value={productoSeleccionado && productoSeleccionado.precio} />
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
            ¿Estas seguro que deseas eliminar el producto {productoSeleccionado && productoSeleccionado.nombre} ?
        </ModalBody>
        <ModalFooter>
            <button className="btn btn-danger" onClick={()=>peticionDelete()}>Si</button>
            <button className="btn btn-secondary" onClick={()=>abrirCerrarModalEliminar()}>No</button>
        </ModalFooter>
    </Modal> 


        </div>
    );
} 