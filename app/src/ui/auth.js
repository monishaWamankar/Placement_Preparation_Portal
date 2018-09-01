window.onload= authTest;
function authTest()
{
	auth_token = Cookies.get('auth_token');
	var request= new XMLHttpRequest();
	request.onreadystatechange= function(){
		//alert(auth_token);
		if (request.readyState=== XMLHttpRequest.DONE){
				 
			if(request.status=== 200){
				//alert('request successful');
				if(window.location.pathname == "/home")
				{
					extEventQueue();
					intEventQueue();
					projPoolQueue();
					//domainMenu();
					companyQueue();
					extRecruitQueue();
					storyQueue();
					//CSDomainQueue();
				}
				else if(window.location.pathname == "/moderator")
				{
					extEventQueue();
					intEventQueue();
					companyQueue();
					projPoolQueue();
					extRecruitQueue();
					storyQueue();
				}
				
			}
			else
			{
				//alert('something whent wrong');
				window.location = '/login';
			}
				
		}
		
	}
	//console.log("auth "+auth_token);
	//making the request
	request.open('GET', 'https://auth.affirmatively33.hasura-app.io/user/account/info', true);
	request.setRequestHeader('Content-Type', 'application/json');
	request.setRequestHeader('Authorization', 'Bearer '+ auth_token);
	request.send();
}



function signoutFun(){
	//alert('inside signout');
	var request= new XMLHttpRequest();
	request.onreadystatechange= function(){
		// alert(auth_token);
			if (request.readyState=== XMLHttpRequest.DONE){
			if(request.status=== 200){
				alert("Signout successful")
				Cookies.set('auth_token', '');
				window.location = '/login';
			}
			else if(request.status=== 403){
				alert('Incorrect credentials');
				window.location = '/login';
			}
			else if(request.status=== 500){
				alert('Something went wrong');
			}
			else
				alert('Request is wrong');
		}
	}
	
	//make the request
	request.open('POST', 'https://auth.affirmatively33.hasura-app.io/user/logout', true);
	request.setRequestHeader('Content-Type', 'application/json');
	request.setRequestHeader('Authorization', 'Bearer '+ auth_token);
	request.send(JSON.stringify({}));
	
}

function changePass(){
	//alert('inside signout');
	var request= new XMLHttpRequest();
	request.onreadystatechange= function(){
		// alert(auth_token);
			if (request.readyState=== XMLHttpRequest.DONE){
				//console.log("RESP "+request.responseText);
			if(request.status=== 200){
				alert("Change password successful");
			}
			else if(request.status=== 403){
				alert('Incorrect credentials');
			}
			else if(request.status=== 500){
				alert('Something went wrong');
			}
			else
				alert('Request is wrong');
		}
	}
	
	var oldPass = document.getElementById('oldPass').value;
	var newPass = document.getElementById('newPass').value;
    var newPassConf = document.getElementById('newPassConf').value;
	//console.log(oldPass+" "+newPass+" "+newPassConf);
	if(newPass == newPassConf){
		//make the request
		request.open('POST', 'https://auth.affirmatively33.hasura-app.io/user/password/change', true);
		request.setRequestHeader('Content-Type', 'application/json');
		request.setRequestHeader('Authorization', 'Bearer '+ auth_token);
		request.send(JSON.stringify({password : oldPass ,new_password : newPass}));
		
	}
	else{
		alert("Password mismatch");
	}
}

function authTest2(){
	auth_token = Cookies.get('auth_token');
	var request= new XMLHttpRequest();
	request.onreadystatechange= function(){
			if (request.readyState=== XMLHttpRequest.DONE){
			if(request.status=== 200){
				//alert("request successful")
				auth_token = JSON.parse(this.responseText).auth_token;
				var role1 = JSON.parse(this.responseText).hasura_roles[0];
				var role2 = JSON.parse(this.responseText).hasura_roles[1];
				var length = JSON.parse(this.responseText).hasura_roles.length;
				//Cookies.set('auth_token', auth_token);
				//alert('role '+role);
				
				// if(length=="2" && (role1=="admin"|| role2=="moderator"))
				//console.log('Role1 '+role1+' Role2 '+role2);
				if(role1=="admin"|| role2=="moderator")
				{
					
					//console.log('Is admin or moderator');
				}
				else
				{
					alert('Access Denied');
					window.location = '/home';
					
				}
				
			}	
			
		}
	}
	
	//make the request
	//making the request
	request.open('GET', 'https://auth.affirmatively33.hasura-app.io/user/account/info', true);
	request.setRequestHeader('Content-Type', 'application/json');
	request.setRequestHeader('Authorization', 'Bearer '+ auth_token);
	request.send();
}

function authTest3(){
	auth_token = Cookies.get('auth_token');
	var request= new XMLHttpRequest();
	request.onreadystatechange= function(){
			if (request.readyState=== XMLHttpRequest.DONE){
			if(request.status=== 200){
				//alert("request successful")
				auth_token = JSON.parse(this.responseText).auth_token;
				var role1 = JSON.parse(this.responseText).hasura_roles[0];
				var role2 = JSON.parse(this.responseText).hasura_roles[1];
				var length = JSON.parse(this.responseText).hasura_roles.length;
				//Cookies.set('auth_token', auth_token);
				//alert('role '+role);
				
				// if(length=="2" && (role1=="admin"|| role2=="moderator"))
				//console.log('Role1 '+role1+' Role2 '+role2);
				if(role1=="admin")
				{
					
					//console.log('Is admin');
				}
				else
				{
					alert('Access Denied');
					window.location = '/home';
					
				}
				
			}	
			
		}
	}
	
	//make the request
	//making the request
	request.open('GET', 'https://auth.affirmatively33.hasura-app.io/user/account/info', true);
	request.setRequestHeader('Content-Type', 'application/json');
	request.setRequestHeader('Authorization', 'Bearer '+ auth_token);
	request.send();
}
