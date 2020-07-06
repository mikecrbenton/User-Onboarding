import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import styled from 'styled-components'
import Display from './Display'


const formSchema = yup.object().shape( {
   name: yup.string().required("Name is Required"),
   email: yup.string()  
      .email("Email must be valid")
      .required("Email is Required"),
   password: yup.string()
      .required('Password is Required') 
      .min(8, 'You need 8 characters minimum ( ).')
      .matches(/[a-zA-Z]/, 'Password can only contain letters.'),
   terms: yup.boolean().oneOf([true], "Need Agreement To Terms Of Use")
} ) 


function Form(){
// STATE=========================

const [formState, setFormState] = useState( {
    name: "",
    email: "",
    password: "",
    terms: false
});

const [errorState, setErrorState] = useState( {
   name: "",
   email: "",
   password: "",
   terms: ""
});

// STATE TO DISPLAY RETURNED DATA FROM POST
const [displayForms, setDisplayForms] = useState([]);

const [buttonState, setButtonState] = useState(true);


// FUNCTIONS=======================

// BUTTON-------------------------

useEffect(() => {
   formSchema.isValid(formState)
     .then(valid => {
        setButtonState(!valid);
   });
 }, [formState]);


// VALIDATE----------------------

const validate = (e) => {
   // CHECK IF IT IS A CHECKBOX INPUT OR NOT
   let value = ( e.target.type === 'checkbox' 
                  ? e.target.checked 
                  : e.target.value );
   
   yup.reach( formSchema, e.target.name ).validate(value)
      .then( (validation) => {
         setErrorState({
            ...errorState,
            [e.target.name]: ""
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
   // PREVENT PAGE FROM REFRESHING
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
   // NEEDED IN REACT
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


   return(
      <div>
         <StyledForm onSubmit={submitForm} >
            <label htmlFor="nameField">
               Name 
               <input 
               type='text'   id='nameField'
               name='name'   value={formState.name}
               onChange={inputChange}
               />
            </label>
          
            <label htmlFor="emailField">
               Email 
               <input 
               type='email'   id='emailField'
               name='email'   value={formState.email}
               onChange={inputChange}
               />
               { ( errorState.email.length > 0 ) ? <p>{errorState.email}</p> : null }
            </label>

            <label htmlFor="passwordField">
               Password 
               <input 
               type='password'   id='passwordField'
               name='password'   value={formState.password}
               onChange={inputChange}
               />
               { (errorState.terms.length > 0) ? <p>{errorState.terms}</p> : null }
            </label>

            <label htmlFor="termsField">
               Terms & Conditions
               <input
               type='checkbox'   id='termsField'
               name='terms'   checked={formState.terms}
               onChange={inputChange}
               />
               { (errorState.terms.length > 0) ? <p>{errorState.terms}</p> : null }
            </label>

            <button disabled={buttonState}>Submit</button>
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

   }
`;