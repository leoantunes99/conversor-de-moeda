const convertButton = document.querySelector(".convert-button")
const currencySelectToConvert = document.querySelector(".currency-select-to-convert")
const currencySelectConverted = document.querySelector(".currency-select-converted")

const mainElement = document.querySelector("main")

window.addEventListener("load", () => {
    mainElement.classList.remove("initial-state")
})

// Tabela de configuração das moedas
const currencies = {
    real: {
        name: "Real Brasileiro",
        image: "./assets/real.png",
        format: { locale: "pt-BR", currency: "BRL" },
        rate: 1
    },
    dolar: {
        name: "Dólar Americano",
        image: "./assets/dolar.png",
        format: { locale: "en-US", currency: "USD" },
        rate: 6
    },
    euro: {
        name: "Euro",
        image: "./assets/euro.png",
        format: { locale: "de-DE", currency: "EUR" },
        rate: 6.6
    },
    libra: {
        name: "Libra",
        image: "./assets/libra.png",
        format: { locale: "en-GB", currency: "GBP" },
        rate: 7.3
    },
    bitcoin: {
        name: "Bitcoin",
        image: "./assets/bitcoin.png",
        format: { locale: "en-US", currency: "BTC" }, // usaremos especial
        rate: 476993.19
    }
}

// Função principal de conversão
function convertValuesConverted() {
    const inputCurrencyValue = parseFloat(document.querySelector(".input-currency").value) || 0
    const currencyValueToConvert = document.querySelector(".currency-value-to-convert")
    const currencyValueConverted = document.querySelector(".currency-value-converted")

    const from = currencies[currencySelectToConvert.value]
    const to = currencies[currencySelectConverted.value]

    // Passo 1: converter moeda de origem → REAL
    const valueInReal = inputCurrencyValue * from.rate

    // Passo 2: converter REAL → moeda de destino
    const finalValue = valueInReal / to.rate

    // Exibir valor de origem
    if (currencySelectToConvert.value === "bitcoin") {
        currencyValueToConvert.innerHTML = inputCurrencyValue.toFixed(6) + " BTC"
    } else {
        currencyValueToConvert.innerHTML = new Intl.NumberFormat(from.format.locale, {
            style: "currency",
            currency: from.format.currency
        }).format(inputCurrencyValue)
    }

    // Exibir valor convertido
    if (currencySelectConverted.value === "bitcoin") {
        currencyValueConverted.innerHTML = finalValue.toFixed(6) + " BTC"
    } else {
        currencyValueConverted.innerHTML = new Intl.NumberFormat(to.format.locale, {
            style: "currency",
            currency: to.format.currency
        }).format(finalValue)
    }
}

// Atualiza moeda de destino (nome e imagem)
function changeCurrencyConverted() {
    const currencyName = document.getElementById("currency-name")
    const currencyImage = document.querySelector(".currency-img")
    const to = currencies[currencySelectConverted.value]

    currencyName.innerHTML = to.name
    currencyImage.src = to.image

    convertValuesConverted()
}

// Atualiza moeda de origem (nome e imagem)
function changeCurrencyToConvert() {
    const currencyNameToConvert = document.querySelector(".currency-box .currency")
    const currencyImage = document.querySelector("section .currency-box img")
    const from = currencies[currencySelectToConvert.value]

    currencyNameToConvert.innerHTML = from.name
    currencyImage.src = from.image

    convertValuesConverted()
}

// Eventos
currencySelectToConvert.addEventListener("change", changeCurrencyToConvert)
currencySelectConverted.addEventListener("change", changeCurrencyConverted)
convertButton.addEventListener("click", convertValuesConverted)