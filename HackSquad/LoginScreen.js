// LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://172.20.10.3:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        console.log('Login successful');
        // You can perform additional actions upon successful login
        navigation.navigate('Options'); // Navigate to the home screen or any other screen
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.error, [{ text: 'OK' }]);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An unexpected error occurred', [{ text: 'OK' }]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.instructionsText}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter UPI ID"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADD8E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructionsText: {
    color: 'white',
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'white',
    borderWidth: 1,
    color: 'white',
    marginBottom: 20,
    paddingLeft: 10,
  },
});

export default LoginScreen