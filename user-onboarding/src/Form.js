import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import styled from 'styled-components'
import Display from './Display'


const formSchema = yup.object().shape( {
   name: yup.string()
      .required("Name is Required"),
   email: yup.string()  
      .email("Email must be valid")
      .required("Email is Required"),
   password: yup.string()
      .required('Password is Required') 
      .min(8, 'You need 8 characters minimum ( ).')
      .matches(/[a-zA-Z]/, 'Password can only contain letters'),
   language: yup.string(),
   cplusplus: yup.boolean(),
   java: yup.boolean(),
   python: yup.boolean(),
   assembly: yup.boolean(),
   extratext: yup.string(),
   terms: yup.boolean().oneOf([true], "Need Agreement To Terms Of Use")
} ) 


function Form(){
// STATE=========================

// DEFAULT STATE
const [formState, setFormState] = useState( {
    name: "",
    email: "",
    password: "",
    language: "",
    cplusplus: false,
    java: false,
    python: false,
    assembly: false, 
    extratext: "",
    terms: false,
});
// ERROR STATE
const [errorState, setErrorState] = useState( {
   name: "",
   email: "",
   password: "",
   language: "",
   cplusplus: "",
   java: "",
   python: "",
   assembly: "",
   extratext: "",
   terms: ""
});
// or useState( { ...formState, terms: false} )

// STATE TO DISPLAY RETURNED DATA FROM POST
const [displayForms, setDisplayForms] = useState([]);

const [buttonState, setButtonState] = useState(true);


// FUNCTIONS=======================

// BUTTON-------------------------

useEffect(() => {
   formSchema.isValid(formState)
     .then(valid => {
        setButtonState(!valid); // don't hardcode - base on value returned
   });
 }, [formState]);


// VALIDATE----------------------

const validate = (e) => {
   // CHECK IF IT IS A CHECKBOX INPUT OR NOT
   let value = ( e.target.type === 'checkbox' 
                  ? e.target.checked 
                  : e.target.value );
   
   yup.reach( formSchema, e.target.name )
      .validate(value)
         .then( (validation) => {
            setErrorState({
               ...errorState,
               [e.target.name]: "" //set as empty string - clear when valid
            })
         })
         .catch( (error) => {
            setErrorState({
               ...errorState,
               [e.target.name]: error.errors[0]
            })
         })
}

// SUBMIT------------------------

const submitForm = (e) => {
   // NEEDED TO PREVENT PAGE FROM REFRESHING
   e.preventDefault();
   // POST
   axios.post( "https://reqres.in/api/users", formState )
      .then( (response) => {
         console.log("RESPONSE FROM API: ",response)
         addNewForm(response.data);
         //JSON CODE HERE ----->
      })
      .catch( error => console.log(error));
}

// INPUT-------------------------

const inputChange = (e) => {
   // NEEDED IN REACT TO KEEP THE SYNTHETIC EVENT FOR ASYNC EVENTS
   e.persist();
   // CALL VALIDATE 
   validate(e);
   // CHECK IF IT IS A CHECKBOX INPUT OR NOT
   let value = ( e.target.type === 'checkbox' 
                  ? e.target.checked 
                  : e.target.value );
   //SET STATE OF THE FORM
   setFormState( {
      ...formState,
      [e.target.name] : value
   });
}

// DISPLAY TO SCREEN---------------
const addNewForm = ( newForm ) => {
   setDisplayForms( [...displayForms, newForm] )
}

// YUP INLINE STYLES
let yupStyling = {
   color: 'red',
   fontSize: '.8rem'
}

   return(
      <div>
         <StyledForm id="primary-form" onSubmit={submitForm} >
            <label htmlFor="name">
               Name 
               <input 
               type='text'   id='nameField'
               name='name'   value={formState.name}
               data-cy="nameInput"
               onChange={inputChange}
               />
                { ( errorState.name.length > 0 ) 
                     ? <p style={yupStyling}>{errorState.name}</p> 
                     : null }
            </label>
          
            <label htmlFor="email">
               Email 
               <input 
               type='email'   id='emailField'
               name='email'   value={formState.email}
               data-cy="emailInput"
               onChange={inputChange}
               />
               { ( errorState.email.length > 0 ) 
                     ? <p style={yupStyling}>{errorState.email}</p> 
                     : null }
            </label>

            <label htmlFor="password">
               Password 
               <input 
               type='password'   id='passwordField'
               name='password'   value={formState.password}
               data-cy="passwordInput"
               onChange={inputChange}
               />
               { (errorState.terms.length > 0) ? <p>{errorState.terms}</p> : null }
            </label>

            <label htmlFor="language">
               What Language is your Favorite?
               <select name="language" onChange={inputChange}>
                  <option value="html">HTML</option>
                  <option value="css">CSS</option>
                  <option value="javascript">JavaScript</option>
                  <option value="react">React</option>
               </select>
            </label>

            <label>What Other Ones?</label>
            <Checkboxes>
              
               <div class="checkboxDiv">          
                  <input
                     type="checkbox"  id="c-check" 
                     name="cplusplus"
                     checked={formState.cplusplus}
                     onChange={inputChange} />               
                  <label htmlFor="cplusplus">C++</label>
               </div>

               <div class="checkboxDiv">          
                  <input
                     type="checkbox"  id="j-check" 
                     name="java"
                     checked={formState.java}
                     onChange={inputChange} />               
                  <label htmlFor="java">Java</label>
               </div>

               <div class="checkboxDiv">          
                  <input
                     type="checkbox"  id="p-check" 
                     name="python"
                     checked={formState.python}
                     onChange={inputChange} />               
                  <label htmlFor="python">Python</label>
               </div>

               <div class="checkboxDiv">          
                  <input
                     type="checkbox"  id="a-check" 
                     name="assembly"
                     checked={formState.assembly}
                     onChange={inputChange} />               
                  <label htmlFor="assembly">Assembly</label>
               </div>

            </Checkboxes>
            <label htmlFor="extratext">
               How about some more thoughts?
               <textarea
                  id="extratext" name="extratext"
                  value={formState.extratext}
                  onChange={inputChange} />
            </label>

         <TC_Div>
            <label htmlFor="terms">
               Terms & Conditions
               <input
               type='checkbox'   id='termsField'
               name='terms'   checked={formState.terms}
               data-cy="checkboxInput"
               onChange={inputChange}
               />
               { (errorState.terms.length > 0) ? <p>{errorState.terms}</p> : null }
            </label>
            <button data-cy="submitInput" disabled={buttonState}>Submit</button>
         </TC_Div>

         </StyledForm>
         <pre>{JSON.stringify(displayForms, null, 2)}</pre>
         <Display displayForms={displayForms} />
      </div>
   )
}

