import React, {Component} from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    FlatList,
    TouchableOpacity
} from 'react-native';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../utilities';
import styles from '../../utilities/common-styles';

class MWIDropdown extends Component {
    constructor(props){
        super(props);

        this.state = {
            data: props.data,
            fullData: props.fullData,
            isOpen: true,
            isListOpen: true
        }
    }

    handleSearch = (query) => {
        let formattedQuery = query.toLowerCase();
        let newData = _.filter(this.state.fullData, text => {
            let formattedText = text.toLowerCase();
            return formattedText.includes(formattedQuery);
        });
        this.setState({data: newData, isListOpen: true});
        this.props.setQuery(query);
    }

    toggleIsOpen = () => {
      this.setState((prevState) => {
        return{isOpen: !prevState.isOpen};
      });
    }

    render(){
        const {data, isOpen, isListOpen} = this.state;
        const { query } = this.props;
        return (
            <View>
                <TouchableOpacity 
                    style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5}}
                    onPress={this.toggleIsOpen}    
                >
                    <Text style={styles.question}>{this.props.message}</Text>
                    <Icon 
                      name={isOpen ? "ios-arrow-up" : "ios-arrow-down"}
                      size={30}
                      color={Colors.dark}
                    />
                </TouchableOpacity>
                {isOpen && 
                    <View>
                        <TextInput
                            style={styles.inputStyle} 
                            onChangeText={(text) => this.handleSearch(text)}  
                            value = {query}
                        />
                        {isListOpen && 
                            <View style={{height: 165, borderBottomWidth: 1}}>
                                <FlatList 
                                    data={data}
                                    keyExtractor={(_item, index) => (index).toString()}
                                    renderItem = {
                                        ({item, index})=>(
                                            <TouchableOpacity 
                                                onPress={() => {
                                                    this.setState({isListOpen: false});
                                                    this.props.setQuery(item);
                                                }}
                                                style={{justifyContent: 'center', alignItems: 'center', height: 30}}
                                            > 
                                                <Text style={{fontSize: 15}}>{item}</Text>
                                            </TouchableOpacity>
                                        )
                                    }
                                />
                            </View>
                        }
                    </View>
                }
            </View>
        );
    }
}

export default MWIDropdown;