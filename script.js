let profile;
let nameTile = document.getElementById('name');
let mailTile = document.getElementById('mail');
let profilePicTile = document.getElementById('profilePic');
let loginButton = document.querySelector('.g-signin2');
let container = document.querySelector('.container');

function onSignIn(googleUser) {
  profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  
  loginButton.style.display = "none";
  nameTile.innerHTML = profile.getName();
  mailTile.innerHTML = profile.getEmail();
  profilePicTile.src = profile.getImageUrl();
  container.style.display = "inline-flex";
}


function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    alert('Signed out successfully');
    loginButton.style.display = "block";
    container.style.display = "none";
  });
}