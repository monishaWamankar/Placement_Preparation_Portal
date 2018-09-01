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
}*/

//window.onload= authTest;
/*function authTest()
{
	
	auth_token = Cookies.get('auth_token');
	var request= new XMLHttpRequest();
	request.onreadystatechange= function(){
		//alert(auth_token);
		if (request.readyState=== XMLHttpRequest.DONE){
				 
			if(request.status=== 200){
				////console.log("auth "+auth_token);
				//alert('request successful');
				extEventQueue();
				intEventQueue();
				companyQueue();
				projPoolQueue();
				extRecruitQueue();
				storyQueue();
				//domainMenu();
				//CSDomainQueue();
			}
			else
			{
				alert("Status"+request.status);
				window.location = '/login';
			}
				
		}
		
	}
	
	//making the request
	request.open('GET', 'https://auth.affirmatively33.hasura-app.io/user/account/info', true);
	request.setRequestHeader('Content-Type', 'application/json');
	request.setRequestHeader('Authorization', 'Bearer '+ auth_token);
	request.send();
}*/

//SELECT QUERYS
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
				notifBar = "<h3>No New Notifications!</h3>";
			}
			box1.innerHTML = notifBar;
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
		////console.log(selectRequest.responseText);
			notifList = JSON.parse(selectRequest.responseText);
			////console.log(notifList);
			var n = notifList.length;
			for(var i=0; i < n; i++) {
				/*var data = {
					eventLink : notifList[i].eventLink,
					eventDetails1 : notifList[i].eventDetails,
					eventOrgsr1 : notifList[i].eventOrgsr
					}*/
				notifBar += extEventCardNotifQueue(notifList[i]);
				////console.log(notifBar);
			}
			
			if(notifBar === "") {
				notifBar = "<h3>No New Notifications!</h3>";
			}
			box2.innerHTML = notifBar;
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
				notifBar = "<h3>No New Notifications!</h3>";
			}
			box3.innerHTML = notifBar;
		}
	}
	selectRequest.open('POST', "https://data.affirmatively33.hasura-app.io/v1/query",true);
	selectRequest.setRequestHeader('Content-type','application/json');
	selectRequest.setRequestHeader('Authorization','Bearer '+auth_token);
	selectRequest.send(JSON.stringify({type: "select",args:{table: "projPool", columns:["*"], order_by:"projID"}}));
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
					}*/
				notifBar += createCardNotifQueue(notifList[i]);
			}
			if(notifBar === "") {
				notifBar = "<h3>Empty List!</h3>";
			}
			gm104.innerHTML = notifBar;
		}
	}
	selectRequest.open('POST', "https://data.affirmatively33.hasura-app.io/v1/query",true);
	selectRequest.setRequestHeader('Content-type','application/json');
	selectRequest.setRequestHeader('Authorization','Bearer '+auth_token);
	selectRequest.send(JSON.stringify({type: "select",args:{table: "CSDomain", columns:["*"], order_by:"addtime"}}));
}

function companyQueue() {
	var notifBar = "";
	var notifList;
	var selectRequest = new XMLHttpRequest();
	selectRequest.onreadystatechange=function() {
		////console.log(selectRequest.responseText);
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
				notifBar = "<h3>No New Notifications!</h3>";
			}
			box4.innerHTML = notifBar;
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
				notifBar = "<h3>No New Notifications!</h3>";
			}
			box5.innerHTML = notifBar;
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
			//console.log("Story "+selectRequest.responseText);
			var n = notifList.length;
			for(var i=0; i < n; i++) {
				/*var data = {
					story : notifList[i].story
					}*/
				notifBar += storyCardNotifQueue(notifList[i]);
			}
			if(notifBar === "") {
				notifBar = "<h3>No New Notifications!</h3>";
			}
			box6.innerHTML = notifBar;
		}
	}
	selectRequest.open('POST', "https://data.affirmatively33.hasura-app.io/v1/query",true);
	selectRequest.setRequestHeader('Content-type','application/json');
	selectRequest.setRequestHeader('Authorization','Bearer '+auth_token);
	selectRequest.send(JSON.stringify({type: "select",args:{table: "successStory", columns:["*"], order_by:"storyNo"}}));
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
					}*/
				notifBar += createCardNotifQueue(notifList[i]);
			}
			if(notifBar === "") {
				notifBar = "<h3>No Section!</h3>";
			}
			gm101.innerHTML = notifBar;
		}
	}
	selectRequest.open('POST', "https://data.affirmatively33.hasura-app.io/v1/query",true);
	selectRequest.setRequestHeader('Content-type','application/json');
	selectRequest.setRequestHeader('Authorization','Bearer '+auth_token);
	selectRequest.send(JSON.stringify({type: "select",args:{table: "successStories", columns:["*"], order_by:"domainID"}}));
}


