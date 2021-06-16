import { useEffect, useState } from 'react'

function Fiatconverter ({ theRate, cryptoCurrency, setCrytoResult, fiatCurrency, setFiatResult, exchangeRate, dollarCfa, setDollarCfa, totalCfa, setTotalCfa, totalDollar, setTotalDollar, cfaDollarRate }){
	
	let fiatResult = 0

	useEffect(() => {
		if (fiatCurrency && dollarCfa == 'USD'){
			fiatResult = fiatCurrency / exchangeRate
			setTotalCfa(fiatCurrency * cfaDollarRate)
			setTotalDollar(fiatCurrency)
			if (fiatResult > 0){
				document.getElementById('resCrypto').value = `${(fiatResult).toFixed(8)}`
			} else{
				document.getElementById('resCrypto').value = ''
			}
		}


		else if(fiatCurrency && dollarCfa == 'CFA'){
			fiatResult = (fiatCurrency / cfaDollarRate) / exchangeRate
			setTotalCfa(fiatCurrency)
			setTotalDollar(fiatCurrency / cfaDollarRate)

			if (fiatResult > 0){
				document.getElementById('resCrypto').value = `${(fiatResult).toFixed(8)}`
			} else{
				document.getElementById('resCrypto').value = ''
			}
		}

	}, [fiatCurrency])

	useEffect(() => {
		document.getElementById('resCrypto').value = ''
		setTotalCfa(0)
		setTotalDollar(0)

		if (dollarCfa == 'USD'){
			document.getElementById('dollar-display').style.display = "none"
			document.getElementById('cfa-display').style.display = "inline-block"
		} 

		else if (dollarCfa == 'CFA'){
			document.getElementById('cfa-display').style.display = "none"
			document.getElementById('dollar-display').style.display = "inline-block"
		}

	}, [exchangeRate, dollarCfa])


	return (
		<div>
			<input type='number' name='montant-dollar' id='resDollar' className='input'
			onChange={(e) => 
				setFiatResult([e.target.value])
			}
			 placeholder={'Total ' + dollarCfa}/>

			<select value={dollarCfa} onChange={(e) => setDollarCfa(e.target.value)}>
				<option value='USD'>USD</option>
				<option value='CFA'>CFA</option>
			</select>

			<span>
				1$ = {cfaDollarRate} CFA -> Total <span id='cfa-display'>{totalCfa} CFA</span> <span id='dollar-display'>{totalDollar} $</span>
			</span>

		</div>
	)

}

export default Fiatconverter

