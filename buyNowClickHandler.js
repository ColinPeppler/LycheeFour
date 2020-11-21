const buyNowButton = document.getElementById('buy-now-button')
if (buyNowButton != null) {
	buyNowButton.onclick = () => {
		console.log('yeet.. i sleep now 5 secs')
		sleep(5);
	};
}

const sleep = secs => await new Promise(r => setTimeout(r, 1000 * secs));
