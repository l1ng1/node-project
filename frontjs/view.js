import * as control from "./controller.js";


const redactProfileBtn = document.getElementById('redactProfile');
const saveProfileInfo = document.getElementById('updateProfile');


window.onload = () => {
    let username = document.getElementById('userName');
    let userInfo =  control.getProfile(username);
    let usersPosts = control.getPosts(username);
    if(!userInfo) return; 
    loadUserInfo(userUnfo);
    if(!usersPosts) return;
    loadUserPosts(usersPosts);
}


saveProfileInfo.addEventListener('click',control.saveNewProfileInfo());
saveProfileInfo.addEventListener('click',control.closeProfileRedactor());
redactProfileBtn.onclick = control.openRedactprofile();





function loadUserInfo(userInfo){
    
}