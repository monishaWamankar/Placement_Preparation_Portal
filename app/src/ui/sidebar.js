var auth_token;
//var csdom = require('./csDomain.js');

//window.onload= setDomain;
function setDomain() {

	
	auth_token = Cookies.get('auth_token'); 
	//console.log(auth_token);
	var notifBar = "";
	// var notifBar2 = "";
	var notifList;
	var selectRequest = new XMLHttpRequest();
	selectRequest.onreadystatechange=function() {
		if(selectRequest.readyState===XMLHttpRequest.DONE && selectRequest.status===200) {
			//console.log('inside sidebar.js');
			notifList = JSON.parse(selectRequest.responseText);
			var n = notifList.length;
			for(var i=0; i < n; i++) {
				/*var data = {
					eventDetails : notifList[i].eventDetails,
					eventOrgsr : notifList[i].eventOrgsr
					}*/
				notifBar += CSDomainCardQueue3(notifList[i]);
				// notifBar2 += CSDomainCardQueue2(notifList[i]);
				
				
			}
			if(notifBar === "") {
				notifBar = "<h3>No Course Added!</h3>";
			}
			sidebarDomain.innerHTML = notifBar;
		}
	}
	selectRequest.open('POST', "https://data.affirmatively33.hasura-app.io/v1/query",true);
	selectRequest.setRequestHeader('Content-type','application/json');
	selectRequest.setRequestHeader('Authorization','Bearer '+auth_token);
	selectRequest.send(JSON.stringify({type: "select",args:{table: "CSDomains", columns:["*"]}}));
}

function CSDomainCardQueue3(data) {
	// var domaindetails = data.domaindetails;
	var domainName = data.domainName;
	var domainID = data.domainID;

	var cardTemplateNotifQueue = `
		<div  style="color: black; ><span class="glyphicon glyphicon-remove" onclick="selectDomain(${domainID});"></span>${domainName}</div>
		`;
		return cardTemplateNotifQueue;	
}

function setSkill() {

	
	auth_token = Cookies.get('auth_token'); 
	//console.log(auth_token);
	var notifBar = "";
	// var notifBar2 = "";
	var notifList;
	var selectRequest = new XMLHttpRequest();
	selectRequest.onreadystatechange=function() {
		if(selectRequest.readyState===XMLHttpRequest.DONE && selectRequest.status===200) {
			//console.log('inside sidebar.js');
			notifList = JSON.parse(selectRequest.responseText);
			var n = notifList.length;
			for(var i=0; i < n; i++) {
				/*var data = {
					eventDetails : notifList[i].eventDetails,
					eventOrgsr : notifList[i].eventOrgsr
					}*/
				notifBar += softSkillCardQueue3(notifList[i]);
				// notifBar2 += CSDomainCardQueue2(notifList[i]);
				
				
			}
			if(notifBar === "") {
				notifBar = "<h3>No Skill Added!</h3>";
			}
			sidebarSkill.innerHTML = notifBar;
		}
	}
	selectRequest.open('POST', "https://data.affirmatively33.hasura-app.io/v1/query",true);
	selectRequest.setRequestHeader('Content-type','application/json');
	selectRequest.setRequestHeader('Authorization','Bearer '+auth_token);
	selectRequest.send(JSON.stringify({type: "select",args:{table: "softskills", columns:["*"]}}));
}

function softSkillCardQueue3(data) {
	// var domaindetails = data.domaindetails;
	var skillName = data.skillName;
	var skillID = data.skillID;
	

	var cardTemplateNotifQueue = `
		<div  style="color: black; ><span class="glyphicon glyphicon-remove" onclick="selectSkill(${skillID});"></span>${skillName}</div>
		`;
		return cardTemplateNotifQueue;	
}

function authTestQuiz(){
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
				if(role1=="admin" || role2=="admin")
				{
					window.location = '/addQuiz';
					//console.log('Is admin');
				}
				else
				{
					window.location = '/quiz';
					
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

