const { v4: uuidv4 } = require('uuid');
class Tarea {
    id = '';
    desc = '';
    completado = null;

    constructor(desc) {
        this.desc = desc;
        this.id = uuidv4();
        this.completado = null;
    }

}

module.exports = Tarea;