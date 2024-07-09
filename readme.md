# Prueba técnica de primer impacto

- Para empezar la prueba, pulsa en el botón verde de arriba a la derecha que dice "Use this template" para crear un repositorio en tu cuenta de Github basado en este.
- Crea una nueva rama para desarrollar ahi tu solución.
- Ve haciendo commits regularmente para que podamos entender mejor tu proceso de resolución
- Cuando hayas terminado, crea una Pull Request de tu rama a master en la que nos respondas las siguientes preguntas:

  - Tu approach a la solución
  - Cuales son tus siguientes pasos para hacer esta solución más escalable y mantenible?
  - Suponiendo que los videogames estarian guardados en una tabla de SQL como obtendrias la media de metacritic score por género

- Para compartirnos tu solución nos debes dar acceso a tu repositorio si es privado, y luego nos mandas el link a la Pull Request que hayas hecho.

## Requerimientos

- Usando el conjunto de datos sobre videojuegos que hay en el backend
  - Haz una tabla que muestre todos los videojuegos
  - Haz un formulario de creación de un nuevo videojuego.
  - La tabla debe estar en una ruta distinta a la ge Home, el formulario colocalo donde lo creas mas user friendly
  - Permite borrar un videojuego de la tabla.
  - Permite la edición parcial de un videojuego de la tabla
  - La tabla debe mostrar en todo momento los datos actualizados
- Todos los cambios se deben persistir en el back
- Usa una librería de componentes visuales (nosotros usamos Ant Design, pero puedes usar la que prefieras)
- (EXTRA) Incluye testing
- (EXTRA) Usa react-query para el acceso al backend
- (EXTRA) Añade funcionalidades a la tabla, como filtrar, ordenar, paginar, buscar por texto...

### Documentación

<https://ant.design/>

<https://tanstack.com/query/v3>

<https://nestjs.com/>

## A tener en cuenta

- El objetivo principal es una aplicación funcional, se valorará positivamente un código limpio, mantenible y ordenado.
- En el front ya está instalado `react-query` y `ant design` por si quieres usarlo
- Recuerda hacer una rama para desarrollar tu solución, ya que esperamos que nos envies el link a una Pull Request.
- El stack está pensado para ejecutarse con Docker
  - Debes hacer un `docker compose up` en la raiz del proyecto
- Deberás crear un .env en el front basándote en el `example.env`
