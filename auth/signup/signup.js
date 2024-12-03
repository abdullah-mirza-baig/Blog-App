import {auth , createUserWithEmailAndPassword, onAuthStateChanged  } from '../../firebase.js';


let userEmail = document.getElementById('userEmail');
let userPassword = document.getElementById('userPassword');
let signupBtn = document.getElementById('signupBtn');



const SignUp = () =>{
    event.preventDefault(); 
    signupBtn.innerText = 'Loading...';
    createUserWithEmailAndPassword(auth, userEmail.value, userPassword.value)
    
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      Toastify({

        text: "Signed Up",
        
        duration: 3000
        
        }).showToast();
        signupBtn.innerText = 'Sign Up';
      // ...
    })
    .catch((error) => {
      
      const errorCode = error.code;
      const errorMessage = error.message;
      Toastify({

        text: errorMessage,
        
        duration: 3000
        
        }).showToast();
        signupBtn.innerText = 'Sign Up';
      // ..
    });

}

signupBtn.addEventListener('click',SignUp);


onAuthStateChanged(auth, (user) => {
    if (user) {
        
        window.location.href = '../dashboard/dashboard.html';

    } 
  });

