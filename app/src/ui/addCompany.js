var auth_token;

function addpastCompany() {
	auth_token =  Cookies.get('auth_token');
	var insertRequest = new XMLHttpRequest();
	insertRequest.onreadystatechange=function() {
		if(insertRequest.readyState===XMLHttpRequest.DONE && insertRequest.status===200) {
			alert("Record Added!");
			//requestList();
		}
		else
		{
			alert("Invalid Input!");
		}
	}
	var compID = document.getElementById('compID').value;
	var year = document.getElementById('year').value;
	var ctc = document.getElementById('ctc').value;
	var noOfIntakes = document.getElementById('noOfIntakes').value;
	insertRequest.open('POST', "https://data.affirmatively33.hasura-app.io/v1/query",true);
	insertRequest.setRequestHeader('Content-type','application/json');
	insertRequest.setRequestHeader('Authorization','Bearer '+auth_token);
	insertRequest.send(JSON.stringify({type: "insert",args:{table: "companyDetails", objects: [{
																						compID: compID,
																						year: year,
																						noOfIntakes: noOfIntakes,
																						ctc: ctc}]}}));
}

function addCompanyInfo() {
	auth_token =  Cookies.get('auth_token');
	var insertRequest = new XMLHttpRequest();
	insertRequest.onreadystatechange=function() {
		if(insertRequest.readyState===XMLHttpRequest.DONE && insertRequest.status===200) {
			alert("Record Added!");
			//requestList();
		}
	}
	var compName = document.getElementById('compName').value;
	var compHtml = document.getElementById('compHtml').value;
	var logoLink = document.getElementById('logoLink').value;
	insertRequest.open('POST', "https://data.affirmatively33.hasura-app.io/v1/query",true);
	insertRequest.setRequestHeader('Content-type','application/json');
	insertRequest.setRequestHeader('Authorization','Bearer '+auth_token);
	insertRequest.send(JSON.stringify({type: "insert",args:{table: "companyInfo", objects: [{
																						compName: compName,
																						compHtml: compHtml,
																						logoLink: logoLink}]}}));
}

function showCompanyInfo()
{
	auth_token =  Cookies.get('auth_token');
	var notifBar = "";
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
				notifBar += displaypastComapanyData(notifList[i]);
			}
			if(notifBar === "") {
				notifBar = "<h4>No Data!</h4>";
			}
			companyDet.innerHTML = notifBar;
		}
	}
	selectRequest.open('POST', "https://data.affirmatively33.hasura-app.io/v1/query",true);
	selectRequest.setRequestHeader('Content-type','application/json');
	selectRequest.setRequestHeader('Authorization','Bearer '+auth_token);
	selectRequest.send(JSON.stringify({type: "select",args:{table: "companyInfo", columns:["*"]}}));
}


function displaypastComapanyData(data) {
	var compID = data.compID;
	var compName = data.compName;
	var cardTemplateNotifQueue = `
		<table>
			<tr>
			  <th class="tg-yw4l"><b>${compID} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</b></</th>
					  <th class="tg-yw4l"><b>${compName}</b></th>
			</tr>
		</table>
		`;
		return cardTemplateNotifQueue;	
}

 