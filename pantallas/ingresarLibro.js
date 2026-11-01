import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const URL_BASE = 'https://final-dam.vercel.app'

const IngresarLibro = ({ navigation }) => {
  const [libro_titulo, setLibroTitulo] = useState('');
  const [libro_autor, setLibroAutor] = useState('');
  const [libro_genero, setLibroGenero] = useState('');
  const [libro_estado, setLibroEstado] = useState('');
  const [libro_formato, setLibroFormato] = useState('');
  const [libro_calificacion, setLibroCalificacion] = useState('');
  const [libro_adquirido, setLibroAdquirido] = useState('');
  
  const [cargando, setCargando] = useState(false);
  
  const guardarLibro = async () => {
    
    if (!libro_titulo.trim() || !libro_autor.trim() || !libro_genero || !libro_estado || !libro_formato || libro_adquirido === '') {
      alert('Por favor, no olvide completar los campos. El campo Calificación no es obligatorio, el resto sí.');
      return;
    }

    try {
      setCargando(true);
      
        await axios.post(`${URL_BASE}/api/libros/crear`, {
        libro_titulo: libro_titulo.trim(),
        libro_autor: libro_autor.trim(),
        libro_genero,
        libro_estado,
        libro_formato,
        libro_calificacion: libro_calificacion !== '' ? parseInt(libro_calificacion) : null,
        libro_adquirido,
      });

      
      alert('Se ha guardado el libro correctamente.');

    } catch (error) {
      console.log('Error al conectar contra el server', error);
      alert('Error de conexión para guardar libro. Intente nuevamente luego, por favor.');
    } finally {
      setLibroTitulo('');
      setLibroAutor('');
      setLibroGenero('');
      setLibroEstado('');
      setLibroFormato('');
      setLibroCalificacion('');
      setLibroAdquirido('');
      setCargando(false);
    }
  };

  if (cargando) return (
    <View style={styles.contenedorCargando}>
      <ActivityIndicator size="small" color="#E67575" />
      <Text style={styles.textoCargando}>Guardando libro...</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.contenedor}>
      <Text style={styles.titulo}>Ingresar Nuevo Libro</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Título del libro"
        value={libro_titulo}
        onChangeText={setLibroTitulo}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Autor"
        value={libro_autor}
        onChangeText={setLibroAutor}
      />

      
      <View style={styles.pickerContenedor}>
        <Text style={styles.pickerTexto}>Género:</Text>
        <Picker 
          selectedValue={libro_genero}
          onValueChange={(valor) => setLibroGenero(valor)}
        >
          <Picker.Item label="Elegí género..." value="" />
          <Picker.Item label="Historia" value="Historia" />
          <Picker.Item label="Novela" value="Novela" />
          <Picker.Item label="Crimen" value="Crimen" />
          <Picker.Item label="Aventura" value="Aventura" />
          <Picker.Item label="Política" value="Política" />
          <Picker.Item label="Otro" value="Otro" />
        </Picker>
      </View>

      
      <View style={styles.pickerContenedor}>
        <Text style={styles.pickerTexto}>Estado:</Text>
        <Picker 
          selectedValue={libro_estado}
          onValueChange={(valor) => setLibroEstado(valor)}
        >
          <Picker.Item label="Elegí estado..." value="" />
          <Picker.Item label="No leído" value="no_leido" />
          <Picker.Item label="Leído" value="leido" />
        </Picker>
      </View>

      
      <View style={styles.pickerContenedor}>
        <Text style={styles.pickerTexto}>Formato:</Text>
        <Picker 
          selectedValue={libro_formato}
          onValueChange={(valor) => setLibroFormato(valor)}
        >
          <Picker.Item label="Elegí formato..." value="" />
          <Picker.Item label="Físico" value="fisico" />
          <Picker.Item label="Digital" value="digital" />
        </Picker>
      </View>

      
      <View style={styles.pickerContenedor}>
        <Text style={styles.pickerTexto}>Calificación:</Text>
        <Picker 
          selectedValue={libro_calificacion}
          onValueChange={(valor) => setLibroCalificacion(valor)}
        >
          <Picker.Item label="Elegí calificación..." value="" />
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5" value="5" />
        </Picker>
      </View>

      <Text style={styles.aclaracion}>
        * Si no desea cargar calificación no ingrese ninguna opción.
      </Text>

      
      <View style={styles.pickerContenedor}>
        <Text style={styles.pickerTexto}>¿Adquirido?:</Text>
        <Picker 
          selectedValue={libro_adquirido}
          onValueChange={(valor) => setLibroAdquirido(valor)}
        >
          <Picker.Item label="Elegí si fue o no adquirido..." value="" />
          <Picker.Item label="Sí" value={true} />
          <Picker.Item label="No" value={false} />
        </Picker>
      </View>
      
      <TouchableOpacity style={styles.boton} onPress={guardarLibro}>
        <Text style={styles.botonTexto}>Guardar Libro</Text>
      </TouchableOpacity>
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
    padding: 24, 
    backgroundColor: '#78F5D7',
    flexGrow: 1,
    justifyContent: 'center'
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
  pickerTexto: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#1f2937',
    marginLeft: 4
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#E67575',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  pickerContenedor: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#E67575',
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 8,
    paddingVertical: 4
  },
  boton: { 
    backgroundColor: '#E67575', 
    padding: 14, 
    borderRadius: 8, 
    alignItems: 'center',
    borderWidth: 2,
    marginTop: 12
  },
  botonTexto: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16 
  }, 

  botonVolver: {

    backgroundColor: '#363232', 
    padding: 14, 
    borderRadius: 8, 
    alignItems: 'center',
    borderWidth: 2,
    marginTop: 50,
    width: '75%'
  },
  contenedorBotonVolver: {
    alignItems: 'center'

  },

  aclaracion: {

    fontSize: 12,
    fontStyle: 'italic',
    color: '#363232',
    marginTop: -10,
    marginBottom: 10,
    marginLeft: 10,
  },
});

export default IngresarLibro;