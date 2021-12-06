import {makeStyles} from '@material-ui/core/styles';
import {useEffect, useState} from "react";
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField} from '@material-ui/core';

const urlApi_getMySQL =  "http://localhost:8888/listaMascota";
const urlApi_postMySQL = "http://localhost:8888/mascota/new/";
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

const Mascotas= () => {
    const [dataMascotas, setDataMascotas] = useState([]);
    //Instanciamos los estilos para usar
    const styles = useStyles();
    const [modalInsertarMascotas, setModalInsertarMascotas] = useState(false);
    const [consolaSeleccionadaMascotas, setConsolaSeleccionadaMascotas] = useState({
        nombremascota: '',
        tipomascota: '',
        idmedicamentomas: '',
        iddueno: ''
    })
    const handleChangeMascotas = e => {
        const {name, value} = e.target;
        setConsolaSeleccionadaMascotas(prevState => ({
            ...prevState,
            [name]: value
        }))
        console.log(consolaSeleccionadaMascotas);
    }
    const peticionPostMascotas = async () => {

        const requestOptionsMascotas = {
            'method': 'POST',
            'headers': {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer my-token',
                'My-Custom-Header': 'foobar',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
            },
            'mode': 'cors',
            'body': JSON.stringify(consolaSeleccionadaMascotas)
        };
        console.log("Iniciando post de mascotas")
        console.log(JSON.stringify(consolaSeleccionadaMascotas))
        fetch(urlApi_postMySQL, requestOptionsMascotas)
            .then(response => response.json())
            .then(json => {
                console.log(json);
                setDataMascotas(dataMascotas.concat(json)); // hook de mascotas
                abrirCerrarModalInsertarMascotas()

            });

    }
    useEffect(()=>{
        const fetchDataMascotas = async () => {
            await fetch(urlApi_getMySQL)
                .then(response => response.json())
                .then(json => {
                    //console.log(json);
                    setDataMascotas(json) // Hook
                })
                .catch(error => console.log(error))

        }
        fetchDataMascotas();
    },[])
    const abrirCerrarModalInsertarMascotas=()=>{
        setModalInsertarMascotas(!modalInsertarMascotas);
    }
    const bodyInsertarMascotas=(
        <div className={styles.modal}>
            <h3>Agregar Nueva Mascota</h3>
            <TextField name="nombremascota"    className={styles.inputMaterial} label="Nombre mascota" onChange={handleChangeMascotas} label="Nombre" />
            <br />
            <TextField name="tipomascota"  className={styles.inputMaterial} label="Tipo mascota" onChange={handleChangeMascotas} />
            <br />
            <TextField name="idmedicamentomas" className={styles.inputMaterial} label="Id Medicamentos" onChange={handleChangeMascotas} />
            <br />
            <TextField name="iddueno" className={styles.inputMaterial} label="Id Dueño" onChange={handleChangeMascotas} />
            <br />

            <br /><br />
            <div align="right">
                <Button color="primary" onClick={peticionPostMascotas} >Agregar</Button>
                <Button onClick={abrirCerrarModalInsertarMascotas} >Cancelar</Button>
            </div>
        </div>
    )

    return (
        <div>
            <h1   >Lista de Mascotas</h1>
            <br/>

            <Button onClick={abrirCerrarModalInsertarMascotas}>Agregar Mascota</Button>

            <br/>
            <br/>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Nombre Mascota</TableCell>
                            <TableCell>Tipo Mascota</TableCell>
                            <TableCell>Id Medicamento</TableCell>
                            <TableCell>Id Dueño</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataMascotas.map(mascotas =>(
                            <TableRow key={mascotas.idmascota}>
                                <TableCell>{mascotas.idmascota}</TableCell>
                                <TableCell>{mascotas.nombremascota}</TableCell>
                                <TableCell>{mascotas.tipomascota}</TableCell>
                                <TableCell>{mascotas.idmedicamentomas}</TableCell>
                                <TableCell>{mascotas.iddueno}</TableCell>
                            </TableRow>

                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal
                open = {modalInsertarMascotas}
                onClose = {abrirCerrarModalInsertarMascotas}
            >
                {bodyInsertarMascotas}
            </Modal>

            <br/>
        </div>
    )
}
export default Mascotas