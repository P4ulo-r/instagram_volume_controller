// Check localStorage
if(localStorage.getItem('instagram_volume') === null){
	localStorage.setItem('instagram_volume', '1.0');
}

// Function Apply Attrs
function setAttributes(elem, attrs){
	for(var key in attrs){
		elem.setAttribute(key, attrs[key]);
	}
}

// Function Hot key Interface
function Hotkey(){
	const ivcControls = document.querySelector('#ivc-controls');
	ivcControls.style.display = ivcControls.style.display === 'none' ? 'block' : 'none';
}

// Create Document
const elements = [document.createElement('div'), document.createElement('input'), document.createElement('p')];

setAttributes(elements[0], {
	'id': 'ivc-controls',
	'style': 'position: fixed; top: 100px; right: 0; border-bottom-left-radius: 5px; width: 75px; max-height: 250px; background-color: rgba(0, 0, 0, 0.75); z-index: 9999; display: none;'
});

setAttributes(elements[1], {
	'id': 'ivc-volume',
	'type': 'range',
	'min': '0.00',
	'max': '1.00',
	'step': '0.001',
	'style': 'writing-mode: vertical-rl; margin: 15px 25px; width: 25px; height: 170px; display: block; cursor: pointer;',
	'value': localStorage.getItem('instagram_volume')
});

setAttributes(elements[2], {
	'id': 'ivc-display',
	'style': 'margin: 15px auto; font-size: 20px; color: #FFFFFF; text-align: center;'
});

document.body.appendChild(elements[0]);
const ivcControls = document.querySelector('#ivc-controls');
ivcControls.appendChild(elements[1]);
ivcControls.appendChild(elements[2]);

// Event
document.body.addEventListener('keypress', (e) => {
	if(e.key === "'")
		Hotkey();
});

// Loop Function
function Loop(){	
	localStorage.setItem('instagram_volume', String(document.querySelector('#ivc-volume').value));

	document.querySelectorAll('video').forEach(e => {
		e.volume = parseFloat(localStorage.getItem('instagram_volume'));
		e.controls = true;
		e.loop = true;
		e.muted = ivcControls.style.display === 'none';
	});

	document.querySelector('#ivc-display').innerHTML = String(Math.floor(parseFloat(localStorage.getItem('instagram_volume')) * 100));

	document.querySelectorAll('[data-visualcompletion]').forEach(e => e.remove());
}

// Set Loop
setInterval(Loop, 100);

// Menu Context
const handleContextMenus = () => {
	chrome.contextMenus.removeAll();
	chrome.contextMenus.create({
		title: 'Controle de Volume do Instagram',
		id: 'IVCCM',
		contexts: ['all']
	});

	chrome.contextMenus.onClicked.addListener(Hotkey);
};