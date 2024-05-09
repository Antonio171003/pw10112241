let express = require('express');
let mysql = require('mysql');
let cors = require('cors');

let app = express();
app.use(express.json());
app.use(cors());

//Conexion a MySQL
let conexion = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'pwdata'
    // port: '3306'' -> Para poner un numero de puerto
})

//Nos conectamos a MySQL
conexion.connect(error => {
    if(error){
        throw error;
    }
    else{
        console.log('Conectado a la base de datos');
    }
})

//Rutas de acceso
app.get("/", function(req, res){
    res.send("Ruta de Inicio")
})

//Seleccionamos todos los clientes
app.get('/api/clientes', (req, res) => {
    conexion.query('Select * from clientes', (error, filas) => {
        if(error){
            throw error;
        }
        else{
            res.send(filas);
        }
    });
});

//Seleccionamos un cliente en especifico
app.get('/api/clientes/:id', (req, res) => {
    conexion.query("Select * from clientes where id=?", [req.params.id],(error, filas) => {
        if(error){
            throw error;
        }
        else{
            res.send(filas);
        }
    });
});

app.delete('/api/clientes/:id', (req, res) => {
    let id = req.params.id
    conexion.query('Delete from clientes where id = ?', [id], (error, filas) =>{
        if(error){
            throw error
        }
        else{
            res.send(filas)
        }
    })
});

//Insertar un nuevoo cliente
app.post('/api/clientes', (req, res) => {
    let data = {
        id:req.body.id,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        rfc: req.body.rfc,
        curp: req.body.curp,
        cp: req.body.cp
    }
    let sql = "Insert into clientes set ?";
    conexion.query(sql, data, (error, resultado) =>{
        if(error){
            throw error
        }
        else{
            res.send(resultado)
        }
    })
});

//Actualizar
app.put('/api/clientes/:id', (req, res) => {
    let id = req.params.id
    let nombre = req.body.nombre
    let apellido = req.body.apellido
    let direccion = req.body.direccion
    let telefono = req.body.telefono
    let rfc = req.body.rfc
    let curp = req.body.curp
    let cp = req.body.cp

    let sql = "Update clientes Set nombre = ?, apellido = ?, direccion = ?, telefono = ?, rfc = ?, curp = ?, cp = ? Where id = ?";

    conexion.query(sql, [nombre, apellido, direccion, telefono, rfc, curp, cp, id], (error, resultado) =>{
        if(error){
            throw error
        }
        else{
            res.send(resultado)
        }
    })

});

//Encender Servidor
let puerto = 3000;
app.listen(puerto, function(){
    console.log("Servidor escuchando puerto " + puerto);
});