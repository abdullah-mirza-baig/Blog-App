import {  getDoc ,  db, doc,} from './firebase.js';


let getId = localStorage.getItem('blogid');
let Container = document.querySelector(".Container");
let loader = document.querySelector('.loader');

loader.style.display = 'none';



const ShowData = async () => {

loader.style.display = 'block';    
const docRef = doc(db, "blogs", getId);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
    
    const {Title, Description, Image} = docSnap.data();
  console.log("Document data:", docSnap.data());
  Container.innerHTML = `<div class="img-wrapper">

            <img src=${Image} alt="">
        </div>

        <h1>${Title}</h1>
        <p>${Description}</p>`
        loader.style.display = 'none';   
} else {
  console.log("No such document!");
}


}


ShowData();