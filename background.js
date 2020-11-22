function genericOnClick(info, tab) {
	console.log("yeet");
	//Add all you functional Logic here
	chrome.tabs.query({
		"active": true,
		"currentWindow": true
	}, function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {
			"functiontoInvoke": "showPetHome"
		});
	});
}

chrome.contextMenus.create({
	type: "normal",
	id: 'demo',
	title: "Menu Demo",
	contexts: ['all'],
}) 

chrome.contextMenus.onClicked.addListener((info, tab) => {
	console.log('con click')
	genericOnClick(info, tab)
});
