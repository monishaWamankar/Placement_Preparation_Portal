var auth_token;
var quizLink;
//window.onload = selectQuiz;	
function addQuizFun(){
	auth_token =  Cookies.get('auth_token');
	var insertRequest = new XMLHttpRequest();
	insertRequest.onreadystatechange=function() {
		if(insertRequest.readyState===XMLHttpRequest.DONE && insertRequest.status===200) {
			alert("Quiz Added!");
			selectQuiz();
		}
		//console.log(insertRequest.responseText);
	}
	var quizDate = document.getElementById('quizDate').value;
	var quizLink = document.getElementById('quizLink').value;
	var quizName = document.getElementById('quizName').value;
	var batch = document.getElementById('batch').value;
	insertRequest.open('POST', "https://data.affirmatively33.hasura-app.io/v1/query",true);
	insertRequest.setRequestHeader('Content-type','application/json');
	insertRequest.setRequestHeader('Authorization','Bearer '+auth_token);
	insertRequest.send(JSON.stringify({type: "insert",args:{table: "addQuiz", objects: [{																								
																								quizDate: quizDate,
																								quizLink: quizLink,
																								quizName: quizName,
																								batch:batch
																						}]}}));
}

function deleteQuiz(quizID){
	var deleteRequest = new XMLHttpRequest();
	deleteRequest.onreadystatechange=function() {
		if(deleteRequest.readyState===XMLHttpRequest.DONE && deleteRequest.status===200) {
			alert("Quiz Deleted!");
			selectQuiz();
		}
	}
	deleteRequest.open('POST', "https://data.affirmatively33.hasura-app.io/v1/query",true);
	deleteRequest.setRequestHeader('Content-type','application/json');
	deleteRequest.setRequestHeader('Authorization','Bearer '+auth_token);
	deleteRequest.send(JSON.stringify({type: "delete",args:{table: "addQuiz", where: {quizID: {"$eq": quizID}}}}));	
}

function selectQuiz() {
	var notifBar = "";
	var notifList;
	auth_token =  Cookies.get('auth_token');
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
				notifBar += quizTemplate(notifList[i]);
			}
			if(notifBar === "") {
				notifBar = "<h3>Empty List!</h3>";
			}
			box7.innerHTML = notifBar;
		}
	}
	selectRequest.open('POST', "https://data.affirmatively33.hasura-app.io/v1/query",true);
	selectRequest.setRequestHeader('Content-type','application/json');
	selectRequest.setRequestHeader('Authorization','Bearer '+auth_token);
	selectRequest.send(JSON.stringify({type: "select",args:{table: "addQuiz", columns:["*"], order_by:"quizDate"}}));
}

function quizTemplate(data) {
	var quizDate = data.quizDate;
	var quizName = data.quizName;
	quizLink = data.quizLink;
	var quizID = data.quizID;
	var batch = data.batch;
	var data1 = JSON.stringify(data);
	console.log('Link '+quizLink);
	var cardTemplateNotifQueue = `
		<table class="tg">
                <tr>
                  <th class="tg-yw4l" width="500px"><h4><a href=${quizLink}> ${quizName}</a> - (${quizDate})</h4></th>
					<td> <a><span onclick = "startQuiz();" class="glyphicon glyphicon-forward" style="color: green"  title="Start Quiz"></span></a> </td>
				  <td width="40px"> <span class="glyphicon glyphicon-remove" onclick="deleteQuiz(${quizID})" title="Delete"></span> </td>
				  
				  <!-- need to fis this -->
                </tr>
                
             </table>
		`;
		return cardTemplateNotifQueue;	
}

function startQuiz()
{
	// console.log('Test Link '+data1 );
	var deleteRequest = new XMLHttpRequest();
	deleteRequest.onreadystatechange=function() {
		if(deleteRequest.readyState===XMLHttpRequest.DONE && deleteRequest.status===200) {
			alert("On Going Quiz Deleted!");
			//console.log(insertRequest.responseText);
			addOnGoingQuiz();
		}
		//console.log(deleteRequest.responseText);
	}
	deleteRequest.open('POST', "https://data.affirmatively33.hasura-app.io/v1/query",true);
	deleteRequest.setRequestHeader('Content-type','application/json');
	deleteRequest.setRequestHeader('Authorization','Bearer '+auth_token);
	deleteRequest.send(JSON.stringify({type: "run_sql",args:{sql: 'DELETE FROM "onGoingQuiz"'}}));
}

function addOnGoingQuiz(){
	
	auth_token =  Cookies.get('auth_token');
	var insertRequest = new XMLHttpRequest();
	insertRequest.onreadystatechange=function() {
		if(insertRequest.readyState===XMLHttpRequest.DONE && insertRequest.status===200) {
			alert("Quiz Started!");
			selectQuiz();
		}
		else
		{
			//console.log('quizID '+data);
			//console.log(insertRequest.responseText);
		}
			
			
	}
	
	
	// var batch = document.getElementById('batch').value;
	insertRequest.open('POST', "https://data.affirmatively33.hasura-app.io/v1/query",true);
	insertRequest.setRequestHeader('Content-type','application/json');
	insertRequest.setRequestHeader('Authorization','Bearer '+auth_token);
	insertRequest.send(JSON.stringify({type: "insert",args:{table: "onGoingQuiz", objects: [{																								
																								//quizDate: quizDate,
																								quizLink: quizLink
																								//quizID: quizID,
																								//batch:batch
																						}]}}));
}

function getQuizLink() {
	var notifBar = "";
	var notifList;
	auth_token =  Cookies.get('auth_token');
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
				notifBar += quizTemplate2(notifList[i]);
			}
			if(notifBar === "") {
				notifBar = "<h3>Empty List!</h3>";
			}
			getLink.innerHTML = notifBar;
		}
	}
	selectRequest.open('POST', "https://data.affirmatively33.hasura-app.io/v1/query",true);
	selectRequest.setRequestHeader('Content-type','application/json');
	selectRequest.setRequestHeader('Authorization','Bearer '+auth_token);
	selectRequest.send(JSON.stringify({type: "select",args:{table: "onGoingQuiz", columns:["*"]}}));
}

function quizTemplate2(data) {
	//var quizDate = data.quizDate;
	//var quizName = data.quizName;
	quizLink = data.quizLink;
	//var quizID = data.quizID;
	//var batch = data.batch;
	//var data1 = JSON.stringify(data);
	//console.log('Link '+quizLink);
	var cardTemplateNotifQueue = `
	<iframe src="${quizLink}"  style="over-flow: scroll; "> </iframe>        
		`;
		return cardTemplateNotifQueue;	
}

function stopQuiz()
{
	// console.log('Test Link '+data1 );
	var deleteRequest = new XMLHttpRequest();
	deleteRequest.onreadystatechange=function() {
		if(deleteRequest.readyState===XMLHttpRequest.DONE && deleteRequest.status===200) {
			alert("Quiz Stoped!");
			//console.log(insertRequest.responseText);
			//addOnGoingQuiz();
		}
		//console.log(deleteRequest.responseText);
	}
	deleteRequest.open('POST', "https://data.affirmatively33.hasura-app.io/v1/query",true);
	deleteRequest.setRequestHeader('Content-type','application/json');
	deleteRequest.setRequestHeader('Authorization','Bearer '+auth_token);
	deleteRequest.send(JSON.stringify({type: "run_sql",args:{sql: 'DELETE FROM "onGoingQuiz"'}}));
}