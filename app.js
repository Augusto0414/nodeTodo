require('colors');
const { guardarDB, leerBD } = require('./helpers/guardarArchivo');
const { inquiererQuestion,
    pausa,
    writeQuestion,
    listadoTareasBorradas,
    pregunta,
    listadoCheckList,
} = require('./helpers/inquierer'); //require

const Tareas = require('./models/tareas');
const main = async () => {
    let option = '';
    const tareas = new Tareas();
    const tareasBD = leerBD();
    if (tareasBD) {
        tareas.cargarTareas(tareasBD);
    }
    do {
        option = await inquiererQuestion();
        switch (option) {
            case '1': const desc = await writeQuestion('Description: ');
                tareas.crearTarea(desc);
                break;
            case '2': tareas.listadoCompleto();
                break;
            case '3': tareas.listadoPendientesCompletadas(true);
                break;
            case '4': tareas.listadoPendientesCompletadas(false);
                break;
            case '5': const ids = await listadoCheckList(tareas.listadoArr);
                tareas.toggleCompletado(ids);
                break;
            case '6': const id = await listadoTareasBorradas(tareas.listadoArr);
                const ok = pregunta(`¿Esta seguro que desea eliminar esta tarea?`)
                if (id !== '0') {
                    if (ok) {
                        tareas.eliminarTarea(id);
                        console.log('tarea eliminada ')
                    }
                }
                break;
        }
        guardarDB(tareas.listadoArr);
        //option = String(option).trim().slice(0, 1);
        if (option !== '7') await pausa();
    } while (option !== '7')
}

main(); 