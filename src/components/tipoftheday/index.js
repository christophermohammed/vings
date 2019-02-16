import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import { tips } from '../../data/tips';
import TipIcons from '../tipIcons';

const Tip = (props) => {
    const { index } = props;
    const tip = tips[index];
    return (
        <View style={styles.tipContainer}>
            <View style={[styles.section, styles.titleContainer]}>
                <Text style={styles.title}>{tip.title}</Text>
            </View>
            <View style={[styles.section, styles.bodyContainer]}>
                <Text style={styles.body}>{tip.body}</Text>
            </View>
            <View style={[styles.section, styles.authorContainer]}>
                <Text style={styles.author}>{(tip.author === undefined) ? "" : tip.author.name }</Text>
                <Text style={styles.author}>{(tip.author === undefined) ? "" : `, ${tip.author.year}` }</Text>
            </View>
            <View style={{paddingTop: 10}}>
                <TipIcons category={tip.category}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    tipContainer: {
        //backgroundColor: Colors.soft,
        borderRadius: 7.5
    },
    section: {
        paddingTop: 5,
    },
    bodyContainer: {
        alignItems: 'flex-start', 
        marginLeft: 10, 
        marginRight: 10
    },
    titleContainer: {
        alignItems: 'flex-start', 
        marginLeft: 10
    },
    authorContainer: {
        justifyContent: 'flex-end', 
        flexDirection: 'row',
        marginRight: 10, 
    },
    title: {
        fontWeight: "800",
        fontSize: 15
    },
    body: {
        fontWeight: "400",
    },
    author: {
        fontWeight: "600"
    }
})

export default Tip;