chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.sync.set({points: 0}, () => {
		console.log('Initialize points to 0!');
	});
});
