import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from '../../utilities/common-styles';
import { getCurrencyFromName } from '../../logic/currencies';

const Profile = (props) => {
    const { user, currencyName } = props;
    let currency = getCurrencyFromName(currencyName);
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.welcome}>Profile</Text>
            </View>
            <View style={[{marginTop: 0}, profileStyles.row]}>
                <Text style={styles.question}>Age:</Text>
                <Text style={styles.question}>{user.age}</Text>
            </View>
            <View style={profileStyles.row}>
                <Text style={styles.question}>Gender:</Text>
                <Text style={styles.question}>{user.gender}</Text>
            </View>
            <View style={profileStyles.row}>
                <Text style={styles.question}>Currency:</Text>
                <Text style={styles.question}>{currency && currency.code}</Text>
            </View>
        </View>
    );
}

const profileStyles = StyleSheet.create({
    row: {
        flexDirection: "row", 
        justifyContent: 'space-between',
        marginTop: 5
    }
});

export default Profile;