import React, { Component } from 'react';
import { View, Button, Text } from 'react-native';
import { connect } from 'react-redux';
import commonStyles from '../../utilities/common-styles';
import MWIDropdown from '../../components/mwi-dropdown';
import MWITextInput from '../../components/mwi-text-input';
import { currencyNames, isACurrencyName, convertCurrency, getCurrencyFromName } from '../../logic/currencies';
import { placeholders, Colors, SCREEN_WIDTH, to2Dp } from '../../utilities';

class Converter extends Component {
  constructor(props) {
    super(props);
    this.state = {
        baseCurrencyName: '',
        destCurrencyName: '',
        baseAmount: '',
        destAmount: '',
        baseBorderColor: 'gray',
        destBorderColor: 'gray'
    };
  }

  convert = () => {
    const { baseCurrencyName, destCurrencyName, baseAmount } = this.state;
    this.setState({baseBorderColor: isACurrencyName(baseCurrencyName) ? 'gray' : Colors.red});
    this.setState({destBorderColor: isACurrencyName(destCurrencyName) ? 'gray' : Colors.red});
    let baseCur = getCurrencyFromName(baseCurrencyName);
    let destCur = getCurrencyFromName(destCurrencyName);
    if(baseCur && destCur){
      this.setState({destAmount: to2Dp(convertCurrency(parseFloat(baseAmount), baseCur.rate, destCur.rate)).toString()});
    }
  }

  render() {
    const { baseCurrencyName, destCurrencyName, baseAmount, destAmount, baseBorderColor, destBorderColor } = this.state;
    return (
      <View style={[commonStyles.container, {justifyContent: 'center'}]}>
        <View style={commonStyles.space}>
            <MWIDropdown
              query={baseCurrencyName}
              setQuery={(baseCurrencyName) => this.setState({baseCurrencyName})} 
              data={currencyNames}
              fullData={currencyNames}
              message="From"
              borderColor={baseBorderColor}
              isOpen={false}
            />
        </View>
        <View style={commonStyles.space}>
            <MWITextInput 
              message="Base Amount"
              placeholder={placeholders.amount}
              value={baseAmount}
              onChange={baseAmount => this.setState({baseAmount})}
              getRef={base => { this.baseAmountInput = base }}
              width={SCREEN_WIDTH - 20}
              alignSelf="center"
              keyboardType="decimal-pad"
              maxLength={12}
            />
        </View>
        <View style={commonStyles.space}>
            <MWIDropdown
              query={destCurrencyName}
              setQuery={(destCurrencyName) => this.setState({destCurrencyName})} 
              data={currencyNames}
              fullData={currencyNames}
              message="To"
              borderColor={destBorderColor}
              isOpen={false}
            />
        </View>
        <View style={commonStyles.space}>
            <MWITextInput 
              message="Converted Amount"
              value={destAmount}
              onChange={() => {}}
              getRef={() => {}}
              width={SCREEN_WIDTH - 20}
              alignSelf="center"
              editable={false}
              noClear={true}
            />
        </View>
        <View style={[commonStyles.space, {alignItems: 'flex-end'}]}>
          <Text style={commonStyles.detailDescription}>{`Conversion through USD valid from ${(new Date).toDateString()}`}</Text>
        </View>
        <View style={[styles.space, { alignItems: 'flex-end', marginRight: 10}]}>
          <View style={{borderRadius: 10}}>
            <Button
              title="Convert"
              onPress={this.convert}
              color={Colors.main}
            />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({currencies}) => ({
    currencies
});

export default connect(mapStateToProps)(Converter);