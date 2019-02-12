import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { categories } from '../../utilities/tips';

const TipIcons = (props) => {
    const getIconNames = (category) => {
        let res = [];
        switch(category){
            case categories.general:
                res = ["ios-cash", "ios-wallet"];
            break;
            case categories.food:
                res = ["ios-pizza", "ios-beer"];
            break;
            case categories.groceries:
                res = ["ios-clipboard", "ios-pricetag"];
            break;
            case categories.health:
                res = ["ios-heart", "ios-medkit"];
            break;
            case categories.finance:
                res = ["ios-card", "ios-calculator"];
            break;
            case categories.shopping:
                res = ["ios-cart", "ios-pricetags"];
            break;
            case categories.transport:
                res = ["ios-car", "ios-bicycle"];
            break;
            case categories.travel:
                res = ["ios-airplane", "ios-globe"];
            break;
            case categories.utilities:
                res = ["ios-hammer", "ios-build"];
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