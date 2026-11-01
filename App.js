//Importamos las librerías para la navegación stack
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Importación de las pantallas
import Login from './pantallas/login';
import Home from './pantallas/home';
import IngresarLibro from './pantallas/ingresarLibro';
import BuscarEditarLibro from './pantallas/buscarEditarLibro';
import Edicion from './pantallas/edicion';



//Creación de nuestro stack
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
          {/* Pantalla de Login */}
          <Stack.Screen name="Login" component={Login} />
          
          {/* Pantalla Home con el menú principal */}
          <Stack.Screen name="Home" component={Home} />
          
          {/* Pantalla para Ingresar Libros */}
          <Stack.Screen name="IngresarLibro" component={IngresarLibro} />
          
          {/* Pantalla para Buscar y editar libros (Listar, Actualizar y Borrar) */}
          <Stack.Screen name="BuscarEditarLibro" component={BuscarEditarLibro} />

          {/* Pantalla para Buscar y editar libros (Listar, Actualizar y Borrar) */}
          <Stack.Screen name="Edicion" component={Edicion} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App
