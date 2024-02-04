import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const SignupScreen = ({ navigation }) => {
  const [UPI_id, setUPI_id] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [initialBalance, setInitialBalance] = useState('');

  const handleSignup = async () => {
    try {
      if (password === verifyPassword) {
        const response = await fetch('http://172.20.10.3:3000/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ UPI_id, password, initialBalance }),
        });
  
        if (response.ok) {
          console.log('Signup successful');
          setUPI_id('');
          setPassword('');
          setVerifyPassword('');
          setInitialBalance('');
          navigation.navigate('AuthOptions');
        } else {
          const errorData = await response.json();
          Alert.alert('Error', errorData.error, [{ text: 'OK' }]);
        }
      } else {
        Alert.alert('Error', 'Passwords do not match', [{ text: 'OK' }]);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An unexpected error occurred', [{ text: 'OK' }]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.instructionsText}>Signup</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter UPI ID"
        value={UPI_id}
        onChangeText={(text) => setUPI_id(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Verify password"
        secureTextEntry
        value={verifyPassword}
        onChangeText={(text) => setVerifyPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter initial balance"
        keyboardType="numeric"
        value={initialBalance}
        onChangeText={(text) => setInitialBalance(text)}
      />
      <Button title="Signup" onPress={handleSignup} />
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

export default SignupScreen;
