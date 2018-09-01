var signout= document.getElementById('signout_btn');
var pass= document.getElementById('chg_pass_btn');
var auth_token;

/*function signoutFun(){
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
				console.log("RESP "+request.responseText);
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
	console.log(oldPass+" "+newPass+" "+newPassConf);
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
}*/

/*signout.onclick= function(){
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

pass.onclick= function(){
	//alert('inside signout');
	var request= new XMLHttpRequest();
	request.onreadystatechange= function(){
		// alert(auth_token);
			if (request.readyState=== XMLHttpRequest.DONE){
			if(request.status=== 200){
				alert("Change password successful")
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
	request.open('POST', 'https://auth.affirmatively33.hasura-app.io/user/password/change', true);
	request.setRequestHeader('Content-Type', 'application/json');
	request.setRequestHeader('Authorization', 'Bearer '+ auth_token);
	
	request.send(JSON.stringify({password : 'hasura-test-123',new_password : 'hasura-test'}));
	
}*/

//window.onload= authTest;
/*function authTest()
{
	
	auth_token = Cookies.get('auth_token');
	console.log('home auth');
	var request= new XMLHttpRequest();
	request.onreadystatechange= function(){
		//alert(auth_token);
		if (request.readyState=== XMLHttpRequest.DONE){
				 
			if(request.status=== 200){
				//alert('request successful');
				extEventQueue();
				intEventQueue();
				projPoolQueue();
				domainMenu();
				companyQueue();
				extRecruitQueue();
				storyQueue();
				CSDomainQueue();
			}
			else
			{
				//alert('something whent wrong');
				window.location = '/login';
			}
				
		}
		
	}
	console.log("auth "+auth_token);
	//making the request
	request.open('GET', 'https://auth.affirmatively33.hasura-app.io/user/account/info', true);
	request.setRequestHeader('Content-Type', 'application/json');
	request.setRequestHeader('Authorization', 'Bearer '+ auth_token);
	request.send();
}*/


////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
//////////display functions
function intEventQueue() {
	var notifBar = "";
	var notifList;
	var selectRequest = new XMLHttpRequest();
	selectRequest.onreadystatechange=function() {
		if(selectRequest.readyState===XMLHttpRequest.DONE && selectRequest.status===200) {
			notifList = JSON.parse(selectRequest.responseText);
			var n = notifList.length;
			for(var i=0; i < n; i++) {
				/*var data = {
					eventDetails : notifList[i].eventDetails,
					eventOrgsr : notifList[i].eventOrgsr
					}*/
				notifBar += intEventCardNotifQueue(notifList[i]);
			}
			if(notifBar === "") {
				notifBar = "<h1>No New Notifications!</h1>";
			}
			gm101.innerHTML = notifBar;
		}
	}
	selectRequest.open('POST', "https://data.affirmatively33.hasura-app.io/v1/query",true);
	selectRequest.setRequestHeader('Content-type','application/json');
	selectRequest.setRequestHeader('Authorization','Bearer '+auth_token);
	selectRequest.send(JSON.stringify({type: "select",args:{table: "intNotification", columns:["*"], order_by:"addTime"}}));
}

function extEventQueue() {
	var notifBar = "";
	var notifList;
	auth_token = Cookies.get('auth_token');
	var selectRequest = new XMLHttpRequest();
	selectRequest.onreadystatechange=function() {
		if(selectRequest.readyState===XMLHttpRequest.DONE && selectRequest.status===200) {
		//alert('request successful');
		//console.log(selectRequest.responseText);
			notifList = JSON.parse(selectRequest.responseText);
			//console.log(notifList);
			var n = notifList.length;
			for(var i=0; i < n; i++) {
				/*var data = {
					eventLink : notifList[i].eventLink,
					eventDetails1 : notifList[i].eventDetails,
					eventOrgsr1 : notifList[i].eventOrgsr
					}*/
				notifBar += extEventCardNotifQueue(notifList[i]);
				//console.log(notifBar);
			}
			
			if(notifBar === "") {
				notifBar = "<h1>No New Notifications!</h1>";
			}
			gm102.innerHTML = notifBar;
		}
	}
	selectRequest.open('POST', "https://data.affirmatively33.hasura-app.io/v1/query",true);
	selectRequest.setRequestHeader('Content-type','application/json');
	selectRequest.setRequestHeader('Authorization','Bearer '+auth_token);
	selectRequest.send(JSON.stringify({type: "select",args:{table: "extNotification", columns:["*"], order_by:"addTime"}}));
}

