import React from 'react';
import { Picker } from 'react-native';
import { PickerProps } from './Picker.ios';

const MyPicker = (props: PickerProps) => {
    return (
        <Picker
            style={props.style}
            selectedValue={props.value}
            onValueChange={val => props.onChange && props.onChange(val)}
        >
            {props.data.map(i => (
                <Picker.Item label={i} value={i} />
            ))}
        </Picker>
    );
};

export default MyPicker;
