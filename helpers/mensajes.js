require('colors');
const readLine = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

const mostrarMenu = () => {

    return new Promise((resolve) => {
        console.clear()
        console.log('*****************************'.green)
        console.log('   Seleccione una opción     '.green)
        console.log('*****************************\n'.green)
        console.log(`${'1.'.green} Crear tarea   `)
        console.log(`${'2.'.green} Listar tareas   `)
        console.log(`${'3.'.green} Listar tareas completadas `)
        console.log(`${'4.'.green} Completar tarea(s)   `)
        console.log(`${'5.'.green} Borrar tarea  `)
        console.log(`${'0.'.green} Salir   `)
        readLine.question('Seleccione una opción: ', (opt) => {
            resolve(opt);
        })
    })

}
const pausa = () => {
    return new Promise((resolve) => {
        readLine.question(`\nPresione ${'ENTER'.green} para continuar\n`, () => {
            resolve();
        })
    })
}

const cerrarReadLine = () => {
    readLine.close();
}

module.exports = {
    mostrarMenu,
    pausa,
    cerrarReadLine,

}
