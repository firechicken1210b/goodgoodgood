console.log("myApp");

function addElementDiv(obj,i) {
	var parent = document.getElementById(obj);
	var a = document.createElement("a");
	//a.setAttribute("href", "page"+i+".html");
	a.setAttribute("href", "mail.html");
	a.setAttribute("class", "ic_a");
	var div = document.createElement("div");
	div.setAttribute("class", "index_container-mail_"+i%2);
	div.innerHTML = "js 動s態新增div "+i;
	a.appendChild(div);
	parent.appendChild(a);
	console.log("112ss3");
}

function addss() {
	for (i = 0; i < 36; i++) { 
		addElementDiv("index_container",i);
	}
}
addss();