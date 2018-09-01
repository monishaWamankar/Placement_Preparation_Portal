var auth_token ;
var sID;


function selectSkill(skillID) {
	sID = skillID;
	//alert('skillID '+sID);
	var url = window.location.href;
	if(!url.includes("/softSkill"))
	{
		window.location = '/softSkill/'+sID;
	}

	auth_token = Cookies.get('auth_token'); 
	//alert('auth_token');
	//alert('skillID '+sID);
	var notifBar = "";
	var notifBar2 = "";
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
				notifBar += softSkillCardQueue1(notifList[i]);
				notifBar2 += softSkillCardQueue2(notifList[i]);
				
				
			}
			if(notifBar === "") {
				notifBar = "<h3>No Course Added!</h3>";
			}
			skillHtml.innerHTML = notifBar;
			skillName.innerHTML = notifBar2;
		}
		else{
			//console.log(selectRequest.responseText);
		}
	}
	selectRequest.open('POST', "https://data.affirmatively33.hasura-app.io/v1/query",true);
	selectRequest.setRequestHeader('Content-type','application/json');
	selectRequest.setRequestHeader('Authorization','Bearer '+auth_token);
	selectRequest.send(JSON.stringify({type: "select",args:{table: "softskills", columns:["*"], where: {skillID: skillID}}}));
}


function softSkillCardQueue1(data) {
	// var domaindetails = data.domaindetails;
	var skillHtml = data.skillHtml;

	var cardTemplateNotifQueue = `
	${skillHtml}		
		`;
		return cardTemplateNotifQueue;	
}

function softSkillCardQueue2(data) {
	var skillName = data.skillName;
	// var domainName = data.domainName;

	var cardTemplateNotifQueue = `
		 <div id="flip7" style="  margin-left: -17px; height:50px;width: 1008px; background-color: #70c0e4; padding-left: 10px; padding-top: 5px; font-size: 30px; text-align: left;">${skillName}</div>
		`;
		return cardTemplateNotifQueue;	
}