// deletion of notifications	https://docs.hasura.io/0.6/ref/data/query/data/delete.html

function deletecompanyQueue(companyNo) {
	var deleteRequest = new XMLHttpRequest();
	deleteRequest.onreadystatechange=function() {
		if(deleteRequest.readyState===XMLHttpRequest.DONE && deleteRequest.status===200) {
			alert("Notification Deleted!");
			companyQueue();
		}
	}
	deleteRequest.open('POST', "https://data.affirmatively33.hasura-app.io/v1/query",true);
	deleteRequest.setRequestHeader('Content-type','application/json');
	deleteRequest.setRequestHeader('Authorization','Bearer '+auth_token);
	deleteRequest.send(JSON.stringify({type: "delete",args:{table: "upcomCompanies", where: {"companyNo": {"$eq": companyNo}}}}));
}

function deleteextNotificationQueue(notifID) {
	var deleteRequest = new XMLHttpRequest();
	deleteRequest.onreadystatechange=function() {
		if(deleteRequest.readyState===XMLHttpRequest.DONE && deleteRequest.status===200) {
			alert("Notification Deleted!");
			extEventQueue();
		}
	}
	deleteRequest.open('POST', "https://data.affirmatively33.hasura-app.io/v1/query",true);
	deleteRequest.setRequestHeader('Content-type','application/json');
	deleteRequest.setRequestHeader('Authorization','Bearer '+auth_token);
	deleteRequest.send(JSON.stringify({type: "delete",args:{table: "extNotification", where: {"notifID": {"$eq": notifID}}}}));
}

function deleteintNotificationQueue(notifID) {
	var deleteRequest = new XMLHttpRequest();
	deleteRequest.onreadystatechange=function() {
		if(deleteRequest.readyState===XMLHttpRequest.DONE && deleteRequest.status===200) {
			alert("Notification Deleted!");
			intEventQueue();
		}
	}
	deleteRequest.open('POST', "https://data.affirmatively33.hasura-app.io/v1/query",true);
	deleteRequest.setRequestHeader('Content-type','application/json');
	deleteRequest.setRequestHeader('Authorization','Bearer '+auth_token);
	deleteRequest.send(JSON.stringify({type: "delete",args:{table: "intNotification", where: {"notifID": {"$eq": notifID}}}}));
}

function deleteextRecruitmentQueue(recruitNo) {
	var deleteRequest = new XMLHttpRequest();
	deleteRequest.onreadystatechange=function() {
		if(deleteRequest.readyState===XMLHttpRequest.DONE && deleteRequest.status===200) {
			alert("Notification Deleted!");
			extRecruitQueue();
		}
	}
	deleteRequest.open('POST', "https://data.affirmatively33.hasura-app.io/v1/query",true);
	deleteRequest.setRequestHeader('Content-type','application/json');
	deleteRequest.setRequestHeader('Authorization','Bearer '+auth_token);
	deleteRequest.send(JSON.stringify({type: "delete",args:{table: "extRecruitment", where: {"recruitNo": {"$eq": recruitNo}}}}));
}

function deleteprojPoolQueue(projID) {
	var deleteRequest = new XMLHttpRequest();
	deleteRequest.onreadystatechange=function() {
		if(deleteRequest.readyState===XMLHttpRequest.DONE && deleteRequest.status===200) {
			alert("Notification Deleted!");
			projPoolQueue();
		}
	}
	deleteRequest.open('POST', "https://data.affirmatively33.hasura-app.io/v1/query",true);
	deleteRequest.setRequestHeader('Content-type','application/json');
	deleteRequest.setRequestHeader('Authorization','Bearer '+auth_token);
	deleteRequest.send(JSON.stringify({type: "delete",args:{table: "projPool", where: {"projID": {"$eq": projID}}}}));
}

