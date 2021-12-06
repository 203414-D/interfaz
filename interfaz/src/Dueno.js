import {makeStyles} from '@material-ui/core/styles';
import {useEffect, useState} from "react";
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField} from '@material-ui/core';


const urlApi_get = "http://localhost:8088/listaDueno";
const urlApi_post = "http://localhost:8088/dueno/new/";
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
const Dueno= () => {
    const  [data , setData] = useState([]);
    //hook para Dueños
    const styles= useStyles();
    //hook modal insertar dueños
    const [modalInsertar, setModalInsertar]=useState(false);
    const [consolaSeleccionada, setConsolaSeleccionada]=useState({
        nombreduenos: '',
        telefono:'',
        direccion: ''
    })
    const handleChange=e=>{
        const {name, value}=e.target;
        setConsolaSeleccionada(prevState=>({
            ...prevState,
            [name]: value
        }))
        //console.log(consolaSeleccionada);
    }
    const peticionPost = async () =>{

        const requestOptions = {
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
            'body': JSON.stringify(consolaSeleccionada)
        };

        fetch(urlApi_post, requestOptions)
            .then(response => response.json())
            .then(json => {
                //console.log(json);
                setData(data.concat(json));
                abrirCerrarModalInsertar()

            });

    }
    useEffect(() => {
        const fetchData = async () => {
            await fetch(urlApi_get)
                .then(response => response.json())
                .then(json => {
                    //console.log(json);
                    setData(json)
                })
                .catch(error => console.log(error))
        }
        fetchData();
    },[]);
    const abrirCerrarModalInsertar=()=>{
        setModalInsertar(!modalInsertar);
    }
    const bodyInsertar=(
        <div className={styles.modal}>
            <h3>Agregar Nueva Dueno</h3>
            <TextField name="nombreduenos"    className={styles.inputMaterial} label="Nombre" onChange={handleChange} label="Nombre" />
            <br />
            <TextField name="telefono"  className={styles.inputMaterial} label="Telefono" onChange={handleChange} />
            <br />
            <TextField name="direccion" className={styles.inputMaterial} label="Direccion" onChange={handleChange} />
            <br />

            <br /><br />
            <div align="right">
                <Button color="primary" onClick={peticionPost}>Agregar</Button>
                <Button onClick={abrirCerrarModalInsertar} >Cancelar</Button>
            </div>
        </div>
    )
    return (
            <div>
                <br/>
                <h1   >Lista de Dueños</h1>
                <br/>

                <Button onClick={abrirCerrarModalInsertar}>Agregar Dueño</Button>

                <br/>
                <br/>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Telefono</TableCell>
                                <TableCell>Direccion</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map(dueno =>(
                                <TableRow key={dueno.idduenos}>
                                    <TableCell>{dueno.idduenos}</TableCell>
                                    <TableCell>{dueno.nombreduenos}</TableCell>
                                    <TableCell>{dueno.telefono}</TableCell>
                                    <TableCell>{dueno.direccion}</TableCell>
                                </TableRow>

                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Modal
                    open = {modalInsertar}
                    onClose = {abrirCerrarModalInsertar}
                >
                    {bodyInsertar}
                </Modal>
                <br/>
            </div>
    )
}
export default Dueno