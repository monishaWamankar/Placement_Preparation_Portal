var auth_token;
// var test= document.getElementById('test');
//window.onload = addDomainFun;	
// test.onclick = addDomainFun();
function addDomainFun(){
	auth_token =  Cookies.get('auth_token');
	var insertRequest = new XMLHttpRequest();
	insertRequest.onreadystatechange=function() {
		if(insertRequest.readyState===XMLHttpRequest.DONE && insertRequest.status===200) {
			alert("Domain Added!");
			// selectQuiz();
		}
		//console.log(insertRequest.responseText);
	}
	var domaindetails = document.getElementById('htmlInput').value;
	var domainName = document.getElementById('domainName').value;
	insertRequest.open('POST', "https://data.affirmatively33.hasura-app.io/v1/query",true);
	insertRequest.setRequestHeader('Content-type','application/json');
	insertRequest.setRequestHeader('Authorization','Bearer '+auth_token);
	insertRequest.send(JSON.stringify({type: "insert",args:{table: "CSDomains", objects: [{																								
																								domainName: domainName,
																								domaindetails: domaindetails
																						}]}}));
}
