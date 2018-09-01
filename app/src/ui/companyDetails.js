var auth_token;
var companyID;
function fetchpastCompanyDetails(compID) {	
companyID = compID;
//console.log('CompanyID '+companyID);
var url = window.location.href;
if(!url.includes("/company-details"))
{
	window.location = '/company-details/'+companyID;
}

auth_token =  Cookies.get('auth_token');
var notifBar = "";
var notifBar1 = "";
var notifList;
var selectRequest = new XMLHttpRequest();
selectRequest.onreadystatechange=function() {
	if(selectRequest.readyState===XMLHttpRequest.DONE && selectRequest.status===200) {
		notifList = JSON.parse(selectRequest.responseText);
		var n = notifList.length;
		for(var i=0; i < n; i++) {
			/*var data = {
				year : notifList[i].year;
				ctc : notifList[i].ctc;
				noOfIntakes : notifList[i].noOfIntakes;
				}*/
			notifBar += htmlTemplate(notifList[i]);
			notifBar1 += nameTemplate(notifList[i]);
			fetchpastCompanyPlacementDetails(compID);
		}
		if(notifBar === "") {
			notifBar = "<h6>Details not found!</h6>";
		}
		compHtml.innerHTML = notifBar;
		compName.innerHTML = notifBar1;
	}
}
selectRequest.open('POST', "https://data.affirmatively33.hasura-app.io/v1/query",true);
selectRequest.setRequestHeader('Content-type','application/json');
selectRequest.setRequestHeader('Authorization','Bearer '+auth_token);
selectRequest.send(JSON.stringify({type: "select",args:{table: "companyInfo", columns:["*"], where:{compID: compID}}}));
}

function fetchpastCompanyPlacementDetails(compID) {
auth_token =  Cookies.get('auth_token');
var notifBar = "";
//var notifBar1 = "";
var notifList;
var selectRequest = new XMLHttpRequest();
selectRequest.onreadystatechange=function() {
	if(selectRequest.readyState===XMLHttpRequest.DONE && selectRequest.status===200) {
		notifList = JSON.parse(selectRequest.responseText);
		var n = notifList.length;
		for(var i=0; i < n; i++) {
			/*var data = {
				year : notifList[i].year;
				ctc : notifList[i].ctc;
				noOfIntakes : notifList[i].noOfIntakes;
				}*/
			notifBar += tableTemplate(notifList[i]);
			//notifBar1 += nameTemplate(notifList[i]);
		}
		if(notifBar === "") {
			notifBar = "<h1>Details not found!</h1>";
		}
		placementTable.innerHTML = notifBar;
		//compName.innerHTML = notifBar1;
	}
}
selectRequest.open('POST', "https://data.affirmatively33.hasura-app.io/v1/query",true);
selectRequest.setRequestHeader('Content-type','application/json');
selectRequest.setRequestHeader('Authorization','Bearer '+auth_token);
selectRequest.send(JSON.stringify({type: "select",args:{table: "companyDetails", columns:["*"], where:{compID: compID}}}));
}

/*function addpastCompany(compID) {
auth_token =  Cookies.get('auth_token');
var insertRequest = new XMLHttpRequest();
insertRequest.onreadystatechange=function() {
	if(insertRequest.readyState===XMLHttpRequest.DONE && insertRequest.status===200) {
		alert("Record Added!");
		requestList();
	}
}
insertRequest.open('POST', "https://data.affirmatively33.hasura-app.io/v1/query",true);
insertRequest.setRequestHeader('Content-type','application/json');
insertRequest.setRequestHeader('Authorization','Bearer '+auth_token);
insertRequest.send(JSON.stringify({type: "insert",args:{table: "successStory", objects: {"year": "year",
																					"noOfIntakes": "noOfIntakes",
																					"ctc": "ctc"}}}));
}*/



function htmlTemplate(data) {
// var compName = data.compName;
var compHtml = data.compHtml;
var cardTemplateNotifQueue = `
	${compHtml}
	`;
	return cardTemplateNotifQueue;	
}

function nameTemplate(data) {
var compName = data.compName;
// var compHtml = data.compHtml;
var cardTemplateNotifQueue = `
	${compName}
	`;
	return cardTemplateNotifQueue;	
}

function tableTemplate(data) {
var year = data.year;
var ctc = data.ctc;
var noOfIntakes = data.noOfIntakes;
// var compHtml = data.compHtml;
var cardTemplateNotifQueue = `
	<table>
	  <tr>
		 <td width= "47%">${year}</td>
		 <td width= "45%">${noOfIntakes}</td>
		 <td width= "21%">${ctc}</td>
	  </tr>
   </table>
	`;
	return cardTemplateNotifQueue;	
}
