import React from 'react'
import styled from 'styled-components'

export function AllSpinners(props) {
  const Allcolours = ["primary","secondary","success","warning","danger","dark","info"];
  const spinnerColors = props.value ? Allcolours.filter(a => a === props.value):Allcolours;
    return (
        <Waiting className="d-flex align-items-center justify-content-center">
          {spinnerColors.map(colour => 
            <div key={colour} className={`spinner-grow text-${colour}`} role="status">
              <span className="sr-only">Loading...</span>
            </div> 
          )}
        </Waiting>
    )
}

const Waiting = styled.div`
height:100vh;
.spinner-grow {
    width: 3rem; 
    height:3rem;
}`