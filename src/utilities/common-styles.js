import { StyleSheet } from 'react-native';
import { Colors, SCREEN_HEIGHT, SCREEN_WIDTH } from '../utilities';

export default styles = StyleSheet.create({
    container: {
        flex: 0,
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    space: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10
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
    loading: {
      padding: 10
    },
    regRow: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
    },
    shadow: {
        shadowOpacity: 0.3,
        shadowRadius: 3,
        shadowOffset: {width: 1, height: 1},
    },
    homeCard: {
        flex: 0, 
        backgroundColor: 'white', 
        borderRadius: 10
    },
    modalBG: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
        height: SCREEN_HEIGHT, 
        width: SCREEN_WIDTH, 
        marginTop: SCREEN_HEIGHT / 9
    }
});