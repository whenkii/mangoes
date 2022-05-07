import React from 'react'
import styled from 'styled-components'

export function AllSpinners(props) {
  // const Allcolours = ["primary","secondary","success","warning","danger","dark","info"];
  // const Allcolours = ["var(--csBlue)","secondary","success","warning","danger","dark","info"];
  const Allcolours = ["white","white","white","white","white","white","white"];
  const spinnerColors = props.value ? Allcolours.filter(a => a === props.value):Allcolours;
    return (
        <Waiting className="d-flex align-items-center justify-content-center">
          {spinnerColors.map((colour,i) => 
            <div key={i} className={`spinner-grow text-${colour}`} role="status">
              <span className="sr-only">Loading...</span>
            </div> 
          )}
        </Waiting>
    )
}

const Waiting = styled.div`
height:60vh;
.spinner-grow {
    width: 2rem; 
    height:2rem;
    // margin:0.2rem;
    // font-size:0.5em;
}
@media (max-width: 798px) {
  // .spinner-grow{
  //   width: 1rem; 
  //   height:1rem;
  //   // font-size:2rem;
  // }
}`