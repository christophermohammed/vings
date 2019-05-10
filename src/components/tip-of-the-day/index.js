import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { tips } from '../../data/tips';
import TipIcons from '../tip-icons';

const Tip = (props) => {
    const { tip } = props;
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
        fontSize: 15,
        color: 'white'
    },
    body: {
        fontWeight: "400",
        color: 'white'
    },
    author: {
        fontWeight: "600",
        color: 'white'
    }
})

export default Tip;