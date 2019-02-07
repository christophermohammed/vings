import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class Offline extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Icon 
                    
                />
                <Text>Offline</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  });

export default Offline;