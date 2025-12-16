        // Conección de la API
        const API_OFICIAL = 'https://dolarapi.com/v1/dolares/oficial';
        const API_BLUE = 'https://dolarapi.com/v1/dolares/blue';

        // Elementos del DOM
        const oficialCompraEl = document.getElementById('oficial-compra');
        const oficialVentaEl = document.getElementById('oficial-venta');
        const blueCompraEl = document.getElementById('blue-compra');
        const blueVentaEl = document.getElementById('blue-venta');
        
        const cardOficial = document.getElementById('card-oficial');
        const cardBlue = document.getElementById('card-blue');

        // Formatea el número como moneda

        function formatCurrency(value) {
            if (typeof value !== 'number' || isNaN(value)) {
                return 'N/A';
            }
            return value.toLocaleString('es-AR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        }
        
        // Efecto de pulso al actualizar
        function triggerUpdateFlash() {
            [cardOficial, cardBlue].forEach(card => {
                if(card) {
                    card.classList.add('updated');
                    setTimeout(() => {
                        card.classList.remove('updated');
                    }, 200);
                }
            });
        }

        // Actualiza el contenido del DOM.
        function updateValue(element, value) {
            if (element) {
                const newValue = `$${formatCurrency(value)}`;
                if (element.textContent !== newValue) {
                    element.innerHTML = newValue; // Hay que usae innerHTML para que se reseteen las clases
                    element.classList.remove('error-text', 'loading-text');
                }
            }
        }

        // Función para mostrar errores
        function showError(element) {
            if (element && !element.classList.contains('error-text')) {
                element.innerHTML = 'Error';
                element.classList.add('error-text');
                element.classList.remove('loading-text');
            }
        }
        
        // Muestra el estado de carga inicial.
        function showLoading() {
            [oficialCompraEl, oficialVentaEl, blueCompraEl, blueVentaEl].forEach(el => {
                if (el) {
                    el.innerHTML = '<span class="loading-text">...</span>';
                }
            });
        }

        // Función principal para obtener y mostrar los datos.
        async function fetchDolarData() {
            console.log('Actualizando valores del dólar...');
            
            try {
                // Dos peticiones a la API en paralelo
                const [oficialRes, blueRes] = await Promise.all([
                    fetch(API_OFICIAL),
                    fetch(API_BLUE)
                ]);
                
                // Manejo de respuestas y actualización del DOM
                if (!oficialRes.ok) {
                    console.error('Error al obtener Dólar Oficial');
                    showError(oficialCompraEl);
                    showError(oficialVentaEl);
                } else {
                    const oficialData = await oficialRes.json();
                    updateValue(oficialCompraEl, oficialData.compra);
                    updateValue(oficialVentaEl, oficialData.venta);
                }

                if (!blueRes.ok) {
                    console.error('Error al obtener Dólar Blue');
                    showError(blueCompraEl);
                    showError(blueVentaEl);
                } else {
                    const blueData = await blueRes.json();
                    updateValue(blueCompraEl, blueData.compra);
                    updateValue(blueVentaEl, blueData.venta);
                }
                
                // Dispara el efecto visual de actualización solo si ambas fueron exitosas.
                if (oficialRes.ok && blueRes.ok) {
                    triggerUpdateFlash();
                }

            } catch (error) {
                console.error('Error al actualizar datos:', error);
                // Muestra error por si falla la conexión general
                showError(oficialCompraEl);
                showError(oficialVentaEl);
                showError(blueCompraEl);
                showError(blueVentaEl);
            }
        }

        // Inicio

        // Estado de carga inicial
        showLoading();
        
        // Carga los datos bien abre la página
        fetchDolarData();

        // Configura la actualización automática
        // Se actualiza cada 1 minuto apra que la API no devuleva error.
        const UPDATE_INTERVAL = 60 * 1000; // 1 minuto
        setInterval(fetchDolarData, UPDATE_INTERVAL);