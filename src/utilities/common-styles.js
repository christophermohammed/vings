import { StyleSheet } from 'react-native';
import { Colors } from './index';

export default styles = StyleSheet.create({
    container: {
        flex: 0,
    },
    space: {
        padding: 10
    },
    button: {
        borderRadius: 5,
        backgroundColor: Colors.dark,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 18,
        color: Colors.light
    },
    facebookButton: {
        borderRadius: 5,
        backgroundColor: Colors.facebook,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    facebookButtonText: {
        fontSize: 18,
        color: 'white'
    },
    question: {
      fontSize: 18,
      fontWeight: '400'
    },
    inputStyle: {
      height: 40, 
      borderColor: 'gray', 
      borderWidth: 1,
      borderRadius: 10
    },
    detailTitle: {
        fontSize: 24,
        fontWeight: '600'
    },
    detailSubtitle: {
        fontSize: 18,
        fontWeight: '400'
    },
    detailWrapper: {
        marginTop: 5
    },
    detail: {
        fontSize: 15
    },
    detailDescription: {
        fontSize: 10
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 3,
        borderRightColor:   'white',
        borderTopColor:     'white',
        borderBottomColor:  'white',
        paddingRight: 10
    },
});