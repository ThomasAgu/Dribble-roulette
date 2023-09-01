import React, { useEffect, useState, useRef } from 'react'

interface Props{
    data: {
        imageUrl: string;
      title: string;
      url: string;
    }
    value: number,
    index: number;
    active: boolean;
    winnerIndex: number;
}

const ItemRoulette: React.FC<Props> = ({data, value,index, active, winnerIndex})  => {
  return (
    <div onClick={() => window.open(data.url)} className={`roulete-item ${active ? '' : index === winnerIndex ? 'winner' : 'non-winner'}`}>
        {/* <div id='item-title'><h5>{data.title}</h5></div> */}
        <img src={data.imageUrl} id={`item-img-${value}-${index+1}`} className={`item-img-${value}`} alt='foto de item'></img>
    </div>
  )
}

export default ItemRoulette