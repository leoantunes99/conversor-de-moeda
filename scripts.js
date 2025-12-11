const convertButton = document.querySelector(".convert-button")
const currencySelectToConvert = document.querySelector(".currency-select-to-convert")
const currencySelectConverted = document.querySelector(".currency-select-converted")

const mainElement = document.querySelector("main")

window.addEventListener("load", () => {
    mainElement.classList.remove("initial-state")
    getExchangeRatesAndConvert() 
})

const currencies = {
    real: {
        name: "Real Brasileiro",
        image: "./assets/real.png",
        format: { locale: "pt-BR", currency: "BRL" },
        rate: 1,
    },
    dolar: {
        name: "Dólar Americano",
        image: "./assets/dolar.png",
        format: { locale: "en-US", currency: "USD" },
        rate: 0,
    },
    euro: {
        name: "Euro",
        image: "./assets/euro.png",
        format: { locale: "de-DE", currency: "EUR" },
        rate: 0,
    },
    libra: {
        name: "Libra",
        image: "./assets/libra.png",
        format: { locale: "en-GB", currency: "GBP" },
        rate: 0,
    },
    bitcoin: {
        name: "Bitcoin",
        image: "./assets/bitcoin.png",
        format: { locale: "en-US", currency: "BTC" },
        rate: 0,
    }
}

async function getExchangeRatesAndConvert() {
    try {
        const response = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL')
        const data = await response.json()
        
        const usdToBrl = parseFloat(data.USDBRL.ask)
        const eurToBrl = parseFloat(data.EURBRL.ask)
        const btcToBrl = parseFloat(data.BTCBRL.ask)

        currencies.dolar.rate = 1 / usdToBrl
        currencies.euro.rate = 1 / eurToBrl
        currencies.bitcoin.rate = 1 / btcToBrl

        const eurToGbp = 0.85;
        currencies.libra.rate = currencies.euro.rate / eurToGbp;
        
        convertValuesConverted()

    } catch (error) {
        console.error("Erro ao buscar as taxas de câmbio:", error)
        alert("Não foi possível carregar as taxas de câmbio. Usando taxas desatualizadas.")
    }
}

function convertValuesConverted() {
    const inputCurrencyValue = parseFloat(document.querySelector(".input-currency").value) || 0
    const currencyValueToConvert = document.querySelector(".currency-value-to-convert")
    const currencyValueConverted = document.querySelector(".currency-value-converted")

    const from = currencies[currencySelectToConvert.value]
    const to = currencies[currencySelectConverted.value]

    const valueInReal = inputCurrencyValue / from.rate
    const finalValue = valueInReal * to.rate 

    if (currencySelectToConvert.value === "bitcoin") {
        currencyValueToConvert.innerHTML = inputCurrencyValue.toFixed(6) + " BTC"
    } else {
        currencyValueToConvert.innerHTML = new Intl.NumberFormat(from.format.locale, {
            style: "currency",
            currency: from.format.currency
        }).format(inputCurrencyValue)
    }

    if (currencySelectConverted.value === "bitcoin") {
        currencyValueConverted.innerHTML = finalValue.toFixed(6) + " BTC"
    } else {
        currencyValueConverted.innerHTML = new Intl.NumberFormat(to.format.locale, {
            style: "currency",
            currency: to.format.currency
        }).format(finalValue)
    }
}

function changeCurrencyConverted() {
    const currencyName = document.getElementById("currency-name")
    const currencyImage = document.querySelector(".currency-img")
    const to = currencies[currencySelectConverted.value]

    currencyName.innerHTML = to.name
    currencyImage.src = to.image

    convertValuesConverted()
}

function changeCurrencyToConvert() {
    const currencyNameToConvert = document.querySelector("section .currency-box .currency")
    const currencyImage = document.querySelector("section .currency-box img")
    const from = currencies[currencySelectToConvert.value]

    currencyNameToConvert.innerHTML = from.name
    currencyImage.src = from.image

    convertValuesConverted()
}

currencySelectToConvert.addEventListener("change", changeCurrencyToConvert)
currencySelectConverted.addEventListener("change", changeCurrencyConverted)
convertButton.addEventListener("click", convertValuesConverted)