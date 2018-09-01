var auth_token;
function addsoftSkills() {
	auth_token =  Cookies.get('auth_token');
	var insertRequest = new XMLHttpRequest();
	insertRequest.onreadystatechange=function() {
		if(insertRequest.readyState===XMLHttpRequest.DONE && insertRequest.status===200) {
			alert("Record Added!");
			//requestList();
		}
	}
	var skillHtml = document.getElementById('skillHtml').value;
	var skillName = document.getElementById('skillName').value;
	insertRequest.open('POST', "https://data.affirmatively33.hasura-app.io/v1/query",true);
	insertRequest.setRequestHeader('Content-type','application/json');
	insertRequest.setRequestHeader('Authorization','Bearer '+auth_token);
	insertRequest.send(JSON.stringify({type: "insert",args:{table: "softskills", objects: [{skillName: skillName,
																							skillHtml: skillHtml}]}}));
}

/*function projPoolCardNotifQueue(data) {
	var skillID = data.skillID;
	var skillName = data.skillName;
	var skillHtml = data.skillHtml;
	var cardTemplateNotifQueue = `
		${skillHtml}
	`;
		return cardTemplateNotifQueue;	
}*/