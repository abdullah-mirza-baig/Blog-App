import { uploadBytesResumable,updateDoc , getDoc , auth , signOut , onAuthStateChanged ,  collection, addDoc , db , getDocs , deleteDoc , doc, storage , ref, uploadBytes, getDownloadURL } from '../../firebase.js';


let logoutBtn = document.getElementById ('logoutBtn');
let blogTitle = document.getElementById('title');
let blogDesc = document.getElementById('description');
let uploadbtn = document.getElementById('uploadbtn');
let updatedbtn = document.getElementById('updatedbtn');
let image = document.getElementById('image');
let getImage;
let box = document.getElementById ('main-box');
let loader = document.querySelector('.loader');
let loader1 = document.querySelector('.loader1');
let fileSize= document.getElementById('fileSize');

loader.style.display = 'none';
loader1.style.display = 'none';
updatedbtn.style.display = 'none';
let isEdit = null;



const Logout = () =>{

    signOut(auth).then(() => {
  // Sign-out successful.
        Toastify({

        text: "Logout Sucessfully",
    
        duration: 3000
    
         }).showToast();
    }).catch((error) => {
            Toastify({

            text: "Logout Sucessfully",
        
            duration: 3000
        
             }).showToast();
  // An error happened.
    });


}

logoutBtn.addEventListener('click',Logout);


onAuthStateChanged(auth, (user) => {
    if (!user) {
        
        window.location.href = '../../index.html';

    } 
  });



  const UploadBlog = async () =>{

      if(blogTitle.value !== "" && blogDesc.value !== "" ){
        uploadbtn.innerText = 'Loading...';
    try {
        const docRef = await addDoc(collection(db, "blogs"), {
          Title: blogTitle.value,
          Description: blogDesc.value,
          Image: getImage
          
        });
        Toastify({

            text: "Blog Uploaded Scroll Down To See",
        
            duration: 3000
        
             }).showToast();
             uploadbtn.innerText = 'Upload';
        console.log("Document written with ID: ", docRef.id);
        ShowBlogs();
      } catch (e) {
        console.error("Error adding document: ", e);
        
        Toastify({

            text: error,
        
            duration: 3000
        
             }).showToast();
      }
      finally{

        uploadbtn.innerText = 'Upload';
      }

    }

        blogTitle.value = "";
        blogDesc.value = "";

  }

  uploadbtn.addEventListener('click', UploadBlog);  


//   Showing Blogsss----------------


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
            const { Title , Description , Image} = doc.data();
            box.innerHTML += `<div class="col-md-4">
                  <div class="card mb-4" style="width: 18rem;">
                    <img style="height: 300px; object-fit: cover" class="card-image" src="${Image}">
                    <div class="card-body">
                      <h5 class="card-title">${Title}</h5>
                      <p class="card-text">${Description.slice(0, 100)}....</p>
                      <a onclick="deletedata('${doc.id}',this)"  class="btn btn-danger" >Delete</a>
                      <a onclick="editdata('${doc.id}',this)"  class="btn btn-success" >Edit</a>

                    </div>
                  </div>
                </div>`
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

// ----------------delete function 
window.deletedata = async (id, Dbutton) =>{

console.log('delete', id);
Dbutton.innerText = "Deleting..."
try{

  await deleteDoc(doc(db, "blogs", id));

  ShowBlogs();
Dbutton.innerText = "Delete"
}

catch(error){

  console.log(error);

}
finally{

  Dbutton.innerText = "Deleting..."

}

}
// ----------------edit function 
window.editdata = async (id, Ebutton) =>{

  updatedbtn.style.display = 'block';
  console.log('edit', id);
  Ebutton.innerText = 'Editing';
  uploadbtn.style.display = 'none';
  try{

    let currentData  = await getDoc(doc(db, "blogs", id));
    const { Title , Description} = currentData.data();
    console.log(Title , Description);

    blogTitle.value = Title;
    blogDesc.value = Description;
    isEdit = id;
    Toastify({

      text: "Scroll Up To Update Blog",
  
      duration: 3000
  
       }).showToast();
  
    // ShowBlogs();
  // Dbutton.innerText = "Delete"
  Ebutton.innerText = 'Edit';
 
  }
  
  catch(error){
  
    console.log(error);
  
  }
  finally{
  
    // Dbutton.innerText = "Deleting..."
    Ebutton.innerText = 'Edit';
  
  }




}
// ----------------update function 
const updateData = async () =>{

  console.log('UPDATED');
  updatedbtn.innerText = "Updating..."
  try{
    await updateDoc(doc(db, "blogs", isEdit),{
      Title : blogTitle.value,
      Description : blogDesc.value

    });
    ShowBlogs();
    updatedbtn.innerText = "Update"
    Toastify({

      text: "Blog Updated Scroll Down To See",
  
      duration: 3000
  
       }).showToast();
    
       uploadbtn.style.display = 'block';
       updatedbtn.style.display = 'none';
  }
  
  catch(error){
  
    console.log(error);
  
  }
  finally{

    updatedbtn.innerText = "Update"
  }
  

  blogDesc.value = "";
  blogTitle.value = "";

}

updatedbtn.addEventListener ('click', updateData)

let currentyear = document.getElementById('currentyear');

    let date = new Date();
    currentyear.innerText = date.getFullYear();



// ------------------ Cloud Storage Start From Here --------------------



const uploadImg = () => {

  const files = image.files[0];
  
    const imagesRef = ref(storage, `image/${files.name}`);
    const uploadTask = uploadBytesResumable(imagesRef, files);
    
    // uploadBytes(imagesRef, files)
    //     .then((snapshot) => {
    //       console.log('Uploaded a blob or file!');
    //     });
    
    uploadTask.on('state_changed', 
      (snapshot) => {
        
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        loader1.style.display = 'block';
        if(progress >= 100){
  
          loader1.style.display = 'none';
  
        }
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
        console.log(error);
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          getImage = downloadURL;
          console.log('File available at', downloadURL);
        });
      }
    );


  
  


}

image.addEventListener('change', uploadImg);