import React, { useContext } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import BottomBar from './Bottom-bar';
import Plus from '../assets/Vectorplus.svg';
import Person from '../assets/Vectorperson.svg';
import Attach from '../assets/Vectorattach.svg';
import Clock from '../assets/clock.svg';
import Mic from '../assets/Micmic.svg';
import Logo from '../assets/Rainologo.svg';
import Delete from '../assets/delete.svg';
import { observer } from 'mobx-react';
import Store, { Countries, Currency } from '../store';
//@ts-ignore
import MyPicker from './Picker';

const Main = observer(() => {
    const icons = [
        { icon: <Plus /> },
        { icon: <Person /> },
        { icon: <Attach /> },
        { icon: <Clock /> },
        { icon: <Mic /> },
    ];
    const {
        loading,
        countryList,
        currencyList,
        selectedCountry,
        selectedCurrency,
        setCountry,
        setCurrency,
    } = useContext(Store);

    if (loading) {
        return (
            <View style={[styles.wrapper, { justifyContent: 'center' }]}>
                <ActivityIndicator />
            </View>
        );
    }
    return (
        <View style={styles.wrapper}>
            <View style={styles.currencyTop}>
                <Delete />
            </View>
            <View style={styles.currency}>
                <MyPicker
                    value={selectedCountry}
                    onChange={setCountry}
                    data={countryList.map((i: Countries) => i.translations.en)}
                    style={{ width: 132 }}
                />
                <MyPicker
                    value={selectedCurrency}
                    onChange={setCurrency}
                    data={currencyList.map((i: Currency) => i.translations.en)}
                    style={{ width: 132 }}
                />
            </View>
            <BottomBar>
                <View style={styles.row}>
                    {icons.map((i, index) => (
                        <View key={index} style={styles.iconWrapper}>
                            {i.icon}
                        </View>
                    ))}
                </View>
                <Logo />
            </BottomBar>
        </View>
    );
});

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#F6F7F8',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 16,
    },
    row: { flexDirection: 'row' },
    dropDown: { width: 132 },
    currency: {
        paddingTop: 16,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 162,
        backgroundColor: 'white',
        borderRadius: 16,
        width: '100%',
        marginBottom: 16,
    },
    currencyTop: {
        height: 70,
        width: 72,
        backgroundColor: 'white',
        borderRadius: 50,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 255,
        left: '50%',
        marginLeft: -20,
    },
    iconWrapper: {
        borderRadius: 50,
        backgroundColor: '#E7F8FA',
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 8,
    },
});

export default Main;
