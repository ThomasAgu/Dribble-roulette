import React from 'react'

type Props = {
    activeConf: boolean,
    setActiveConf: (isActive: boolean) => void,
    value: number,
    setValue: (isvalue: number) => void,
}
/* <input type="range" name="" value={value} min={4} max={12} id="" onChange={(e) => setValue(Number(e.target.value))}/> */
const InputItemsCant: React.FC<Props>= ({activeConf, setActiveConf, value, setValue}) => {
  return (
    <div>
        {activeConf ? 
            <div id='activeConf'>
              <button type='button' className={value == 4 ? 'btn-active': 'btn-inactive'} onClick={(e) => setValue(4)}>4</button>
              <button type='button' className={value == 8 ? 'btn-active': 'btn-inactive'} onClick={(e) => setValue(8)}>8</button>
              <button type='button' className={value == 12 ? 'btn-active': 'btn-inactive'} onClick={(e) => setValue(12)}>12</button>
            </div>
        :
            <div id='inactiveConf'></div>
        }

    </div>
  )
}

export default InputItemsCant