document.addEventListener('DOMContentLoaded', () => {
    const mainCounterElement = document.getElementById('mainCounter');
    const increaseCleanBtn = document.getElementById('increaseCleanBtn');
    const addBacteriaFieldBtn = document.getElementById('addBacteriaFieldBtn');
    const resetAllBtn = document.getElementById('resetAllBtn');
    const bacteriaInputsContainer = document.getElementById('bacteriaInputsContainer');
    const bacteriaFieldsWarning = document.getElementById('bacteriaFieldsWarning');

    let mainCount = 0; // Contador principal
    let bacteriaFieldsCount = 0; // Contador para el número de campos de bacteria (para el límite)
    const MAX_MAIN_COUNT = 100; // Límite del contador principal
    const MAX_BACTERIA_FIELDS = 100; // Límite máximo para los campos de bacteria

    // Función para actualizar el contador principal en la pantalla y gestionar el estado de los botones
    function updateMainCounter() {
        mainCounterElement.textContent = mainCount;

        // Deshabilitar los botones de aumento si se alcanza el límite del contador principal
        if (mainCount >= MAX_MAIN_COUNT) {
            increaseCleanBtn.disabled = true;
            // Solo deshabilita el botón de agregar bacteria si también se alcanzó el límite de campos
            if (bacteriaFieldsCount >= MAX_BACTERIA_FIELDS) {
                 addBacteriaFieldBtn.disabled = true;
                 bacteriaFieldsWarning.textContent = `Se ha alcanzado el límite de ${MAX_BACTERIA_FIELDS} campos de bacteria Y el contador principal ha llegado a ${MAX_MAIN_COUNT}.`;
            } else {
                 bacteriaFieldsWarning.textContent = `El contador principal ha alcanzado su límite de ${MAX_MAIN_COUNT}.`;
                 addBacteriaFieldBtn.disabled = true; // Deshabilita el botón de agregar si el contador principal está lleno.
            }
        } else {
            increaseCleanBtn.disabled = false;
            // Solo habilitar el botón de agregar bacteria si no se ha alcanzado su propio límite
            if (bacteriaFieldsCount < MAX_BACTERIA_FIELDS) {
                addBacteriaFieldBtn.disabled = false;
                bacteriaFieldsWarning.textContent = ''; // Limpiar advertencia si todo está bien
            } else {
                addBacteriaFieldBtn.disabled = true;
                bacteriaFieldsWarning.textContent = `Se ha alcanzado el límite de ${MAX_BACTERIA_FIELDS} campos de bacteria.`;
            }
        }
    }

    // Función para añadir un nuevo campo de bacteria
    function addBacteriaField(fieldLabelNumber) {
        if (bacteriaFieldsCount < MAX_BACTERIA_FIELDS) {
            bacteriaFieldsCount++;
            bacteriaFieldsWarning.textContent = ''; // Limpiar advertencia

            const fieldWrapper = document.createElement('div');
            fieldWrapper.classList.add('bacteria-field-item');

            const label = document.createElement('label');
            label.textContent = `Campo ${fieldLabelNumber}:`;
            label.setAttribute('for', `bacteriaInput${fieldLabelNumber}`);

            const input = document.createElement('input');
            input.type = 'number';
            input.inputMode = 'numeric';
            input.pattern = '[0-9]*';
            input.id = `bacteriaInput${fieldLabelNumber}`;
            input.min = "0";
            input.value = "0"; // ¡Siempre se inicia en 0!
            input.placeholder = "Valor";

            const displayValue = document.createElement('span');
            displayValue.classList.add('display-value');
            displayValue.textContent = "0"; // ¡Siempre muestra 0 inicialmente!

            input.addEventListener('input', () => {
                const val = parseInt(input.value) || 0;
                displayValue.textContent = val;
                input.value = val;
            });

            fieldWrapper.appendChild(label);
            fieldWrapper.appendChild(input);
            fieldWrapper.appendChild(displayValue);

            // *** CAMBIO CLAVE PARA EL ORDEN Y EL FOCO ***
            // Insertar el nuevo campo al principio del contenedor
            bacteriaInputsContainer.prepend(fieldWrapper); // .prepend() añade al inicio

            // Hacer focus en el input del nuevo campo
            input.focus();

            if (bacteriaFieldsCount >= MAX_BACTERIA_FIELDS) {
                addBacteriaFieldBtn.disabled = true;
                bacteriaFieldsWarning.textContent = `Se ha alcanzado el límite de ${MAX_BAACTERIA_FIELDS} campos de bacteria.`;
            }
        }
    }

    // Event listener para el botón "Aumentar Muestra"
    increaseCleanBtn.addEventListener('click', () => {
        if (mainCount < MAX_MAIN_COUNT) {
            mainCount++;
            updateMainCounter();
        }
    });

    // Event listener para el botón "Agregar Valor Bacteria"
    addBacteriaFieldBtn.addEventListener('click', () => {
        if (mainCount < MAX_MAIN_COUNT && bacteriaFieldsCount < MAX_BACTERIA_FIELDS) {
            const labelNumber = mainCount + 1; // El número de la etiqueta será el contador principal + 1
            
            mainCount++; // Incrementa el contador principal
            updateMainCounter(); // Actualiza la visualización y el estado de los botones

            addBacteriaField(labelNumber); // Pasa solo el número para la etiqueta
        }
    });

    // Event listener para el botón "Reiniciar Todo"
    resetAllBtn.addEventListener('click', () => {
        mainCount = 0;
        bacteriaFieldsCount = 0;
        bacteriaInputsContainer.innerHTML = ''; // Limpiar todos los campos de bacteria
        bacteriaFieldsWarning.textContent = '';
        updateMainCounter();
    });

    // Inicializar los contadores y el estado al cargar la página
    updateMainCounter();
});