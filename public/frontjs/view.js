import * as control from "./controller.js";


const redactProfileBtn = document.getElementById('redactProfile');
const saveProfileInfo = document.getElementById('updateProfile');
const createNewPost = document.getElementById('createNewPost');
const createnewPostBtn = document.getElementById('createNewPostBtn');

const profileForm = document.getElementById('profileForm');

profileForm.addEventListener('submit',control.saveNewProfileInfo);

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
saveProfileInfo.addEventListener('click',control.closeProfileRedactor,false);
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
9}


  
  
    
}


