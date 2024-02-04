// EnterUPIScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const EnterUPIScreen = () => {
  const [upiID, setUPIID] = useState('');

  const handleSaveUPIID = () => {
    // You can add your logic here to save or process the entered UPI ID
    console.log('UPI ID entered:', upiID);
    // For now, let's just clear the input field
    setUPIID('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.instructionsText}>Enter UPI ID:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter UPI ID"
        value={upiID}
        onChangeText={(text) => setUPIID(text)}
      />
      <Button title="Save UPI ID" onPress={handleSaveUPIID} />
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

export default EnterUPIScreen;
