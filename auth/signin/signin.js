import { auth , signInWithEmailAndPassword, onAuthStateChanged } from '../../firebase.js'; 


let userEmail = document.getElementById('userEmail');
let userPassword = document.getElementById('userPassword');
let signinBtn = document.getElementById('signinBtn');




const SignIn = () =>{
    event.preventDefault();
    signinBtn.innerText = 'Loading...';
    signInWithEmailAndPassword(auth, userEmail.value , userPassword.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    Toastify({

        text: "Signed In",
        
        duration: 3000
        
        }).showToast();

    signinBtn.innerText = 'Sign In';
    // ...

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    Toastify({

        text: errorMessage,
        
        duration: 3000
        
        }).showToast();
    signinBtn.innerText = 'Sign In';
  });

   



}



signinBtn.addEventListener('click', SignIn);


onAuthStateChanged(auth, (user) => {
    if (user) {
        
        window.location.href = '../dashboard/dashboard.html';

    } 
  });
