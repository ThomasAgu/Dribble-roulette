import React, { useEffect, useState, useRef } from 'react'
import ItemRoulette from './ItemRoulette';
import Flecha from '../images/flechaAbajo.png'
import Github from '../images/github.svg'
import '../index.css'

interface Props{
    active: boolean,
    value: number,
    data: {
      imageUrl: string;
      title: string;
      url: string
    }[];
    winnerIndex: number;
    activeSpin: boolean;
    rotation: number;
  }



const Roulette: React.FC<Props> = ({active, data,value, winnerIndex, activeSpin, rotation})  => {

  const rouletteRef = useRef<HTMLDivElement>(null);
  const flechaRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
     if(active === true && rouletteRef.current){
      switch(value){
        case(4):
        rouletteRef.current.style.setProperty('--rotation', `${rotation + 300}deg`);
          break;
        case(8):
        rouletteRef.current.style.setProperty('--rotation', `${rotation + 40}deg`);
          break;
        case(12):
          rouletteRef.current.style.setProperty('--rotation', `${rotation + 10}deg`);
          break;
      }
       // Actualiza la variable CSS
      rouletteRef.current.classList.add('spin'); // Usa la clase 'spin' para aplicar la animación
      rouletteRef.current.classList.add('active')
    }
    else{
      if(rouletteRef.current){
        rouletteRef.current.classList.remove('active')
      }
    }
  }, [active])


  return (
    <div id='roulette-content'>
      <div id='flechaContent'><img src={Flecha} alt="" id='imgFlecha' ref={flechaRef}/></div>
      <div id={`roulete-${value}`} className='roulete' ref={rouletteRef}>
        {data.map((item, index) => {
          return (<div key={item.title} className={`grid-item-${value}`} id={`grid-item-${value}-${index+1}`}><ItemRoulette data={item} index={index} value={value} active={activeSpin} winnerIndex={winnerIndex}/></div>)
        })}
        <div id={`central-point-${value}`}central-point > <img id='img-git' src={Github} alt="" onClick={() => window.open('https://github.com/ThomasAgu')}/></div>
      </div>
    </div>
  )
}

export default Roulette