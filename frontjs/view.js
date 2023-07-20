import * as control from "./controller.js";


const redactProfileBtn = document.getElementById('redactProfile');
const saveProfileInfo = document.getElementById('updateProfile');
const createNewPost = document.getElementById('createNewPost');
const createnewPostBtn = document.getElementById('createNewPostBtn');

window.onload = () => {
    let username = document.getElementById('userName');
    let userInfo =  control.getProfile(username);
    let usersPosts = control.getPosts(username);
    if(!userInfo) return; 
    loadUserInfo(userUnfo);
    if(!usersPosts) return;
    loadUserPosts(usersPosts);
}


saveProfileInfo.addEventListener('click',control.saveNewProfileInfo,false);
saveProfileInfo.addEventListener('click',control.closeProfileRedactor,false);
redactProfileBtn.addEventListener('click', control.openRedactprofile,false);

createNewPost.addEventListener('click',control.openPostW,false);
createnewPostBtn.addEventListener('click',control.saveNewPost,false);
createnewPostBtn.addEventListener('click',control.closePostWin,false);



function loadUserInfo(userInfo){
    
}