function projPoolQueue() {
	var notifBar = "";
	var notifList;
	var selectRequest = new XMLHttpRequest();
	selectRequest.onreadystatechange=function() {
		if(selectRequest.readyState===XMLHttpRequest.DONE && selectRequest.status===200) {
			notifList = JSON.parse(selectRequest.responseText);
			var n = notifList.length;
			for(var i=0; i < n; i++) {
				/*var data = {
					projID : notifList[i].projID,
					projectTitle : notifList[i].projectTitle,
					keywords : notifList[i].keywords,
					contributors : notifList[i].contributors
					}*/
				notifBar += projPoolCardNotifQueue(notifList[i]);
			}
			if(notifBar === "") {
				notifBar = "<h1>No New Notifications!</h1>";
			}
			gm103.innerHTML = notifBar;
		}
	}
	selectRequest.open('POST', "https://data.affirmatively33.hasura-app.io/v1/query",true);
	selectRequest.setRequestHeader('Content-type','application/json');
	selectRequest.setRequestHeader('Authorization','Bearer '+auth_token);
	selectRequest.send(JSON.stringify({type: "select",args:{table: "projPool", columns:["*"], order_by:"projID"}}));
}


function companyQueue() {
	var notifBar = "";
	var notifList;
	var selectRequest = new XMLHttpRequest();
	selectRequest.onreadystatechange=function() {
		if(selectRequest.readyState===XMLHttpRequest.DONE && selectRequest.status===200) {
			notifList = JSON.parse(selectRequest.responseText);
			var n = notifList.length;
			for(var i=0; i < n; i++) {
				/*var data = {
					companyName : notifList[i].companyName,
					companyLink : notifList[i].companyLink,
					arrivalDate : notifList[i].arrivalDate
					}*/
				notifBar += companyCardNotifQueue(notifList[i]);
			}
			if(notifBar === "") {
				notifBar = "<h1>No New Notifications!</h1>";
			}
			gm104.innerHTML = notifBar;
		}
	}
	selectRequest.open('POST', "https://data.affirmatively33.hasura-app.io/v1/query",true);
	selectRequest.setRequestHeader('Content-type','application/json');
	selectRequest.setRequestHeader('Authorization','Bearer '+auth_token);
	selectRequest.send(JSON.stringify({type: "select",args:{table: "upcomCompanies", columns:["*"], order_by:"arrivalDate"}}));
}

function extRecruitQueue() {
	var notifBar = "";
	var notifList;
	var selectRequest = new XMLHttpRequest();
	selectRequest.onreadystatechange=function() {
		if(selectRequest.readyState===XMLHttpRequest.DONE && selectRequest.status===200) {
			notifList = JSON.parse(selectRequest.responseText);
			var n = notifList.length;
			for(var i=0; i < n; i++) {
				/*var data = {
					recruitLink : notifList[i].recruitLink,
					recruitDetails : notifList[i].recruitDetails
					}*/
				notifBar += extRecruitmentCardNotifQueue(notifList[i]);
			}
			if(notifBar === "") {
				notifBar = "<h1>No New Notifications!</h1>";
			}
			gm105.innerHTML = notifBar;
		}
	}
	selectRequest.open('POST', "https://data.affirmatively33.hasura-app.io/v1/query",true);
	selectRequest.setRequestHeader('Content-type','application/json');
	selectRequest.setRequestHeader('Authorization','Bearer '+auth_token);
	selectRequest.send(JSON.stringify({type: "select",args:{table: "extRecruitment", columns:["*"], order_by:"recruitNo"}}));
}

function storyQueue() {
	var notifBar = "";
	var notifList;
	var selectRequest = new XMLHttpRequest();
	selectRequest.onreadystatechange=function() {
		if(selectRequest.readyState===XMLHttpRequest.DONE && selectRequest.status===200) {
			notifList = JSON.parse(selectRequest.responseText);
			var n = notifList.length;
			for(var i=0; i < n; i++) {
				/*var data = {
					story : notifList[i].story
					}*/
				notifBar += storyCardNotifQueue(notifList[i]);
			}
			if(notifBar === "") {
				notifBar = "<h1>No New Notifications!</h1>";
			}
			gm106.innerHTML = notifBar;
		}
	}
	selectRequest.open('POST', "https://data.affirmatively33.hasura-app.io/v1/query",true);
	selectRequest.setRequestHeader('Content-type','application/json');
	selectRequest.setRequestHeader('Authorization','Bearer '+auth_token);
	selectRequest.send(JSON.stringify({type: "select",args:{table: "successStory", columns:["*"], order_by:"storyNo"}}));
}





