<template>

    <div class="container mt-5">
        <div class="card">
            <div class="card-heard">
                <h4>Agregar Cliente</h4>
                <div v-if="mensaje == 1" class="alert alert-success" role="alert">
                    Datos guardados con exito.
                </div>
                <div v-if="mensaje == 2" class="alert alert-error" role="alert">
                    No se pudo guardar los datos.
                </div>
            </div>
            <div class="card-body">
                <Form :validation-schema="validationSchema" @submit="onTodoBien">
                    <div class="mb-3">
                        Id
                        <Field name="id" type="number" class="form-control" v-model="model.cliente.id" />
                        <ErrorMessage name="id" class="errorValidation"/>
                    </div>
                    <div class="mb-3">
                        Nombre
                        <Field name="nombre" type="text" class="form-control" v-model="model.cliente.nombre" />
                        <ErrorMessage name="nombre" class="errorValidation"/>
                    </div>
                    <div class="mb-3">
                        Apellido
                        <Field name="apellido" type="text" class="form-control" v-model="model.cliente.apellido" />
                        <ErrorMessage name="apellido" class="errorValidation"/>
                    </div>
                    <div class="mb-3">
                        Direccion
                        <Field name="direccion" type="text" class="form-control" v-model="model.cliente.direccion" />
                        <ErrorMessage name="direccion" class="errorValidation"/>
                    </div>
                    <div class="mb-3">
                        Telefono
                        <Field name="telefono" type="text" class="form-control" v-model="model.cliente.telefono" />
                        <ErrorMessage name="telefono" class="errorValidation"/>
                    </div>
                    <div class="mb-3">
                        RFC
                        <Field name="rfc" type="text" class="form-control" v-model="model.cliente.rfc" />
                        <ErrorMessage name="rfc" class="errorValidation"/>
                    </div>
                    <div class="mb-3">
                        CURP
                        <Field name="curp" type="text" class="form-control" v-model="model.cliente.curp" />
                        <ErrorMessage name="curp" class="errorValidation"/>
                    </div>
                    <div class="mb-3">
                        CP
                        <Field name="cp" type="text" class="form-control" v-model="model.cliente.cp" />
                        <ErrorMessage name="cp" class="errorValidation"/>
                    </div>
                    <div class="mb-3">
                        <button type="submit" class="btn btn-primary">Guardar</button>
                    </div>
                </Form>
                
            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios';
import { Field, Form, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod'
export default{
    name: "ClientesCreate",
    components: { Field, Form, ErrorMessage },
    data(){
        const phoneRegex = new RegExp(
            /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
        );
        const rfcRegex = new RegExp(
            /^([a-z]{3,4})(\d{2})(\d{2})(\d{2})([0-9a-z]{3})$/i
        );
        const curpRegex = new RegExp(
            /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/g
        );
        const cpRegex = new RegExp(
            /^[0-9]{5}$/
        );
        const validationSchema = toTypedSchema(
            zod.object({
                id: zod.number({message: 'Solo numeros'}).int(),
                nombre: zod.string().min(2, {message: 'Requerido'}),
                apellido: zod.string().min(2, {message: 'Requerido'}),
                direccion: zod.string().min(5, {message: 'Requerido'}),
                telefono: zod.string().regex(phoneRegex, 'Numero no valido').min(10, {message: 'Minimo 10 digitos'}),
                rfc: zod.string().regex(rfcRegex, 'RFC no valido'),
                curp: zod.string().regex(curpRegex, 'CURP no valida'),
                cp: zod.string().regex(cpRegex, 'Codigo postal no valido'),
            })
        )
        return{
            validationSchema,
            mensaje: 0,
            model:{
                cliente:{
                    id: '',
                    nombre: '',
                    apellido: '',
                    direccion: '',
                    telefono: '',
                    rfc: '',
                    curp: '',
                    cp: ''
                }
            }
        }
    },
    methods:{
        onTodoBien(){
            this.guardarCliente()
        },
        guardarCliente(){
            axios.post('http://localhost:3000/api/clientes', this.model.cliente)
            .then(res => {
                if(res.data.affectedRows == 1){ // Si insertamos un registro
                    this.model.cliente = { // Limpiamos los cuadros de texto
                        id: '',
                        nombre: '',
                        apellido: '',
                        direccion: '',
                        telefono: '',
                        rfc: '',
                        curp: '',
                        cp: ''
                    }
                    this.mensaje = 1
                }
                else{
                    this.mensaje = 2
                }
            })
        }
    }
}
</script>

<style scoped>
    .errorValidation{
        color: red;
        font-weight: bold;
    }
</style>