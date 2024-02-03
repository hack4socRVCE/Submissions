// AuthOptionsScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AuthOptionsScreen = ({ navigation }) => {
  const handleSignupClick = () => {
    navigation.navigate('Signup');
  };

  const handleLoginClick = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.instructionsText}>Are you a new user?</Text>
      <TouchableOpacity onPress={handleSignupClick}>
        <Text style={styles.boldText}>Signup</Text>
      </TouchableOpacity>

      <Text style={styles.instructionsText}>Do you already have an account?</Text>
      <TouchableOpacity onPress={handleLoginClick}>
        <Text style={styles.boldText}>Login</Text>
      </TouchableOpacity>
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
  boldText: {
    color: 'red',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default AuthOptionsScreen;
