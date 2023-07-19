import * as control from "./controller.js";





window.onload = () => {
    let username = document.getElementById('userName');
    let userInfo =  control.getProfile(username);
    let usersPosts = control.getPosts(username);
    if(!userInfo) return; 
    loadUserInfo(userUnfo);
    if(!usersPosts) return;
    loadUserPosts(usersPosts);
}



function loadUserInfo(userInfo){
    
}