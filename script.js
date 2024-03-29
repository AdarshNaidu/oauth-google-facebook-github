let profile;
let nameTile = document.getElementById('name');
let mailTile = document.getElementById('mail');
let profilePicTile = document.getElementById('profilePic');
let loginButton = document.querySelector('.g-signin2');
let container = document.querySelector('.container');
let facebookButton = document.getElementById('facebook');
let facebookInfo = document.querySelector('.facebook');


//Google OAuth

function onSignIn(googleUser) {
  profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  
  loginButton.style.display = "none";
  facebookButton.style.display = "none";
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
    facebookButton.style.display = "block";
  });
}





//Facebook OAuth

function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
    console.log('statusChangeCallback');
    console.log(response);                   // The current login status of the person.
    if (response.status === 'connected') {   // Logged into your webpage and Facebook.
      testAPI();  
    } else {                                 // Not logged into your webpage or we are unable to tell.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this webpage.';
    }
  }


  function checkLoginState() {               // Called when a person is finished with the Login Button.
    FB.getLoginStatus(function(response) {   // See the onlogin handler
      statusChangeCallback(response);
    });
  }


  window.fbAsyncInit = function() {
    FB.init({
      appId      : '764835337314957',
      cookie     : true,                     // Enable cookies to allow the server to access the session.
      xfbml      : true,                     // Parse social plugins on this webpage.
      version    : 'v4.0'           // Use this Graph API version for this call.
    });


    FB.getLoginStatus(function(response) {   // Called after the JS SDK has been initialized.
      statusChangeCallback(response);        // Returns the login status.
    });
  };

  
  (function(d, s, id) {                      // Load the SDK asynchronously
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

 
  function testAPI() {                      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
    loginButton.style.display = "none";
    facebookButton.style.display = "none";
    facebookInfo.style.display = "inline-flex";
    console.log('Welcome!  Fetching your information.... ');
    login();
    getInfo();
    FB.api('/me', function(response) {
      console.log(response);
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        response.name;
    });
  }

//   function getInfo() {
// 			FB.api('/me', 'GET', {fields: 'first_name,last_name,name,id,picture.width(150).height(150)'}, function(response) {
// 				console.log(response.picture.data.url);
// 			});
// 		}

//   function login() {
// 			FB.login(function(response) {
// 			}, {scope: 'email'});
// 		}
  
  function logout(){
    FB.logout(function(response) {
      alert("User logged out");
      loginButton.style.display = "block";
      facebookButton.style.display = "block";
      facebookInfo.style.display = "none";
});
  }
  















window.fbAsyncInit = function() {
		    FB.init({
		      appId      : '764835337314957',
		      xfbml      : true,
		      version    : 'v4.0'
		    });
		    FB.getLoginStatus(function(response) {
		    });
		};
		(function(d, s, id){
		    var js, fjs = d.getElementsByTagName(s)[0];
		    if (d.getElementById(id)) {return;}
		    js = d.createElement(s); js.id = id;
		    js.src = "//connect.facebook.net/en_US/sdk.js";
		    fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
		

		function login() {
			FB.login(function(response) {
			}, {scope: 'email'});
		}
		
	
		function getInfo() {
			FB.api('/me', 'GET', {fields: 'first_name,last_name,name,email,id,picture.width(150).height(150)'}, function(response) {
				console.log(response.picture.data.url);
        console.log(response);
        document.getElementById('status').innerHTML = response.name;
        document.querySelector('.facebook img').src = response.picture.data.url;
        document.getElementById('facebookEmail').innerHTML = response.email;
			});
		}