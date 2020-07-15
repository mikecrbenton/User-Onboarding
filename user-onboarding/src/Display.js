import React, { useState }  from 'react';
import styled from 'styled-components';



/* THIS IS AN ADDITIONAL COMPONENT IN ADDITION
   TO THE JSON.STRINGIFY() DISPLAY */


function Display( { displayForms } ) {

   return (
      <div>
         {displayForms.map( person => (
            <DisplayCard key={person.name}>
               <p><BoldStyle>Name: </BoldStyle>{person.name}</p>
               <p><BoldStyle>Email: </BoldStyle>{person.email}</p>
               <p><BoldStyle>Password: </BoldStyle>{person.password}</p>
            </DisplayCard>
         ) ) }
      </div>
)
}

export default Display;

const DisplayCard = styled.div`
border: 1px solid gray;
border-radius: 5px;
width: 40%;
margin: 2em auto;
padding: 1em;
text-align: left;
`;

const BoldStyle = styled.span`
   font-weight: bold;
`;