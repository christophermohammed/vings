import { Platform } from 'react-native';

export const placeholders = {
    description: (Platform.OS === 'ios') ? " Description" : "\tDescription",
    location: (Platform.OS === 'ios') ? " Location" : "\tLocation",
    age: (Platform.OS === 'ios') ? " Age" : "\tAge",
}

export const transactionType = {
    cost: "Cost",
    savings: "Savings",
}