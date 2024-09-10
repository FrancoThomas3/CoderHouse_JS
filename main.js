// Ingresar Empleados Con Salarios.
function ingresarEmpleados() {
    let empleados = [];
    let continuar = true;

    while (continuar === true) {
        const nombre = prompt("Ingresa el nombre del empleado");
        const salario = parseFloat(prompt("Ingresa el salario del empleado"));

        if (isNaN(salario) || salario < 0) {
            alert("Ingresa un salario válido (mayor a 0)");
        } else {
            empleados.push({ nombre: nombre, salario: salario });
        }

        const respuesta = prompt("Desea ingresar otro empleado? Si/No").toLowerCase();
        continuar = respuesta === "si";
    }
    return empleados;
}

// Calcular el promedio de los salarios
function calcularPromedio(empleados) {
    const suma = empleados.reduce((acc, empleado) => acc + empleado.salario, 0);
    const promedio = suma / empleados.length;
    return promedio;
}

// Encontrar los empleados con el salario más alto
function empleadosMejorPagados(empleados) {
    let mejorSalario = empleados[0].salario;

    empleados.forEach(empleado => {
        if (empleado.salario > mejorSalario) {
            mejorSalario = empleado.salario;
        }
    });

    let mejores = empleados.filter((empleado) => empleado.salario === mejorSalario);
    return mejores;
}

// Encontrar los empleados con el salario más bajo
function empleadosPeorPagados(empleados) {
    let peorSalario = empleados[0].salario;

    empleados.forEach(empleado => {
        if (empleado.salario < peorSalario) {
            peorSalario = empleado.salario;
        }
    });

    let peores = empleados.filter((empleado) => empleado.salario === peorSalario);
    return peores;
}

// Mostrar empleados por encima y por debajo del promedio
function mostrarEmpleadosPorSalario(empleados, promedio) {
    let porEncimaPromedio = [];
    let porDebajoPromedio = [];

    empleados.forEach(empleado => {
        if (empleado.salario >= promedio) {
            porEncimaPromedio.push(empleado);
        } else {
            porDebajoPromedio.push(empleado);
        }
    });

    console.log("%c*** Empleados con salario por encima o igual al promedio ***", "color:green");
    porEncimaPromedio.forEach(empleado => {
        console.log(empleado.nombre + " con salario de " + empleado.salario);
    });

    console.log("%c*** Empleados con salario por debajo del promedio ***", "color:red");
    porDebajoPromedio.forEach(empleado => {
        console.log(empleado.nombre + " con salario de " + empleado.salario);
    });
}

// Funcion Final
function sistemaDeSalarios() {
    const empleados = ingresarEmpleados();

    if (empleados.length === 0) {
        console.log("No hay empleados ingresados");
        return;
    }

    const promedio = calcularPromedio(empleados);
    const mejores = empleadosMejorPagados(empleados);
    const peores = empleadosPeorPagados(empleados);

    console.log("%c*** Salario promedio ***", "color:yellow");
    console.log(promedio);

    console.log("%c*** Empleados mejor pagados ***", "color:blue");
    mejores.forEach(empleado => console.log(empleado.nombre + " con salario de " + empleado.salario));

    console.log("%c*** Empleados peor pagados ***", "color:purple");
    peores.forEach(empleado => console.log(empleado.nombre + " con salario de " + empleado.salario));

    mostrarEmpleadosPorSalario(empleados, promedio);
}

sistemaDeSalarios();
