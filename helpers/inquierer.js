const inquierer = require('inquirer');
require('colors');

const menuOption = [
    {
        type: 'list',
        name: 'option',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear tarea`,
            },
            {
                value: '2',
                name: `${'2.'.green} Listar tareas`,
            },
            {
                value: '3',
                name:
                    `${'3.'.green} Listar tareas completadas`,
            },
            {
                value: '4',
                name: `${'4.'.green} Listar tareas pendientes `,
            },
            {
                value: '5',
                name: `${'5.'.green} Completar tarea(s)`,
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar tarea`,
            },
            {
                value: '7',
                name: `${'7.'.green} Salir`
            }
        ]

    }
];

const inquiererQuestion = async () => {
    console.clear()
    console.log('*****************************'.green)
    console.log('   Seleccione una opción     '.green)
    console.log('*****************************\n'.green)
    const { option } = await inquierer.prompt(menuOption)
    return option;
}

const pausa = async () => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.green} para continuar`,
        }
    ]
    await inquierer.prompt(question)
}

const writeQuestion = async (message) => {
    const question = [{
        type: 'input',
        name: 'desc',
        message,
        validate(value) {
            if (value.length === 0) {
                return `Por favor ingrese un valor`;
            }
            return true;
        }

    }];
    const { desc } = await inquierer.prompt(question);
    return desc;
}
const listadoTareasBorradas = async (tareas = []) => {
    const choices = tareas.map((tarea, index) => {
        const idx = `${index + 1}. `.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]
    const { id } = await inquierer.prompt(preguntas);
    return id;
}

const listadoCheckList = async (tareas = []) => {
    const choices = tareas.map((tarea, index) => {
        const idx = `${index + 1}. `.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completado) ? true : false,
        }
    });
    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'seleciones',
            choices
        }
    ]
    const { ids } = await inquierer.prompt(preguntas);
    return ids;
}


const pregunta = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message,
        }
    ]
    const { ok } = await inquierer.prompt(question)
    return ok;
}
module.exports = {
    inquiererQuestion,
    pausa,
    writeQuestion,
    listadoTareasBorradas,
    pregunta,
    listadoCheckList,
}