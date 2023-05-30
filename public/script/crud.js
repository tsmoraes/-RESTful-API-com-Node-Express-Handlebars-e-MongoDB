function myFunction(id, nome, idade) {
	var idUser = document.querySelector("#formul");
	idUser.setAttribute("action", 'api/update/' + id + '?_method=PATCH');

	var nomeUser = document.querySelector("#recuperaNome");
	nomeUser.setAttribute("value", nome);

	var idadeUser = document.querySelector("#recuperaIdade");
	idadeUser.setAttribute("value", idade);

	/*if (gender) {
		document.getElementById("radioM").checked = true;
	} else {
		document.getElementById("radioF").checked = true;
	}*/
}