function deletesuccessStoryQueue(storyNo) {
	var deleteRequest = new XMLHttpRequest();
	deleteRequest.onreadystatechange=function() {
		if(deleteRequest.readyState===XMLHttpRequest.DONE && deleteRequest.status===200) {
			alert("Notification Deleted!");
			storyQueue();
		}
	}
	deleteRequest.open('POST', "https://data.affirmatively33.hasura-app.io/v1/query",true);
	deleteRequest.setRequestHeader('Content-type','application/json');
	deleteRequest.setRequestHeader('Authorization','Bearer '+auth_token);
	deleteRequest.send(JSON.stringify({type: "delete",args:{table: "successStory", where: {"storyNo": {"$eq": storyNo}}}}));
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// insertion of notifications	https://docs.hasura.io/0.6/ref/data/query/data/insert.html
function addcompanyQueue(/*companyNo, companyName, arrivalDate, companyLink*/) {
	var insertRequest = new XMLHttpRequest();
	insertRequest.onreadystatechange=function() {
		////console.log(insertRequest.responseText);
		if(insertRequest.readyState===XMLHttpRequest.DONE && insertRequest.status===200) {
			alert("Notification Added!");
			companyQueue();
			
		}
	}
	var companyName = document.getElementById('companyName').value;
	var arrivalDate = document.getElementById('arrivalDate').value;
    var companyLink = document.getElementById('companyLink').value;

	insertRequest.open('POST', "https://data.affirmatively33.hasura-app.io/v1/query",true);
	insertRequest.setRequestHeader('Content-type','application/json');
	insertRequest.setRequestHeader('Authorization','Bearer '+auth_token);
	insertRequest.send(JSON.stringify({type: "insert",args:{table: "upcomCompanies", objects: [{companyName: companyName,
																								arrivalDate: arrivalDate,
																								companyLink: companyLink}]}}));
}

function addextNotificationQueue( /*eventDate, eventCreated, eventDetails, eventOrgsr, eventLink*/) {
	var insertRequest = new XMLHttpRequest();
	insertRequest.onreadystatechange=function() {
		if(insertRequest.readyState===XMLHttpRequest.DONE && insertRequest.status===200) {
			alert("Notification Added!");
			extEventQueue();
		}
	}
	var eventDate = document.getElementById('extEventDate').value;
	//var eventCreated = document.getElementById('extEventCreated').value;
    var eventDetails = document.getElementById('extEventDetails').value;
    var eventOrgsr = document.getElementById('extEventOrgsr').value;
    var eventLink = document.getElementById('extEventLink').value;
	
	insertRequest.open('POST', "https://data.affirmatively33.hasura-app.io/v1/query",true);
	insertRequest.setRequestHeader('Content-type','application/json');
	insertRequest.setRequestHeader('Authorization','Bearer '+auth_token);
	insertRequest.send(JSON.stringify({type: "insert",args:{table: "extNotification", objects: [{
																								eventDate: eventDate,																								
																								eventDetails: eventDetails,
																								eventOrgsr: eventOrgsr,
																								eventLink: eventLink}]}}));
	extEventQueue();																								
}

function addintNotificationQueue(/*notifID, eventDate, eventCreated, eventDetails, eventOrgsr*/) {
	var insertRequest = new XMLHttpRequest();
	
	insertRequest.onreadystatechange=function() {
		////console.log(insertRequest.responseText);
		if(insertRequest.readyState===XMLHttpRequest.DONE && insertRequest.status===200) {
			alert("Notification Added!");
			//requestList();
			intEventQueue();
		}
	}
	var eventDate = document.getElementById('intEventDate').value;
//var eventCreated = document.getElementById('intEventCreated').value;
    var eventDetails = document.getElementById('intEventDetails').value;
    var eventOrgsr = document.getElementById('intEventOrgsr').value;
	
	insertRequest.open('POST', "https://data.affirmatively33.hasura-app.io/v1/query",true);
	insertRequest.setRequestHeader('Content-type','application/json');
	insertRequest.setRequestHeader('Authorization','Bearer '+auth_token);
	insertRequest.send(JSON.stringify({type: "insert",args:{table: "intNotification", objects: [{eventDate: eventDate,											
																								eventDetails: eventDetails,
																								eventOrgsr: eventOrgsr}]}}));
}

function addprojPoolQueue(/*projID, projLink, keywords, contributors*/) {
	var insertRequest = new XMLHttpRequest();
	insertRequest.onreadystatechange=function() {
		////console.log(insertRequest.responseText);
		if(insertRequest.readyState===XMLHttpRequest.DONE && insertRequest.status===200) {
			alert("Notification Added!");
			//requestList();
			projPoolQueue();
		}
	}
	var projLink = document.getElementById('projLink').value;
    var keywords = document.getElementById('keywords').value;
    var contributors = document.getElementById('contributors').value;
    var projectTitle = document.getElementById('projectTitle').value;

	insertRequest.open('POST', "https://data.affirmatively33.hasura-app.io/v1/query",true);
	insertRequest.setRequestHeader('Content-type','application/json');
	insertRequest.setRequestHeader('Authorization','Bearer '+auth_token);
	insertRequest.send(JSON.stringify({type: "insert",args:{table: "projPool", objects: [{projectTitle: projectTitle,
																						projLink: projLink,
																						keywords: keywords,
																						contributors: contributors}]}}));
}

function addextRecruitmentQueue(/*recruitNo, recruitDetails, recruitLink*/) {
	var insertRequest = new XMLHttpRequest();
	insertRequest.onreadystatechange=function() {
		//console.log(insertRequest.responseText);
		if(insertRequest.readyState===XMLHttpRequest.DONE && insertRequest.status===200) {
			alert("Notification Added!");
			extRecruitQueue();
		}
	}
	var recruitLink = document.getElementById('recruitLink').value;
	var recruitDetails = document.getElementById('recruitDetails').value;

	insertRequest.open('POST', "https://data.affirmatively33.hasura-app.io/v1/query",true);
	insertRequest.setRequestHeader('Content-type','application/json');
	insertRequest.setRequestHeader('Authorization','Bearer '+auth_token);
	insertRequest.send(JSON.stringify({type: "insert",args:{table: "extRecruitment", objects: [{ recruitDetails: recruitDetails,
																						recruitLink: recruitLink}]}}));
}

function addsuccessStoryQueue(/*storyNo, story*/) {
	var insertRequest = new XMLHttpRequest();
	insertRequest.onreadystatechange=function() {
		if(insertRequest.readyState===XMLHttpRequest.DONE && insertRequest.status===200) {
			alert("Notification Added!");
			storyQueue();
		}
	}
	var storyTitle = document.getElementById('storyTitle').value;
	var story = document.getElementById('story').value;

	insertRequest.open('POST', "https://data.affirmatively33.hasura-app.io/v1/query",true);
	insertRequest.setRequestHeader('Content-type','application/json');
	insertRequest.setRequestHeader('Authorization','Bearer '+auth_token);
	insertRequest.send(JSON.stringify({type: "insert",args:{table: "successStory", objects: [{storyTitle: storyTitle,
																							 story: story}]}}));
}

function addCSDomainsQueue(domainID, domainName, domaindetails) {
	var insertRequest = new XMLHttpRequest();
	insertRequest.onreadystatechange=function() {
		if(insertRequest.readyState===XMLHttpRequest.DONE && insertRequest.status===200) {
			alert("Option Added!");
			requestList();
		}
	}
	selectRequest.open('POST', "https://data.affirmatively33.hasura-app.io/v1/query",true);
	selectRequest.setRequestHeader('Content-type','application/json');
	selectRequest.setRequestHeader('Authorization','Bearer '+auth_token);
	selectRequest.send(JSON.stringify({type: "insert",args:{table: "CSDomains", objects: {"domainID": "domainID",
																						"domainName": "domainName",
																						"domaindetails": "domaindetails"}}}));
}

function addsoftskillsQueue(skillID, skillName, skillLink) {
	var insertRequest = new XMLHttpRequest();
	insertRequest.onreadystatechange=function() {
		if(insertRequest.readyState===XMLHttpRequest.DONE && insertRequest.status===200) {
			alert("Option Added!");
			requestList();
		}
	}
	selectRequest.open('POST', "https://data.affirmatively33.hasura-app.io/v1/query",true);
	selectRequest.setRequestHeader('Content-type','application/json');
	selectRequest.setRequestHeader('Authorization','Bearer '+auth_token);
	selectRequest.send(JSON.stringify({type: "insert",args:{table: "softskills", objects: {"skillID": "skillID",
																						"skillName": "skillName",
																						"skillLink": "skillLink"}}}));
}

/*
function storyQueue() {
	var notifBar = "";
	var notifList;
	var selectRequest = new XMLHttpRequest();
	selectRequest.onreadystatechange=function() {
		if(selectRequest.readyState===XMLHttpRequest.DONE && selectRequest.status===200) {
			notifList = JSON.parse(selectRequest.responseText);
			var n = notifList.length;
			for(var i=0; i < n; i++) {
				var data = {
					story : notifList[i].story
					}
				notifBar += createCardNotifQueue(data);
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
	selectRequest.send(JSON.stringify({type: "select",args:{table: "successStories", columns:["*"], order_by:"addtime"}}));
}
*/


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
                  <th class="tg-yw4l"><h4><a href=$(companyLink)> ${companyName}- ${arrivalDate} </a></h4></th><td> <span class="glyphicon glyphicon-remove" onclick="deletecompanyQueue(${companyNo})"></span> </td>
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
<th class="tg-yw4l"><h4><a href=${recruitLink}> ${recruitDetails}</a></h4></th><td> <span class="glyphicon glyphicon-remove" onclick="deleteextRecruitmentQueue(${recruitNo})"></span> </td>
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
                  <th class="tg-yw4l"><h4>  ${storyTitle} </h4><p>${story}</p></th><td> <span class="glyphicon glyphicon-remove" onclick="deletesuccessStoryQueue(${storyNo})"></span> </td>
                </tr>
                
             </table>
		`;
		return cardTemplateNotifQueue;	
}

function extEventCardNotifQueue(data) {
	var eventLink = data.eventLink;
	var eventDetails1 = data.eventDetails;
	var eventOrgsr1 = data.eventOrgsr;
	var notifID = data.notifID;
	var cardTemplateNotifQueue = `
			<table class="tg">
                <tr>
                  <th class="tg-yw4l"><h4><a href=${eventLink}> ${eventDetails1}- ${eventOrgsr1} ${eventLink}</a></h4></th><td> <span class="glyphicon glyphicon-remove" onclick="deleteextNotificationQueue(${notifID})"></span> </td>
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
                  <th class="tg-yw4l"><h4> ${eventDetails} - ${eventOrgsr}</h4></th><td> <span class="glyphicon glyphicon-remove" onclick="deleteintNotificationQueue(${notifID})"></span> </td>
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
				<th class="tg-yw4l"><h4><a href=${projLink}> ${projectTitle} </a>(${keywords}) - ${contributors}</h4></th><td> <span class="glyphicon glyphicon-remove" onclick="deleteprojPoolQueue(${projID})"></span> </td>
                </tr>
                
             </table>
		`;
		return cardTemplateNotifQueue;	
}

/*
function CSDomainCardQueue(data) {
	var domaindetails = data.domaindetails;
	var domainName = data.domainName;
	var domainName = data.domainName;

	var cardTemplateNotifQueue = `
		<table class="tg">
                <tr>
<th class="tg-yw4l"><h4><a href=${domaindetails}> ${domainName} </a></h4></th><td> <span class="glyphicon glyphicon-remove" onclick="deleteintNotificationQueue(${notifID})"></span> </td>
                </tr>
                
             </table>
		`;
		return cardTemplateNotifQueue;	
}



function extEventCardNotifQueue(data) {
	var eventLink = data.eventLink;
	var eventDetails1 = data.eventDetails;
	var eventOrgsr1 = data.eventOrgsr;
	var notifID = data.notifID;
	var cardTemplateNotifQueue = `
			<table class="tg">
                <tr>
                  <th class="tg-yw4l"><h4><a href=${eventLink}> ${eventDetails1}- ${eventOrgsr1}</a></h4></th><td> <span class="glyphicon glyphicon-remove" onclick="deleteextNotificationQueue(${notifID})"></span> </td>
                </tr>
                
             </table>
			  `;
		return cardTemplateNotifQueue;	
}

function intEventCardNotifQueue(data) {
	var eventDetails = data.eventDetails;
	var eventOrgsr = data.eventOrgsr;
	
	var cardTemplateNotifQueue = `
		<table class="tg">
                <tr>
                  <th class="tg-yw4l"><h4> ${eventDetails1} - ${eventOrgsr}</h4></th><td> <span class="glyphicon glyphicon-remove" onclick="deleteintNotificationQueue(${notifID})"></span> </td>
                </tr>
                
             </table>
		`;
		return cardTemplateNotifQueue;	
}*/
