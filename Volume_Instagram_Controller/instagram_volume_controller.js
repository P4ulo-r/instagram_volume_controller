// Verificação e armazenamento em localStorage
if(localStorage.getItem("instagram_volume") === null){
	localStorage.setItem("instagram_volume", "1.0");
}

// Método para criar atributos
function setAttributes(elem, attrs){
	for(var key in attrs){
		elem.setAttribute(key, attrs[key]);
	}
}

// Interface
const controls = document.createElement('div');
setAttributes(controls, {
	"id": "ivc-controls",
	"style": "position:fixed; top:0; right:0; border-bottom-left-radius: 5px; width:75px; max-height:250px; background-color:rgba(0,0,0,0.75); z-index:9999; display:none;"
});

const controlVolume = document.createElement('input');
setAttributes(controlVolume, {
	"id": "ivc-volume",
	"type": "range",
	"min": "0.00",
	"max": "1.00",
	"step": "0.001",
	"style": "-webkit-appearance:slider-vertical; margin:15px 25px; width:25px; height:170px; display:block;",
	"value": localStorage.getItem("instagram_volume")
});

const displayVolume = document.createElement('p');
setAttributes(displayVolume, {
	"id": "ivc-display",
	"style": "margin:15px auto; font-size:20px; color:#FFF; text-align:center;"
});

document.body.appendChild(controls);
const ivcControls = document.getElementById("ivc-controls");
ivcControls.appendChild(controlVolume);
ivcControls.appendChild(displayVolume);

// Toggle
document.body.onkeypress = function(){
	if(event.key == "'"){
		if(ivcControls.style.display === "none"){
			ivcControls.style.display = "block";
		}else{
			ivcControls.style.display = "none";
		}
	}
};

// Update Volume
function UpdateVolume(){
	const ivcVolume = document.getElementById("ivc-volume");
	const ivcDisplay = document.getElementById("ivc-display");
	const instagramVideos = document.querySelectorAll("video");
	
	localStorage.setItem("instagram_volume", String(ivcVolume.value));

	for(var i=0; i<instagramVideos.length; i++){
		instagramVideos[i].volume = parseFloat(localStorage.getItem("instagram_volume"));
	}

	ivcDisplay.innerHTML = String(Math.floor(parseFloat(localStorage.getItem("instagram_volume")) * 100));
}

UpdateVolume();
setInterval(function(){ UpdateVolume(); }, 100);