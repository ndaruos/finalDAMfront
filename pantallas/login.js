import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';
import axios from 'axios';

const Login = ({ navigation }) => {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [cargando, setCargando] = useState(false)

  const Logueo = async () => {
    
    if (!usuario || !clave) {
        alert('Por favor, ingrese usuario y clave para avanzar.');
      return;
    }

    try {

      setCargando(true)
      const res = await axios.post('https://final-dam.vercel.app/api/usuarios', {usuario,clave});
      
      if (res.data.length > 0) {
        navigation.navigate('Home');
      } else {
          alert('Ingreso erróneo');
      }

    } catch (error) {
        console.log("Error para conectar contra el server", error);
        alert('No se pudo conectar con el servidor.');
    }finally {

      setClave('')
      setUsuario('')
      setCargando(false)
    }
  };

  if (cargando) return (
    <View style={styles.contenedorCargando}>
      <ActivityIndicator size="small" color="#E67575" />
      <Text style={styles.textoCargando}>Validando datos ...</Text>
    </View>
  );

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>📚Acceso a Mi Biblioteca App📚</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Ingrese su usuario"
        value={usuario}
        onChangeText={setUsuario}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Ingrese su contraseña"
        value={clave}
        onChangeText={setClave}
        secureTextEntry
      />
      
      <TouchableOpacity style={styles.boton} onPress={Logueo}>
        <Text style={styles.botonTexto}>Ingresar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: 
  { 
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#78F5D7'
  },
  titulo: 
  { 
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center'
  },
  input: 
  {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#E67575',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  boton: 
  { 
    backgroundColor: '#E67575',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
  },
  botonTexto: 
  { 
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16 
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

});

export default Login;