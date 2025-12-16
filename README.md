# Widget Dólar Argentina

Widget en tiempo real que muestra las cotizaciones del **Dólar Oficial** y **Dólar Blue** en Argentina, diseñado específicamente para ser importado como overlay o input transparente en **vMix** u **OBS Studio**.

### Ultima Actualización: 03/11/25

## Características

- **Actualización automática** cada 60 segundos
- **Fondo transparente** para integración perfecta en streams
- **Diseño moderno** con efectos visuales y animación
- **Manejo de errores** con estados de carga y error

## Uso en vMix / OBS

### Para vMix:

1. Descargue todos los archivos del proyecto (`index.html`, `script.js`, `styles.css`).
2. Colóquelos en una carpeta.
3. En vMix, agregue un nuevo input: Click en **Add Input** → **More** → **Web Browser**.
4. En la URL, navegue y seleccione el archivo `index.html`.
5. Ajuste el tamaño según necesite.
6. Marque la opción **"Transparent Background"**.

### Para OBS Studio:

1. Descargue todos los archivos del proyecto.
2. Colóquelos en una carpeta de su computadora.
3. Agregue una nueva fuente: Click en **+** en Fuentes → **Navegador**.
4. Configure:
   - **Marque "Local file"** y seleccione `index.html`.
   - Active **"Apagar la fuente cuando no está visible"** para mejor rendimiento (Opcional).
5. En las propiedades de la fuente, asegúrese de marcar:
   - **"Cerrar la fuente cuando está inactiva"**.
   - El fondo deberá ser transparente automáticamente.

## Estructura del Proyecto

```
widget-dolar-argentina/
│
├── index.html      # Estructura HTML del widget
├── script.js       # Lógica y llamadas a la API
├── styles.css      # Estilos con fondo transparente
├── LICENSE         # Licencia MIT
└── README.md       # Este archivo
```

## Configuración

### Cambiar Intervalo de Actualización

Por defecto, el widget se actualiza cada 60 segundos. Para cambiar esto, edite en `script.js`:

```javascript
const UPDATE_INTERVAL = 60 * 1000; // Cambie el primer valor por la cantidad de segundos.
```

### Personalizar Colores

Edite las variables CSS en `styles.css`:

```css
:root {
    --color-morado: #a020f0;        /* Color principal */
    --color-blanco: #ffffff;         /* Color del texto */
    --color-fondo-tarjeta: rgba(10, 5, 20, 0.75);  /* Fondo de tarjetas */
    --color-borde: rgba(160, 32, 240, 0.5);        /* Bordes */
}
```

## API Utilizada

Este proyecto utiliza la API pública de **[DolarApi.com](https://dolarapi.com)** para obtener las cotizaciones en tiempo real.

### Endpoints:
- Dólar Oficial: `https://dolarapi.com/v1/dolares/oficial`
- Dólar Blue: `https://dolarapi.com/v1/dolares/blue`

**Nota:** La API es de uso gratuito y no requiere autenticación. En caso de utilizarla respete los límites de uso.

## Créditos

- **Datos de cotización:** [DolarApi.com](https://dolarapi.com)
- **Fuente tipográfica:** [Inter](https://fonts.google.com/specimen/Inter)

## Limitaciones

- La API tiene un límite de requests. El widget está configurado para actualizar cada 60 segundos para evitar exceder este límite.
- Requiere conexión a internet para funcionar.
- Los valores mostrados dependen de la disponibilidad de la API externa.

## Licencia

Este proyecto está bajo la Licencia MIT.
