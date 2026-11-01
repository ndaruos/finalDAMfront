Mi Biblioteca App - Frontend

Aplicación móvil desarrollada en React Native (con Expo) para la gestión de la biblioteca personal, conectada a la API REST del backend.

Tecnologías Utilizadas
* React Native
* Axios 

Instrucciones para correr el proyecto localmente

Opción 1 
1. Clonar el repositorio e ingresar a la carpeta del proyecto** (vía CMD / Terminal):
   git clone https://github.com/ndaruos/finalDAMfront.git
   cd finalDAMfront
   code .

2. Tener en cuenta la instalación de dependencias con el comando: npm install

3. Abrir emular de expo mediante el comando: npx expo start

Opción 2 

1. Abrir nuevo snack en ExpoDev

2. Ir a carpeta donde descargamos repositorio y copiar la carpeta "pantallas" al nuevo snack.

3. Reemplazar el contenido de App.js por el contenido del App.js que tenemos en la carpeta donde descargamos el repositorio. 


Estructura

Pantallas: 
	login: Ingreso de usuario y clave.
	home: Selección de opciones - Ingresar Libro - Buscar y Editar Libros.
	ingresarLibro: Ingresar un nuevo libro a la BBDD. 
	buscarEditarLibro: Buscador y lista de libros donde podemos borrar libros y editarlos
 	edicion: Si seleccionamos editar en la pantalla "buscarEditarLibro" nos trae a esta pantalla. 

App.js: Declaración de navegacion y pantallas.   


Como funciona el proyecto? 

1. Tenemos una pantalla de login donde ingresamos usuario y pass

2. Tenemos un menú principal donde podemos "Ingresar Libro" o "Buscar y Editar Libros"

3. Si vamos a "Ingresar Libro" completamos los datos y luego seleccionamos "Guardar Libro" para que ingrese el mismo a la BBDD Supabase. 

4. Si vamos a "Buscar y Editar Libros" podemos utilizar el buscador de Titulos en la parte superior, también podemos "editar" o "borrar". 

5. Si seleccionamos "borrar" el libro efectivamente se elimina y si selleccionamos "editar" se abre una nueva pantalla donde podemos editar y 
finalmente "Guardar Cambios". 