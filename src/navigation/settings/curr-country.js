import React from 'react';
import { connect } from 'react-redux';
import CurrCountry from '../../screens/curr-country';

const CurrCountryContainer = (props) => {
  const { user, navigation } = props;
  return (
    <CurrCountry user={user} goBack={() => navigation.navigate('Settings')}/>
  );
}

const mapStateToProps = ({user}) => ({
  user
});

export default connect(mapStateToProps)(CurrCountryContainer);