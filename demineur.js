var canvas  = document.querySelector('#canvas');
var context = canvas.getContext('2d');

var largeur = 15;
var hauteur = 10;
var taille_case = 30;
var densite = 0.4;
var tirage = 0;
var drapeau = false;


context.font = "normal 15pt Calibri,Geneva,Arial";
context.fillStyle = "black";

function afficherChiffre(n,i,j){
	context.fillStyle = "grey";
	context.fillRect(i*taille_case, j*taille_case, taille_case, taille_case)
	context.strokeRect(i*taille_case, j*taille_case, taille_case, taille_case)

	if (n == 0){
		context.fillStyle = "grey";
	} else if (n == 1) {
		context.fillStyle = "red";
	} else if (n == 2) {
		context.fillStyle = "green";
	} else if (n == 3) {
		context.fillStyle = "blue";
	} else if (n == 4) {
		context.fillStyle = "pink";
	} else if (n == 5) {
		context.fillStyle = "gold";
	}

	context.fillText(n, (0.3+i)*taille_case, (0.8+j)*taille_case);

}

function reveler(i,j){
	reveles[i][j] = true;
	afficherChiffre(voisins[i][j],i, j);
	for (var x = -1 ; x <= 1 ; x++){
		for (var y = -1 ; y <= 1 ; y++){
			if (x != y && (x == 0 || y == 0)&& 0 <= i+x && i+x < largeur && 0 <= j+y && j+y < hauteur && !grille[i+x][j+y] && !reveles[i+x][j+y]){
				reveler(i+x,j+y);
			}
		}
	}

}


function click(e){
	var i = Math.round(e.clientX / taille_case) - 1;
	var j = Math.round(e.clientY / taille_case) - 1;

	if (!drapeau){
		if (grille[i][j]){
			alert('PERDU');
		} else{
			reveler(i,j);
		}
	} else {
		if (!marques[i][j]){
			context.fillStyle = 'black';

			context.beginPath();
			context.arc((i+0.5) * taille_case, (j+0.5) * taille_case, 10, 0, 2*Math.PI);
			context.fill();
			marques[i][j] = true;
		} else {
			marques[i][j] = false;
			context.fillStyle = "white";
			context.fillRect(i*taille_case, j*taille_case, taille_case, taille_case)
			context.strokeRect(i*taille_case, j*taille_case, taille_case, taille_case)

		} 
	}
}

function change(e){
	drapeau = !drapeau;
}

var grille = Array(largeur);
var voisins = Array(largeur);
var reveles = Array(largeur);
var marques = Array(largeur);

var element = document.getElementById('canvas');
var field = document.getElementById('field');

document.addEventListener('click', click);
document.addEventListener('keyup', change);


context.lineWidth = "2";
context.strokeStyle = 'black';
for (var i = 0 ; i < largeur ; i++){
	grille[i] = Array(hauteur)
	for (var j = 0 ; j < hauteur ; j++){
		context.strokeRect(i*taille_case, j*taille_case, taille_case, taille_case)
		
		tirage = Math.random();
		if (tirage < densite){
			grille[i][j] = true;

		} else{
			grille[i][j] = false;
		}


	}
}


for (var i = 0 ; i < largeur ; i++){
	voisins[i] = Array(hauteur)
	for (var j = 0 ; j < hauteur ; j++){

		voisins[i][j] = 0;

		if (!grille[i][j]){
			for (var x = -1 ; x <= 1 ; x++){
				for (var y = -1 ; y <= 1 ; y++){
					if (0 <= i+x && i+x < largeur && 0 <= j+y && j+y < hauteur && grille[i+x][j+y]){
						voisins[i][j] = voisins[i][j]+1;
					}
				}
			}
		}
	}
}

for (var i = 0 ; i < largeur ; i++){
	reveles[i] = Array(hauteur);
	marques[i] = Array(hauteur);
	for (var j = 0 ; j < hauteur ; j++){
		reveles[i][j] = false;
		marques[i][j] = false;
	}
}

function getCoords(el,event) {
  var ox = el.scrollLeft - el.offsetLeft,
  oy = el.scrollTop - el.offsetTop;
  while(el=el.offsetParent){
    ox += el.scrollLeft - el.offsetLeft;
    oy += el.scrollTop - el.offsetTop;
  }
  aletr( {x:event.clientX + ox , y:event.clientY + oy});
}


