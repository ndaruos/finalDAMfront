import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';

const URL_BASE = 'https://final-dam.vercel.app'

const BuscarEditarLibro = ({ navigation }) => {
  const [libros, setLibros] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(false);
  
  
  const [idLibroConfirmando, setIdLibroConfirmando] = useState(null);

  
  const obtenerLibros = async () => {
    try {
      setCargando(true);
      const res = await axios.get(`${URL_BASE}/api/libros`);
      setLibros(res.data);
      console.log(res.data)
    } catch (error) {
      console.log('Error al traer los libros', error);
      alert('Error al obtener la lista de libros.');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerLibros();
  }, []);

  
  const librosFiltrados = libros.filter((l) =>
    l.libro_titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  
  const ejecutarBorrado = async (codigo) => {
    try {
      setCargando(true);
      await axios.delete(`${URL_BASE}/api/libros/eliminar/${codigo}`);
      alert('El libro fue borrado correctamente.');
      setIdLibroConfirmando(null); 
      obtenerLibros(); 
    } catch (error) {
      console.log('Error al eliminar', error);
      alert('No se pudo eliminar el libro.');
    } finally {
      setCargando(false);
    }
  };

  if (cargando) return (
    <View style={styles.contenedorCargando}>
      <ActivityIndicator size="small" color="#E67575" />
      <Text style={styles.textoCargando}>Cargando ...</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.contenedor}>
      <Text style={styles.titulo}>Gestión de Libros</Text>
      
      
      <TextInput
        style={styles.inputBusqueda}
        placeholder="🔍Buscar por título..."
        value={busqueda}
        onChangeText={setBusqueda}
      />
      
      <View style={styles.contenedorLista}>
        {librosFiltrados.map((libro) => {
          const estaConfirmando = idLibroConfirmando === libro.libro_codigo;

          return (
            <View key={libro.libro_codigo} style={styles.tarjetaLibro}>
              
              <View style={styles.infoLibro}>
                <Text style={styles.tarjetaTitulo}>{libro.libro_titulo}</Text>
                <Text style={styles.tarjetaSub}>Autor: {libro.libro_autor}</Text>
                <Text style={styles.tarjetaSub}>Genero: {libro.libro_genero}</Text>
                <Text style={styles.tarjetaSub}>Estado: {libro.libro_estado}</Text>
                <Text style={styles.tarjetaSub}>Formato: {libro.libro_formato}</Text>
                <Text style={styles.tarjetaSub}>Calificacion: {libro.libro_calificacion !== null ? libro.libro_calificacion : "-"}</Text>
                <Text style={styles.tarjetaSub}>Libro Adquirido: {libro.libro_adquirido !== false ? "Si" : "No"} </Text>  
              </View>

              
              {estaConfirmando ? (
                <View style={styles.contenedorConfirmacion}>
                  <Text style={styles.textoPregunta}>¿Borrar?</Text>
                  <View style={styles.contenedorBotonesTarjeta}>
                    <TouchableOpacity 
                      style={styles.botonSi} 
                      onPress={() => ejecutarBorrado(libro.libro_codigo)}
                    >
                      <Text style={styles.textoBotonChico}>Sí</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                      style={styles.botonNo} 
                      onPress={() => setIdLibroConfirmando(null)}
                    >
                      <Text style={styles.textoBotonChico}>No</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View style={styles.contenedorBotonesTarjeta}>
                  
                  <TouchableOpacity style={styles.botonEditar} onPress={() => navigation.navigate('Edicion', { libro })}>
                    <Text style={styles.textoBotonChico}>Editar</Text>
                  </TouchableOpacity>

                  
                  <TouchableOpacity style={styles.botonEliminar} onPress={() => setIdLibroConfirmando(libro.libro_codigo)}>
                    <Text style={styles.textoBotonChico}>Borrar</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          );
        })}
      </View>

      <View style={styles.contenedorBotonVolver}>
        <TouchableOpacity style={styles.botonVolver} onPress={() => navigation.navigate("Home")}>
          <Text style={styles.botonTexto}>Volver a Home</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contenedor: { 
    padding: 14,
    backgroundColor: '#78F5D7',
    flexGrow: 1 
  },
  contenedorCargando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#78F5D7' 
  },
  textoCargando: {
    marginTop: 10,
    fontWeight: 'bold',
    color: '#1f2937'
  },
  titulo: { 
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1f2937' 
  },
  inputBusqueda: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#363232',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15
  },
  contenedorLista: {
    marginBottom: 20
  },
  tarjetaLibro: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#363232',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLibro:{
    flex: 1 
  },
  tarjetaTitulo: {
    fontWeight:'bold',
    color: '#1f2937',
    fontSize: 16
  },
  tarjetaSub: {
    fontSize: 12,
    color: '#555',
    marginTop: 2
  },
  contenedorBotonesTarjeta: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center'
  },
  contenedorConfirmacion: {
    alignItems: 'center',
    gap: 4
  },
  textoPregunta: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#E67575'
  },
  botonEditar: {
    backgroundColor: '#E67575',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6
  },
  botonEliminar: {
    backgroundColor: '#363232',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6
  },
  botonSi: {
    backgroundColor: '#E67575',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 6
  },
  botonNo: {
    backgroundColor: '#6b7280',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 6
  },
  textoBotonChico: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12
  },
  botonVolver: { 
    backgroundColor: '#363232',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    marginTop: 20,
    width: '75%'
  },
  contenedorBotonVolver: { 
    alignItems: 'center'
  },
  botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
});

export default BuscarEditarLibro;