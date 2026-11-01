import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Home = ({ navigation }) => {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>📚Mi Biblioteca App📚</Text>
      
      
      <TouchableOpacity 
        style={styles.boton} 
        onPress={() => navigation.navigate('IngresarLibro')}
      >
        <Text style={styles.botonTexto}>Ingresar Libro</Text>
      </TouchableOpacity>

      
      <TouchableOpacity 
        style={styles.botonSecundario} 
        onPress={() => navigation.navigate('BuscarEditarLibro')}
      >
        <Text style={styles.botonTextoSecundario}>Buscar y Editar Libros</Text>
      </TouchableOpacity>

      <View style={styles.contenedorBotonSesion}>  
      <TouchableOpacity 
        style={styles.botonSesion} 
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.botonTextoSesion}>Cerrar Sesión</Text>
      </TouchableOpacity>
      </View>
    </View>
       
  );
};

const styles = StyleSheet.create({
  contenedor: { 
    flex: 1, 
    padding: 24, 
    backgroundColor: '#78F5D7' 
  },
  titulo: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    marginBottom: 8, 
    textAlign: 'center',
    color: '#1f2937'
  },
  boton: { 
    backgroundColor: '#E67575', 
    padding: 16, 
    borderRadius: 8, 
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
  },
  botonTexto: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  botonSecundario: { 
    backgroundColor: '#4b5563', 
    padding: 16, 
    borderRadius: 8, 
    alignItems: 'center',
    borderWidth: 2, 
  },
  botonTextoSecundario: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  contenedorBotonSesion: {

    alignItems: 'center',
  },
  botonSesion: { 
    backgroundColor: '#363232', 
    padding: 10, 
    borderRadius: 8, 
    alignItems: 'center',
    borderWidth: 2,
    marginTop: 500,
    width: "75%" 
  },
  botonTextoSesion: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
});

export default Home;