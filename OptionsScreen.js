// OptionsScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const OptionsScreen = ({ navigation }) => {
  //----------------------------------------------------------(balance)
  const [accountBalance, setAccountBalance] = useState(0);

  // Fetch user information including balance when the component mounts
  useEffect(() => {
    const fetchUserInformation = async () => {
      try {
        // Make a request to your server to fetch user information
        const response = await fetch('http://172.20.10.3:3000/getUserInfo', {
          method: 'GET',
          headers: {
            // Include any necessary headers, such as authentication tokens
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setAccountBalance(userData.balance);
        } else {
          console.error('Failed to fetch user information');
        }
      } catch (error) {
        console.error('An unexpected error occurred', error);
      }
    };

    fetchUserInformation();
  }, []); // Empty dependency array ensures the effect runs once on component mount

  //-----------------------------------------------------------
  const handleEnterUPIClick = () => {
    navigation.navigate('EnterUPI');
  };

  const handleReportClick = () => {
    navigation.navigate('Report');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.accountBalance}>Account Balance: {accountBalance}</Text>
      <View style={styles.optionsContainer}>
        <Text style={styles.optionsText}>Scan QR</Text>
        <TouchableOpacity onPress={handleEnterUPIClick}>
          <Text style={styles.optionsText}>Enter UPI ID</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleReportClick}>
          <Text style={styles.optionsText}>Report</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.transactionHistory}>Transaction History</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADD8E6',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  optionsContainer: {
    marginTop: 230, // Adjust this value to set the vertical position of the options
    alignItems: 'center',
  },
  optionsText: {
    color: 'red',
    fontSize: 30,
    marginBottom: 10,
  },
  accountBalance: {
    alignSelf: 'flex-end',
    marginRight: 10,
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  transactionHistory: {
    position: 'absolute',
    bottom: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default OptionsScreen;
