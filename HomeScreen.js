// HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const handleQRFraudClick = () => {
    navigation.navigate('AuthOptions');
  };
  return (
    <ImageBackground
    source={require('./img4.jpg')}
    style={styles.background}
  >
    <View style={styles.container}>
      <Text style={styles.boldBlueText} onPress={handleQRFraudClick}>
        QRFraud
      </Text>
      <Text style={styles.instructionsText}>
        Click on QRFraud to continue
      </Text>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' for different cover options
  },
  container: {
    flex: 1,
    
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  boldBlueText: {
    fontWeight: 'bold',
    color: 'red',
    fontSize: 48,
  },
  instructionsText: {
    color: 'white',
    fontSize: 20,
    marginBottom: 10,
  },
});

export default HomeScreen