import React, { useEffect, useRef, useState} from 'react'
import Roulette from './Roulette'

import InputItemsCant from './InputItemsCant'
import imgR from '../images/gambler.svg' 
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { transform } from 'typescript'
const Main: React.FC = () => {
    const [scrapedData, setScrapedData] = useState([]);
    const [activeConf, setActiveConf] = useState(false);
    const [active, setActive] = useState(false)
    const [value, setValue] = useState(4);
    const [activeSpin, setActiveSpin] = useState(true)
    //roulette
    const [winnerIndex, setWinnerIndex] = useState(-1);

    const [rotation, setRotation] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const randomIndex = Math.floor(Math.random() * value) ;
                setWinnerIndex(randomIndex);
                const response = await axios.get(`http://localhost:3001/data/${value}`);
                const scrapedData = response.data;
                setScrapedData(scrapedData);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [value])
    //hacer un yuseeffect
    const handleClickSpin = async () =>{
        setActiveSpin(true);
        setActive(true)
        try {
            
            const degreesPerItem = 360 / scrapedData.length;
            const rotationDegrees = Math.abs(360 - winnerIndex * degreesPerItem);
            setRotation(rotationDegrees);
            // Espera 10 segundos antes de continuar
            await new Promise((resolve) => setTimeout(resolve, 10000));
            setActive(false);
            setActiveSpin(false);
        }   catch (error) {
            console.log('error', error);
        }    
      
    }
    


  return (
    <div>
        <div id='nav'>
            <div id='nav-content'>Dribble Roulette</div>
        </div>
        <main id='main-content'>
            <img src={imgR} alt='roulteta imagen' id='imgR'/>
            <div id='description'>
                "Dribble Roulette es un Web scrapper que trae posteos aleatorios de desarrollo web en Dribbble. Practica tus habilidades con proyectos creativos y actuales. ¡Mejora tu diseño!
            </div>

            <div id='ui-content'>
                <div id='content-btn'><button id='btn-start' onClick={handleClickSpin} disabled={active}>Girar!</button></div>
                <div id='content-icon'>
                    <FontAwesomeIcon icon={faGear} id='fa-gear-icon' onClick={() => setActiveConf(!activeConf)}/>
                    <InputItemsCant activeConf={activeConf} setActiveConf={setActiveConf} value={value} setValue={setValue}/>
                    <div id='content-value'>{value}</div>
                </div>
            </div>
            
            <Roulette active={active} data={scrapedData} value={value} winnerIndex={winnerIndex} activeSpin={activeSpin} rotation={rotation} />
        </main>
    </div>
  )
}

export default Main