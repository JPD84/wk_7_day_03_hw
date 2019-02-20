import Vue from 'vue';

document.addEventListener('DOMContentLoaded', () => {
    new Vue({
        el: "#app",
        data: {
            currencies: [],
            currencyRates: [],
            selectedCurrencyIndex: "",
            Result: null,
            FromResult: null,
            AmountValue: null,
            FromAmountValue: null,
            FromCurrencyIndex: ""

        },
        mounted: function () {
            this.getCurrencies();
        },

        methods: {
            getCurrencies: function () {
                fetch("https://api.exchangeratesapi.io/latest")
                    .then(response => response.json())
                    .then(currencies => this.currencies = currencies.rates)
            },
            currencySelect: function () {
                this.selectedCurrency = this.currencies[this.selectedCurrencyIndex];
            },
            convert: function () {
                if (this.AmountValue > 0) {
                    let rate = this.currencies[this.selectedCurrencyIndex]
                    this.Result = (rate * this.AmountValue).toFixed(2)

                } else {
                    this.Result = "Please enter value greater than zero!"
                }

            },
            convertFromEuro: function () {
                if (this.FromAmountValue > 0) {
                    let rate = this.currencies[this.FromCurrencyIndex]
                    this.FromResult = (this.FromAmountValue / rate).toFixed(2)

                } else {
                    this.FromResult = "Please enter value greater than zero!"
                }
            }
        }
    })
})
