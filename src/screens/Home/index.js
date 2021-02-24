import React, { useState, useEffect } from "react";
import "./styles.css";
import ProgressBar from "../../components/progressBar";
import {barsUrl} from '../../service/api'


function Home() {
  const [buttons, setButtons] = useState([])
  const [barsArray, setBarsArray] = useState([]) 
  const [target, setTarget] = useState(1)
  const [maxLimit, setMaxLimit] = useState(undefined)

  useEffect(() => {
    fetch(barsUrl)
      .then((res) => res.json())
      .then((result) => {
        setMaxLimit(result.limit)
        setButtons(result.buttons)
        mapBarData(result)
      })
  }, []);

  const mapBarData = (result) => {
    const listOfBars = result.bars.map((bar, index) => {
      return {
        id: index + 1,
        value: bar,
        barColor: '#d4f1f9'
      }
    })
    setBarsArray(listOfBars)
  }

  const calculateProgressBarValue = (value) => {
    const negativeValue = Math.sign(value) === -1
    const positiveValue = Math.sign(value) === 1
    const convertedValue= Math.abs(value)

    const temp = barsArray.map((bar) => {
      if(`${bar.id}` === `${target}`) {
        if(negativeValue && convertedValue <= bar.value && bar.value > 0) {
          bar.value = bar.value - convertedValue
          if(bar.value <= maxLimit) bar.barColor = '#d4f1f9'
        } else if(positiveValue) {
            bar.value += value
            if(bar.value > maxLimit) bar.barColor = '#FF0000'
          } else if(negativeValue && convertedValue > bar.value) {
            bar.value = 0
          }
          return bar
        
      }
      return bar
    })
    setBarsArray(temp)
  }
  

  const progressButtons = buttons.map(
		(item) => <button onClick={() => calculateProgressBarValue(item)} 
      className="button-style" key={item}>{item}</button>)

  const progressBars = barsArray.map((item) => {
    return <ProgressBar key={item.id} barColor={item.barColor} barWidth={item.value} />
  })

  return (
    <div className="container">
      <div className="bar-container">
        <h2>Progress Bars Demo</h2>
        {progressBars}
      </div>
      <div className="row-container" data-testid="row-container">
      {barsArray.length ? (
        <select
          className="dropdown-style"
          data-testid="bar-dropdown"
          onChange={(e) => {
            setTarget(e.target.value)
          }}
        >
          {barsArray.map((bar, index) => {
            return (
              <option key={bar.id} value={bar.id}>
                {`# progress ${index+1}`}
              </option>
            )
          })}
        </select>
      ) : (<h3>Loading...</h3>)}

        {progressButtons}
      </div>
    </div>
  );
}

export default Home;
