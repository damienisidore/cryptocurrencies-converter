import { useEffect, useState } from 'react'

function Cryptoconverter ({ theRate, currencyOptions, cryptoCurrency, setCrytoResult, fiatCurrency, setFiatResult, currenciesNames, setSelectedCrypto, selectedCrypto, exchangeRate, dollarCfa, setDollarCfa, totalCfa, setTotalCfa, totalDollar, setTotalDollar, cfaDollarRate }){
	
	let cryptoResult = 0;

	useEffect(() => {
		if (cryptoCurrency && dollarCfa == 'USD'){
			cryptoResult = cryptoCurrency * exchangeRate
			setTotalCfa(cryptoResult * cfaDollarRate)
			setTotalDollar(cryptoResult)
			if (cryptoResult > 0){
				document.getElementById('resDollar').value = `${cryptoResult.toFixed(2)}`
			} else{
				document.getElementById('resDollar').value = ''
			}
		} 
		else if(cryptoCurrency && dollarCfa == 'CFA'){
			cryptoResult = cryptoCurrency * exchangeRate * cfaDollarRate
			setTotalCfa(cryptoResult)
			setTotalDollar(cryptoResult / cfaDollarRate)
			if (cryptoResult > 0){
				document.getElementById('resDollar').value = `${cryptoResult.toFixed(2)}`
			} else{
				document.getElementById('resDollar').value = ''
			}
		}

	}, [cryptoCurrency])

	useEffect(() => {
		document.getElementById('resDollar').value = ''
	}, [exchangeRate, dollarCfa])


	return (
		<span>
			<>
				Montant BTC : &nbsp; <input type='number' name='montant-btc' id='resCrypto' className='input'
				onChange={(e) => 
					setCrytoResult([e.target.value])
				} 
				placeholder='Montant'/>

				<select
					value={selectedCrypto}
					onChange={(e) => setSelectedCrypto(e.target.value)}
				>
					{currencyOptions.map(option => ( 
						<option key={option} value={option}>
							{option}
						</option>
					))}
				</select>
			</>
		</span>
	)

}

export default Cryptoconverter

