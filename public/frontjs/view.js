import * as control from "./controller.js";


const redactProfileBtn = document.getElementById('redactProfile');
const saveProfileInfo = document.getElementById('updateProfile');
const createNewPost = document.getElementById('createNewPost');
const createnewPostBtn = document.getElementById('createNewPostBtn');

const profileForm = document.getElementById('my-profile');

profileForm.addEventListener('submit',control.saveNewProfileInfo);













// document.getElementById('my-profile').addEventListener('submit', async (event) =>  {
//     event.preventDefault();

//     const formData = new FormData(event.target);
//     const avatar = formData.get('avatar');
//     const firstName = formData.get('firstname');
//     const lastName = formData.get('lastname');
//     const state = formData.get('state');
//     const birthDate = formData.get('birthdate');
//     const address = formData.get('address');

//     console.log(JSON.stringify({ firstName, lastName, avatar, state, birthDate, address }))
//     // console.log(formData)

//     try {
//         let response = await fetch('/updateProfile', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ firstName, lastName, avatar, state, birthDate, address })
//         });
    
//         if (response.ok) {
//             console.log('Data updated successfully.');
//         } else {
//             console.error('Failed to update data.');
//         }
//     } catch (error) {
//         console.error('Error during data update:', error);
//     }
// });













///

window.onload = async () => {
    let username = document.getElementById('userName');
    let userInfo = await control.getProfile();
    let usersPosts = await control.getPosts();
    if(!userInfo) return; 
    loadUserInfo(userInfo);
    if(!usersPosts) return;
    loadUserPosts(usersPosts);
}


// saveProfileInfo.addEventListener('click',control.saveNewProfileInfo,false);
// saveProfileInfo.addEventListener('click',control.closeProfileRedactor,false);
redactProfileBtn.addEventListener('click', control.openRedactprofile,false);

createNewPost.addEventListener('click',control.openPostW,false);
createnewPostBtn.addEventListener('click',control.saveNewPost,false);
createnewPostBtn.addEventListener('click',control.closePostWin,false);



function loadUserInfo(userInfo){
    let nameDiv =document.querySelector('.name');
    let nameP = document.createElement('p');
    nameP.textContent = userInfo.name;
    nameDiv.append(nameP);

    let lastnameDiv =document.querySelector('.lastName');
    let lastnameP = document.createElement('p');
    lastnameP.textContent = userInfo.lastname;
    lastnameDiv.append(lastnameP);

    let statusDiv =document.querySelector('.status');
    let statusP = document.createElement('p');
    statusP.textContent = userInfo.status;
    statusDiv.append(statusP);

    let dateOfBrDiv =document.querySelector('.DoB');
    let dateP = document.createElement('p');
    dateP.textContent = userInfo.DoB;
    dateOfBrDiv.append(dateP);

    let PlaceOfLvDiv =document.querySelector('.PoL');
    let placeP = document.createElement('p');
    placeP.textContent = userInfo.PoL;
    PlaceOfLvDiv.append(placeP);
}


function loadUserPosts(userPosts){
  let mainDiv = document.querySelector('.posts');
  for(let x of userPosts){
    let box = document.createElement('div');
    box.classList.add('post');
    let txt = document.createElement('p');
    let img = document.createElement('img');
    if(x.text) txt.textContent = x.text;
    if(x.src) img.setAttribute('src',x.src); 
    box.append(txt);
    box.append(img);
}


  
  
    
}

// let a = await fetch("/getUserProfile")
//   .then(response => {
//      response.json();
//   })
  

// console.log(a);

