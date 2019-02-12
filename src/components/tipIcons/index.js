import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { categories } from '../../utilities/tips';

const TipIcons = (props) => {
    const getIconNames = (category) => {
        let res = [];
        switch(category){
            case categories.general:
                res = ["cash", "wallet"];
            break;
            case categories.food:
                res = ["pizza", "beer"];
            break;
            case categories.groceries:
                res = ["clipboard", "pricetag"];
            break;
            case categories.health:
                res = ["heart", "medkit"];
            break;
            case categories.finance:
                res = ["card", "calculator"];
            break;
            case categories.shopping:
                res = ["cart", "pricetags"];
            break;
            case categories.transport:
                res = ["car", "bicycle"];
            break;
            case categories.travel:
                res = ["airplane", "globe"];
            break;
            case categories.utilities:
                res = ["hammer", "build"];
            break;
        }
        return res;
    }
    let iconNames = getIconNames(props.category);
    return(
        <View style={styles.container}>
            <Icon name={iconNames[0]} color={'black'} size={24}/> 
            <Icon name={iconNames[1]} color={'black'} size={24}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    }
})

export default TipIcons;