export default Form;


const StyledForm = styled.form`
   border: 1px solid gray;
   display: flex;
   flex-direction: column;
   width: 40%;
   margin: 0 auto;
   padding: .5em;
   border: 2px solid gray;
   border-radius: 10px;

   label{
      margin: .5em ;
      display:flex;
      flex-direction: column;
      align-items: flex-start;
      font-weight: 700;
   }
   input{
      width: 75%;
      padding: .6em .3em;
      margin: .3em 0;
      border: 2px solid gray;
      border-radius: 5px;
   }
   button{
      width: 25%;
      margin: 1em auto;
      padding: .3em;
      border: 2px solid gray;
      border-radius: 5px;
   }
   select{
      width: 78%;
      padding: .6em .3em;
      margin: .3em 0;
      border: 2px solid gray;
      border-radius: 5px;
      font-weight: 700;  
   }
   textarea{
      border: 2px solid gray;
      border-radius: 5px;
      width: 96%;
      height: 40px;
      margin: .3em 0;
      padding: .6em .3em;
      font-weight: 900;
      font-size: 1.2rem;
   }

`;

const TC_Div = styled.div`
   display: flex;
   flex-direction: row;
`;

const Checkboxes = styled.div`
   display: flex;
   justify-content: space-around;
   flex-wrap: wrap;

   .checkboxDiv{
      display: flex;
      align-items: center;
      width: 35%;
      border: 2px solid gray;
      border-radius: 5px;
      padding: 0 1em;
      margin: 5px .5em;

      input{
         width:25%;
      }
   }
`;

