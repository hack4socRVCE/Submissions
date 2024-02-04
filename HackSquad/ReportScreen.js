// ReportScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const ReportScreen = () => {
  const [reportedUPIID, setReportedUPIID] = useState('');
  const [report, setReport] = useState('');

  const handleSaveReport = () => {
    // You can add your logic here to save or process the report
    console.log('Reported UPI ID:', reportedUPIID);
    console.log('Report:', report);
    // For now, let's just clear the input fields
    setReportedUPIID('');
    setReport('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.instructionsText}>Report</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter UPI ID to report"
        value={reportedUPIID}
        onChangeText={(text) => setReportedUPIID(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter report details"
        value={report}
        onChangeText={(text) => setReport(text)}
      />
      <Button title="Save Report" onPress={handleSaveReport} />
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

export default ReportScreen;
