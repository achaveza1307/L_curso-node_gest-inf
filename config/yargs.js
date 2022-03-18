const descripcion = {
    demand: true,
    alias: 'd'
};

const argv = require('yargs')
    .command('crear', 'Crea una tarea por hacer', {
        descripcion
    })
    .command('actualizar', 'Actualiza el estado de una tarea', {
        descripcion,
        completado: {
            alias: 'c',
            default: true
        }
    })
    .command('borrar', 'Elimina una tarea dada la descripción', {
        descripcion
    })
    .help()
    .argv;

module.exports = {
    argv
}