////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////HTML queues

function CSDomainCardQueue(data) {
	var domaindetails = data.domaindetails;
	var domainName = data.domainName;

	var cardTemplateNotifQueue = `
		<table>
			<tr>
<td><b></b><a href=${domaindetails}> ${domainName} </a><br></td>
				<td><br></td>
			</tr>
		</table>
		`;
		return cardTemplateNotifQueue;	
}

function companyCardNotifQueue(data) {
	var companyName = data.companyName;
	var companyLink = data.companyLink;
	var companyNo = data.companyNo;
	var arrivalDate = data.arrivalDate;
	
	var cardTemplateNotifQueue = `
		<table class="tg">
                <tr>
                  <th class="tg-yw4l"><h4><a href=$(companyLink)> ${companyName}- ${arrivalDate} </a></h4></th>
                </tr>
                
             </table>
		`;
		return cardTemplateNotifQueue;	
}

function extRecruitmentCardNotifQueue(data) {
	var recruitLink = data.recruitLink;
	var recruitDetails = data.recruitDetails;
	var recruitNo = data.recruitNo;

	var cardTemplateNotifQueue = 
		`<table class="tg">
                <tr>
				<th class="tg-yw4l"><h4><a href=${recruitLink}> ${recruitDetails}</a></h4></th>
                </tr>
                
              </table>
			  `;
		
		return cardTemplateNotifQueue;	
}

function storyCardNotifQueue(data) {	
	var story = data.story;
	var storyNo = data.storyNo;
	var storyTitle = data.storyTitle;
	
	var cardTemplateNotifQueue = `
		<table class="tg">
                <tr>
                  <th class="tg-yw4l"><h4>  ${storyTitle} </h4><p>${story}</p></th>
                </tr>
                
             </table>
		`;
		return cardTemplateNotifQueue;	
}

function extEventCardNotifQueue(data) {
	var eventLink = data.eventLink;
	var eventDetails1 = data.eventDetails;
	var eventOrgsr1 = data.eventOrgsr;
	
	var cardTemplateNotifQueue = `
			<table class="tg">
                <tr>
                  <th class="tg-yw4l"><h4><a href=${eventLink}> ${eventDetails1}- ${eventOrgsr1}</a></h4></th>
                </tr>                
             </table>
		
		`;
		return cardTemplateNotifQueue;	
}

function intEventCardNotifQueue(data) {
	var eventDetails = data.eventDetails;
	var eventOrgsr = data.eventOrgsr;
	var notifID = data.notifID;
	var cardTemplateNotifQueue = `
		<table>
		<table class="tg">
                <tr>
                  <th class="tg-yw4l"><h4> ${eventDetails} - ${eventOrgsr}</h4></th>
                </tr>
                
             </table>
		`;
		return cardTemplateNotifQueue;	
}
function projPoolCardNotifQueue(data) {
	var projID = data.projID;
	var projLink = data.projLink;
	var projectTitle = data.projectTitle;
	var keywords = data.keywords;
	var contributors = data.contributors;
	var cardTemplateNotifQueue = `
		<table class="tg">
                <tr>
				<th class="tg-yw4l"><h4><a href=${projLink}> ${projectTitle} </a>(${keywords}) - ${contributors}</h4></th>
                </tr>
                
             </table>
		`;
		return cardTemplateNotifQueue;	
}


