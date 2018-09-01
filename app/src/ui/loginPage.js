var submit= document.getElementById('submit_btn');
var auth_token;
var role;

submit.onclick= function(){
	var request= new XMLHttpRequest();
	request.onreadystatechange= function(){
			if (request.readyState=== XMLHttpRequest.DONE){
			if(request.status=== 200){
				//alert("request successful")
				auth_token = JSON.parse(this.responseText).auth_token;
				role = JSON.parse(this.responseText).hasura_roles[1];
				var length = JSON.parse(this.responseText).hasura_roles.length;
				Cookies.set('auth_token', auth_token);
				//alert('role '+role);
				if(length=="2" && role=="moderator")
				{
					window.location = '/moderator';
					//console.log(auth_token);
				}
				else
				{
					window.location = '/home';
					//alert('length2 '+length);
				}
				
			}	
			else if(request.status=== 403){
				alert('Incorrect credentials');
				window.location = '/login';
			}
			else if(request.status=== 500){
				alert('Something went wrong');
			}
		}
	}
	
	//make the request
	var username = document.getElementById('username').value;
	var password = document.getElementById('password').value;
    request.open('POST', 'https://auth.affirmatively33.hasura-app.io/login', true);
	request.setRequestHeader('Content-Type', 'application/json');
	request.send(JSON.stringify({username: username, password: password}));

}
