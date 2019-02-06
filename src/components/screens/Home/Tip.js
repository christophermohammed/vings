import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Tip extends Component {
    render() {
        return (
            <View style={styles.tipContainer}>
                <View style={[styles.section, {alignItems: 'flex-start', marginLeft: 10}]}>
                    <Text>Title</Text>
                </View>
                <View style={[styles.section, {alignItems: 'center'}]}>
                    <Text>Body</Text>
                </View>
                <View style={[styles.section, {alignItems: 'flex-end', marginRight: 10}]}>
                    <Text>Footer</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tipContainer: {

    },
    section: {
        paddingTop: 5,
    }
})

export default Tip;