import {makeStyles} from '@material-ui/core/styles';
import {useEffect, useState} from "react";
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField} from '@material-ui/core';

const urlApi_getSQLServer =  "http://localhost:9999/listaMedicamentos";
const urlApi_postSQLServer = "http://localhost:9999/Medicamentos/new/";
const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    iconos:{
        cursor: 'pointer'
    },
    inputMaterial:{
        width: '100%'
    }
}));

const Medicamentos= () => {
    const  [dataMeticamentos , setDataMedicamentos] = useState([]);
    const styles= useStyles();
    const [modalInsertarMedicamentos, setModalInsertarMedicamentos]=useState(false);
    const [consolaSeleccionadaMedicamentos, setConsolaSeleccionadaMedicamentos]=useState({
        codigo: '',
        nombre: '',
    })

    const handleChangeMedicamentos=e=>{
        const {name, value}=e.target;
        setConsolaSeleccionadaMedicamentos(prevState=>({
            ...prevState,
            [name]: value
        }))
        //console.log(consolaSeleccionadaMedicamentos);
    }
    const peticionPostMedicamentos = async () =>{

        const requestOptionsMedicamentos = {
            'method': 'POST',
            'headers': {
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer my-token',
                'My-Custom-Header': 'foobar',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods' : 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers' : 'Origin, Content-Type, X-Auth-Token'
            },
            'mode': 'cors',
            'body': JSON.stringify(consolaSeleccionadaMedicamentos)
        };
        //console.log("Iniciando post medicamentos")
        //console.log(requestOptionsMedicamentos)
        fetch(urlApi_postSQLServer, requestOptionsMedicamentos)
            .then(responseMedicamentos => responseMedicamentos.json())
            .then(jsonMedicamentos => {
                //console.log(jsonMedicamentos);
                setDataMedicamentos(dataMeticamentos.concat(jsonMedicamentos));
                abrirCerrarModalInsertarMedicamentos()

            });

    }
    useEffect(()=>{
        const fetchDataMedicamentos = async () =>{

            await fetch(urlApi_getSQLServer)
                .then(response => response.json())
                .then(json => {
                    //console.log(json);
                    setDataMedicamentos(json)
                })
                .catch(error => console.log(error))
        }
        fetchDataMedicamentos();
    })
    const abrirCerrarModalInsertarMedicamentos=()=>{
        setModalInsertarMedicamentos(!modalInsertarMedicamentos);
    }
    const bodyInsertarMedicamentos=(
        <div className={styles.modal}>
            <h3>Agregar Nueva Dueno</h3>
            <TextField name="codigo"    className={styles.inputMaterial} label="Codigo" onChange={handleChangeMedicamentos}  />
            <br />
            <TextField name="nombre"  className={styles.inputMaterial} label="Nombre" onChange={handleChangeMedicamentos} />
            <br />

            <br /><br />
            <div align="right">
                <Button color="primary" onClick={peticionPostMedicamentos}>Agregar</Button>
                <Button onClick={abrirCerrarModalInsertarMedicamentos} >Cancelar</Button>
            </div>
        </div>
    )
    return (
        <div>
            <h1>Lista de Medicamentos</h1>
            <br/>
            <Button onClick={abrirCerrarModalInsertarMedicamentos}>Agregar Medicamento</Button>
            <br/>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Codigo</TableCell>
                            <TableCell>Nombre</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataMeticamentos.map(medicamentos =>(
                            <TableRow key={medicamentos.id}>
                                <TableCell>{medicamentos.id}</TableCell>
                                <TableCell>{medicamentos.codigo}</TableCell>
                                <TableCell>{medicamentos.nombre}</TableCell>
                            </TableRow>

                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal
                open = {modalInsertarMedicamentos}
                onClose = {abrirCerrarModalInsertarMedicamentos}
            >
                {bodyInsertarMedicamentos}
            </Modal>
            <br/>
        </div>

    )
}
export default Medicamentos