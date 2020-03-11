import React from 'react';
import { View, StyleSheet } from 'react-native';

const BottomBar = ({ children }: { children: React.ReactNode }) => {
    return <View style={styles.bottomBar}>{children}</View>;
};

const styles = StyleSheet.create({
    bottomBar: {
        height: 72,
        width: '100%',
        borderRadius: 76,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        justifyContent: 'space-between',
    },
});

export default BottomBar;
