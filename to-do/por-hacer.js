const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, err => {
        if (err)
            throw new Error('No se guardo el archivo', err);
    });
}

const cargarDB = () => {

    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }


    // console.log(listadoPorHacer);
}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;

}

const actualizar = (descripcion, completado = true) => {

    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    })

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        console.log('No se encuentra la tarea en la BD');
        return false;
    }
}


const borrar = (descripcion) => {

    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    })
    if (index >= 0) {
        listadoPorHacer.splice(index, 1);
        guardarDB();
        return true;

    } else {
        console.log('No se encuentra la tarea en la BD');
        return false;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}