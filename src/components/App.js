import { useEffect, useState} from 'react'
import '../style/App.css';
import Cryptoconverter from './Cryptoconverter'
import Fiatconverter from './Fiatconverter'

const BASE_URL = 'https://api.nomics.com/v1/prices?key=d0c7a1a20410e2e8a113a69e6489e153b836228c'
 
function App() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [selectedCrypto, setSelectedCrypto] = useState("BTC")
  const [cryptoCurrency, setCrytoResult] = useState()
  const [fiatCurrency, setFiatResult] = useState()
  const [dollarCfa, setDollarCfa] = useState('USD')
  const [totalCfa, setTotalCfa] = useState()
  const [totalDollar, setTotalDollar] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [fiatExchangeRate, setFiatExchangeRate] = useState()

  let theRate = 30000

  const cfaDollarRate = 570

  let rawData = []
  let filterData =[]
  let currenciesNames = []

  let selectionInfo = []

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => {
        if (res.ok){
          res.json().then(data => {
            rawData = data
            console.log(rawData)

            filterData = rawData.filter(function(curr){
              return curr.currency == "BTC" 
              || curr.currency == "ETH"
              || curr.currency == "XRP"
            })
            console.log(filterData)

            currenciesNames = filterData.map( obj => {
              return obj["currency"]
            })
            console.log(currenciesNames)

            setCurrencyOptions([...currenciesNames])
            console.log(currencyOptions) 

          })
        } else {
          console.log("Erreur")
          document.getElementById('rateDisplay').innerHTML = "Erreur :("
        }
      })
  }, [])



  useEffect(() => {
    fetch(BASE_URL)
      .then(res => {
        if (res.ok){
          res.json().then(data => {
            rawData = data
            console.log(rawData)

            selectionInfo = rawData.filter(function(curr){
              return curr.currency == selectedCrypto 
            })
            console.log(selectionInfo)

            theRate = selectionInfo[0].price
            console.log(theRate)

            setExchangeRate(theRate)
            setFiatExchangeRate(theRate)

           /* currenciesNames = filterData.map( obj => {
              return obj["currency"]
            })
            console.log(currenciesNames)

            setCurrencyOptions([...currenciesNames])
            console.log(currencyOptions)*/

          })
        } else {
          console.log("Erreur")
          document.getElementById('rateDisplay').innerHTML = "Erreur :("
        }
      })
  }, [selectedCrypto, currencyOptions])



  return (
    <div className="App">
      <div>
       <span><Cryptoconverter theRate={theRate} 
       currencyOptions={currencyOptions} 
       cryptoCurrency={cryptoCurrency} 
       setCrytoResult={setCrytoResult} 
       fiatCurrency={fiatCurrency} 
       setFiatResult={setFiatResult} 
       currenciesNames={currenciesNames} 
       selectedCrypto={selectedCrypto}
       setSelectedCrypto={setSelectedCrypto}
       exchangeRate={exchangeRate}
       dollarCfa={dollarCfa}
       setDollarCfa={setDollarCfa}
       totalCfa={totalCfa}
       setTotalCfa={setTotalCfa}
       totalDollar={totalDollar}
       setTotalDollar={setTotalDollar}
       cfaDollarRate={cfaDollarRate} />

       <span id="rateDisplay">X {exchangeRate} USD</span>

       <Fiatconverter theRate={theRate} 
       cryptoCurrency={cryptoCurrency} 
       setCrytoResult={setCrytoResult} 
       fiatCurrency={fiatCurrency} 
       setFiatResult={setFiatResult}
       exchangeRate={exchangeRate}
       dollarCfa={dollarCfa}
       setDollarCfa={setDollarCfa}
       totalCfa={totalCfa}
       setTotalCfa={setTotalCfa}
       setTotalDollar={setTotalDollar}
       totalDollar={totalDollar}
       cfaDollarRate={cfaDollarRate} />

       </span>
      </div>
    </div>
  );
}

export default App;
