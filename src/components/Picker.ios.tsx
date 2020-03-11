import React from 'react';
import { View, Text, ViewStyle, StyleSheet, TouchableOpacity, ActionSheetIOS } from 'react-native';
import Arrow from '../assets/Vectorarrow.svg';
export type PickerProps = {
    style?: ViewStyle;
    data: string[];
    value?: string;
    onChange?: (v: string) => void;
};

const MyPicker = (props: PickerProps) => {
    const { data, value, onChange } = props;

    const handlePress = () => {
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: ['Cancel', ...data],
                cancelButtonIndex: 0,
            },
            buttonIndex => {
                if (buttonIndex !== 0 && onChange) {
                    onChange(data[buttonIndex - 1]);
                }
            }
        );
    };

    return (
        <TouchableOpacity style={props.style} onPress={handlePress}>
            <View style={styles.valueBlock}>
                <Text style={styles.text}>{value}</Text>
                <Arrow />
            </View>
            <View style={styles.border} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    valueBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    text: {
        color: '#505B76',
        fontSize: 16,
    },
    border: {
        width: '100%',
        height: 2,
        backgroundColor: '#F1F4F8',
    },
});

export default MyPicker;
