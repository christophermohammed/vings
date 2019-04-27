import React, { Component } from 'react';
import { View } from 'react-native';
import Swipeout from 'react-native-swipeout';
// import { AdMobBanner } from 'expo';

class SwipeableCard extends Component {
    constructor(props){
        super(props);

        this.state = {
            activeRowKey: null
        };
    }

    render(){
        const { item, index, remove, renderCard } = this.props;
        const swipeSettings = {
            autoClose: true,
            onClose: () => {
                this.setState({activeRowKey: null});
            },
            onOpen: () => {
                this.setState({activeRowKey: index});
            },
            right: [
                {
                    onPress: () => {
                        let rowKey = this.state.activeRowKey;
                        remove(item, rowKey);
                    },
                    text: 'Delete', type: 'delete'
                }
            ],
            rowId: index,
            sectionId: 1,
        }
        return(
            <View style={{backgroundColor: 'white'}}>
                <Swipeout {...swipeSettings}>
                    {renderCard(item)}
                </Swipeout>
            </View>
        );
    }
} 
  
export default SwipeableCard;