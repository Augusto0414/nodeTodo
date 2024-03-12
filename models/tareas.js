const Tarea = require('./tarea');
class Tareas {

    _listeners = {};
    get listadoArr() {
        const listado = [];
        Object.keys(this._listeners).forEach((key) => {
            const tarea = this._listeners[key];
            listado.push(tarea);
        })
        return listado;
    }
    constructor() {
        this._listeners = {};
    }
    cargarTareas(tareas = []) {
        tareas.forEach((tarea) => {
            this._listeners[tarea.id] = tarea;
        })
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listeners[tarea.id] = tarea;
    }

    eliminarTarea(id = '') {
        if (this._listeners[id]) {
            delete this._listeners[id];
        }

    }

    listadoCompleto() {
        this.listadoArr.forEach((tarea, index) => {
            const idx = `${index + 1}. ${tarea.desc} :: ${tarea.completado ? 'Completada'.green : 'Pendiente'.red}`
            console.log(idx);
        })
    }

    listadoPendientesCompletadas(completadas = true) {
        this.listadoArr.forEach((tarea, index) => {
            const idx = `${index + 1}. ${tarea.desc} :: ${tarea.completado ? 'Completada'.green : 'Pendiente'.red}`
            if (completadas) {
                if (tarea.completado) {
                    console.log(idx);
                }
            } else {
                if (!tarea.completado) {
                    console.log(idx);
                }
            }
        })
    }
    toggleCompletado(ids = []) {
        ids.forEach((id) => {
            const task = this._listeners[id];
            if(!task.completado){
                task.completado = new Date().toISOString()
            }
        })
        this.listadoArr.forEach((tarea)=>{
            if(!ids.includes(tarea.id)){
                this._listeners[tarea.id].completado = null
            }
        })
    }
}
module.exports = Tareas