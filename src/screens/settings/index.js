import React, { Component } from 'react';
import { View, StatusBar, ScrollView, Button } from 'react-native';
import { connect } from 'react-redux';
import { currencies } from '../../data/utils';
import { updateCurrency } from '../../state/user/actions';
import MWIPicker from '../../components/mwi-picker';
import styles from '../../utilities/common-styles';
import { Colors } from '../../utilities/utils';

class Settings extends Component {
    constructor(props){
      super(props);

      this.state = {
        currency: '$',
      }
    }

    render() {
      const { updateCurrency } = this.props;
      const { currency } = this.state;
      return (
        <ScrollView>
          <View>
              <StatusBar
                backgroundColor="white"
                barStyle="dark-content"
              />
              <View style={styles.space}>
                <MWIPicker 
                  items={currencies}
                  selectedValue={currency}
                  onChange={(currency) => this.setState({currency})}
                  message="What's your preferred currency?"
                />
              </View>
              <View style={styles.space}>
                <Button
                  title="Save"
                  onPress={() => updateCurrency(this.state.currency)}
                  color={Colors.main}
                />
              </View>
          </View>
        </ScrollView>
      );
    }
}

const mapStateToProps = ({user}) => ({
  user
});

const mapDispatchToProps = {
  updateCurrency 
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);