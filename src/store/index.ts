import { observable, action } from 'mobx';
import { Alert, AsyncStorage } from 'react-native';
import { createContext } from 'react';

export interface Countries {
    ISO: string;
    _id: string;
    preferredCurrency: PreferredCurrency;
    translations: Translations;
}
export interface Currency {
    _id: string;
    translations: Translations;
}
export interface PreferredCurrency {
    id: string;
    name: string;
}
export interface Translations {
    en: string;
}

export class Store {
    @observable currencyList: Currency[] = [];
    @observable countryList: Countries[] = [];
    @observable loading: boolean = false;
    @observable selectedCountry: string = '';
    @observable selectedCurrency: string = '';

    constructor() {
        this.fetchData();
    }

    private async fetchData() {
        this.loading = true;
        await this.fetchCountries();
        await this.fetchCurrency();
        await this.getSavedData();
        this.loading = false;
    }

    @action.bound
    public async setCountry(v: string) {
        this.selectedCountry = v;
        await this.setCountryToStorage();
        const country: Countries | undefined = this.countryList.find(i => i.translations.en === v);
        if (country) {
            this.selectedCurrency = country.preferredCurrency.name;
            await this.setCurrencyToStorage();
        }
    }
    @action.bound
    public async setCurrency(v: string) {
        this.selectedCurrency = v;
        await this.setCurrencyToStorage();
    }

    private async setCountryToStorage() {
        await AsyncStorage.setItem('country', this.selectedCountry);
    }
    private async setCurrencyToStorage() {
        await AsyncStorage.setItem('currency', this.selectedCurrency);
    }

    @action.bound
    private async getSavedData() {
        const country = await AsyncStorage.getItem('country');
        const currency = await AsyncStorage.getItem('currency');
        currency ? (this.selectedCurrency = currency) : (this.selectedCurrency = this.currencyList[0].translations.en);
        country ? (this.selectedCountry = country) : (this.selectedCountry = this.countryList[0].translations.en);
    }

    @action
    private async fetchCountries() {
        try {
            const countriesResult = await fetch('https://api.raino.app/countries', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            if (countriesResult.status !== 200) {
                throw Error(countriesResult.status.toString());
            }
            const data = await countriesResult.json();
            this.countryList = data.items;
        } catch {
            Alert.alert('Oops something when wrong!');
        }
    }
    @action
    private async fetchCurrency() {
        try {
            const currencyResult = await fetch('https://api.raino.app/currencies', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            if (currencyResult.status !== 200) {
                throw Error(currencyResult.status.toString());
            }
            const data = await currencyResult.json();

            this.currencyList = data.items;
        } catch {
            Alert.alert('Oops something when wrong!');
        }
    }
}

export default createContext(new Store());