/*function projPoolCardNotifQueue(data) {
	var projID = data.projID;
	var projectTitle = data.projectTitle;
	var keywords = data.keywords;
	var contributors = data.contributors;
	var cardTemplateNotifQueue = `
		<table>
			<tr>
				<td><b></b><a href="$(projID)">${projectTitle} </a>(${keywords}) - $(contributors)<br></td>
				<td><br></td>
			</tr>
		</table>
		`;
		return cardTemplateNotifQueue;	
}

function CSDomainCardQueue(data) {
	var domaindetails = data.domaindetails;
	var domainName = data.domainName;

	var cardTemplateNotifQueue = `
		<table>
			<tr>
				<td><b></b><a href="$(domaindetails)"> ${domainName} </a><br></td>
				<td><br></td>
			</tr>
		</table>
		`;
		return cardTemplateNotifQueue;	
}

function companyCardNotifQueue(data) {
	var companyName = data.companyName;
	var companyLink = data.companyLink;
	var arrivalDate = data.arrivalDate;
	
	var cardTemplateNotifQueue = `
		<table>
			<tr>
				<td><b></b><a href="$(companyLink)"> ${companyName}- ${arrivalDate} </a><br></td>
				<td><br></td>
			</tr>
		</table>
		`;
		return cardTemplateNotifQueue;	
}

function extRecruitmentCardNotifQueue(data) {
	var recruitLink = data.recruitLink;
	var recruitDetails = data.recruitDetails;

	var cardTemplateNotifQueue = `
		<table>
			<tr>					<!-- ext recruitments-->
				<td><b></b><a href="$(recruitLink)"> ${recruitDetails}</a><br></td>
				<td><br></td>
			</tr>
		</table>
		`;
		return cardTemplateNotifQueue;	
}

function storyCardNotifQueue(data) {	
	var story = data.story;
	
	var cardTemplateNotifQueue = `
		<table>
			<tr>					<!-- success stories-->
				<td><b></b> ${story} <br></td>
				<td><br></td>
			</tr>
		</table>
		`;
		return cardTemplateNotifQueue;	
}


function intEventCardNotifQueue(data) {
	var eventDetails = data.eventDetails;
	var eventOrgsr = data.eventOrgsr;
	
	var cardTemplateNotifQueue = `
		<table>
			<tr>
				<td><b></b>${eventDetails}- ${eventOrgsr}<br></td>
				<!-- <td><br></td> -->
			</tr>
		</table>
		`;
		return cardTemplateNotifQueue;	
}
function CSDomainQueue() {
	var notifBar = "";
	var notifList;
	var selectRequest = new XMLHttpRequest();
	selectRequest.onreadystatechange=function() {
		if(selectRequest.readyState===XMLHttpRequest.DONE && selectRequest.status===200) {
			notifList = JSON.parse(selectRequest.responseText);
			var n = notifList.length;
			for(var i=0; i < n; i++) {
				/*var data = {
					domainID : notifList[i].domainID,
					domainName : notifList[i].domainName,
					domaindetails : notifList[i].domaindetails
					}
				notifBar += createCardNotifQueue(notifList[i]);
			}
			if(notifBar === "") {
				notifBar = "<h1>No Section!</h1>";
			}
			gm108.innerHTML = notifBar;
		}
	}
	selectRequest.open('POST', "https://data.affirmatively33.hasura-app.io/v1/query",true);
	selectRequest.setRequestHeader('Content-type','application/json');
	selectRequest.setRequestHeader('Authorization','Bearer '+auth_token);
	selectRequest.send(JSON.stringify({type: "select",args:{table: "successStories", columns:["*"], order_by:"domainId"}}));
}

function domainMenu() {
	var notifBar = "";
	var notifList;
	var selectRequest = new XMLHttpRequest();
	selectRequest.onreadystatechange=function() {
		if(selectRequest.readyState===XMLHttpRequest.DONE && selectRequest.status===200) {
			notifList = JSON.parse(selectRequest.responseText);
			var n = notifList.length;
			for(var i=0; i < n; i++) {
				/*var data = {
					domaindetails : notifList[i].domaindetails,
					domainName : notifList[i].domainName
					}
				notifBar += createCardNotifQueue(notifList[i]);
			}
			if(notifBar === "") {
				notifBar = "<h1>Empty List!</h1>";
			}
			gm107.innerHTML = notifBar;
		}
	}
	selectRequest.open('POST', "https://data.affirmatively33.hasura-app.io/v1/query",true);
	selectRequest.setRequestHeader('Content-type','application/json');
	selectRequest.setRequestHeader('Authorization','Bearer '+auth_token);
	selectRequest.send(JSON.stringify({type: "select",args:{table: "CSDomain", columns:["*"], order_by:"addTime"}}));
}

*/