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
	'style': 'display: none;'
});

setAttributes(elements[1], {
	'id': 'ivc-volume',
	'type': 'range',
	'min': '0.00',
	'max': '1.00',
	'step': '0.001',
	'value': localStorage.getItem('instagram_volume')
});

setAttributes(elements[2], {
	'id': 'ivc-display'
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

// Set Loop
setInterval(() => {	
	localStorage.setItem('instagram_volume', String(document.querySelector('#ivc-volume').value));

	document.querySelectorAll('video').forEach(e => {
		e.volume = parseFloat(localStorage.getItem('instagram_volume'));
		e.controls = true;
		e.loop = true;
		e.muted = ivcControls.style.display === 'none';
	});

	document.querySelector('#ivc-display').innerHTML = `${String(Math.floor(parseFloat(localStorage.getItem('instagram_volume')) * 100))}%`;

	document.querySelectorAll('[data-visualcompletion]').forEach((e) => {
		if(e.querySelector('div > div > div[aria-label="Reproduzir"]'))
			e.remove();
	});
}, 100);

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