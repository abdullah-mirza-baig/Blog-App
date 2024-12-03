import {auth , collection , addDoc , db , getDocs } from './firebase.js';


// console.log(auth);



let gotosigin = document.getElementById ('gotosigin');
let box = document.getElementById ('main-box');
let loader = document.querySelector('.loader');
loader.style.display = 'none';


const GoTo = () =>{

    window.location.href = './auth/signin/signin.html';


}

gotosigin.addEventListener('click' , GoTo);







const ShowBlogs = async () =>{
    box.innerHTML = '';
    loader.style.display = 'block';
    try{
        const querySnapshot = await getDocs(collection(db, "blogs"));
        if(querySnapshot.empty){

            loader.style.display = 'none';
            box.innerHTML = `<p> No Blogs Available </p>`;

        }
        querySnapshot.forEach((doc) => {
        const { Title , Description,Image} = doc.data();
        box.innerHTML += `<div class="col-md-4">
              <div class="card mb-4" style="width: 18rem;">
                <img  style="height: 300px; object-fit: cover" src="${Image}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${Title}</h5>
                  <p class="card-text">${Description.slice(0, 100)}</p>
                   <a  onclick="BlogDetail('${doc.id}',this)"  class="btn 	btn-warning" >View Details</a>
                </div>
              </div>
            </div>`
        // console.log(Title , Description);
        loader.style.display = 'none';

    //   console.log(`${doc.id} => ${doc.data()}`);
    });

    }
    catch{
        Toastify({

            text: error,
        
            duration: 3000
        
             }).showToast();

    }
    

  }

  ShowBlogs();




  window.BlogDetail = (id) => {

    localStorage.setItem('blogid',id);
    // console.log("HEY",id)
    window.location.href = './blogdetail.html'

  }



let currentyear = document.getElementById('currentyear');




    let date = new Date();
    currentyear.innerText = date.getFullYear();