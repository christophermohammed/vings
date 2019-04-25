import React, { Component } from 'react';
import { View } from 'react-native';
import Swipeout from 'react-native-swipeout';
import TransactionCard from './';
// import { AdMobBanner } from 'expo';

class SwipeableCard extends Component {
    constructor(props){
        super(props);

        this.state = {
            activeRowKey: null
        };
    }

    render(){
        const { item, index, removeFromNetSav, removeTransaction } = this.props;
        let amt = item.amount;
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
                        removeFromNetSav(amt, item.currency);
                        removeTransaction(rowKey);
                    },
                    text: 'Delete', type: 'delete'
                }
            ],
            rowId: index,
            sectionId: 1,
        }
        return(
            <View>
                <Swipeout {...swipeSettings}>
                    <TransactionCard 
                        item={item}
                    />
                </Swipeout>
                {/* {(index + 1) % 5 === 0 &&
                    <AdMobBanner
                        bannerSize="smartBannerPortrait"
                        adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
                        testDeviceID="EMULATOR"
                        onDidFailToReceiveAdWithError={() => {}} 
                    />
                } */}
            </View>
        );
    }
} 
  
export default SwipeableCard;