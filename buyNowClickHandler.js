'use strict';

const closeDialogAndInject = (page, dialog) => {page.removeChild(dialog); dialog.close(); injectDialog()};

async function injectDialog() {
	/* Create dialog modal */
	let paragraph = "Hey! Looks like this might be an impulsive purchase 👀 Are you sure you need this?"
	let redBtn = redButton("No, put it back", "no-btn")
	const whiteBtn = `
		<div id="white-btn" style="width: 80px; line-height:35px; margin-left: 32px">
			Yes I\'m sure.
		</div>
	`
	const dialog = createDialogElement()
	let lowerBody = paragraphButtonComponent(paragraph, redBtn + whiteBtn);
	dialog.innerHTML = getBaseCard(lowerBody);

	const page = document.getElementById('a-page')
	if (page == null) return;
	page.appendChild(dialog);
	updateMoneyAndPoints()

	/* Set onClick for close dialog */
	const setupCloseDialog = () => {
		let closeDialogs = document.getElementsByClassName('close-dialog')
		closeDialogs = Array.from(closeDialogs)
		closeDialogs.map(closeDialog => closeDialog.addEventListener('click', () => {
			closeDialogAndInject(page, dialog)
		}));
	}
	setupCloseDialog()

	/* Set onClick for No, Put It back */
	const noBtn = document.getElementById('no-btn')
	noBtn.addEventListener('click', () => {
		const updateUI = () => {
			// change body paragraph and button
			paragraph = "Phew — impulsive purchase avoided. Keep it up! 💸"
			redBtn = redButton("Yay! +25 points", "red-exit-btn")
			lowerBody = paragraphButtonComponent(paragraph, redBtn);
			dialog.innerHTML = getBaseCard(lowerBody);

			// set on click for new red "yay +25" btn
			const redExitBtn = document.getElementById('red-exit-btn')
			redExitBtn.addEventListener('click', () => {
				closeDialogAndInject(page, dialog)
			});

			setupCloseDialog()
		}

		// update money and points
		buy_btn_no(() => {updateMoneyAndPoints(); updateUI();});
	});
	
	const buyNowButton = document.getElementById('buy-now-button')

	/* set onClick for Yes Im sure */
	const yesBtn = document.getElementById('white-btn');
	yesBtn.addEventListener('click', () => { 
		const form = document.getElementById('addToCart')
		form.submit();
	});
		

	if (buyNowButton != null) {
		// cancels the onClick
		$("#buy-now-button").click(ev => { ev.preventDefault(); });
		buyNowButton.addEventListener('click', () => {
			if (dialog && !dialog.open)
				dialog.showModal()
		});
	}
}

function updateMoneyAndPoints() {
	console.log('update money')
	chrome.storage.local.get(['Point', 'Saved_money'], (res) => {
		const pts = res.Point
		const savedAmt = res.Saved_money
		let ptsElems = document.getElementsByClassName('points')
		ptsElems = Array.from(ptsElems)
		let amtElems = document.getElementsByClassName('saved-amt')
		amtElems = Array.from(amtElems)
		console.log('updateMoneyAndpoints', pts, savedAmt)
		ptsElems.map(ptsElem => ptsElem.innerHTML = pts)
		amtElems.map(amtElem => amtElem.innerHTML = '$' + savedAmt.toString())
	});
}


/** For Context Menu **/
function showPetHome() {
	const dialog = createDialogElement('my-dialog')
	const img = '<img id="pet-img" src="" width="auto" height="125" alt="pet"/>'
	const lycheeImgUrl = chrome.extension.getURL('images/lychee.png')
	const body = `
		<div style="display: flex; flex-direction: column">
			${img}
			<div id="lychee">
				<img src="${lycheeImgUrl}" height="64px" width="64px"/>
			</div>
		</div>
	`

	dialog.innerHTML = getBaseCard(body);

	const page = document.getElementById('a-page')
	if (page == null) return;
	page.appendChild(dialog);

	updateMoneyAndPoints()

	const changePetImg = () => {
		get_petName(res => {
			res = res.toLowerCase()
			const imgUrl = chrome.extension.getURL('images/pets/'+res+'.png')			
			console.log(imgUrl)
			const petImg = document.getElementById('pet-img')
			petImg.src = imgUrl

			/* change pet size */
			if (res.slice(-1) == '2') {
				petImg.height = '180'
			}
		})
	}
	changePetImg()

	/* onClick to feed pet */
	const lychee = document.getElementById('lychee')
	lychee.addEventListener('click', () => {
		console.log('adding points to pet')
		add_points(25, () => {updateMoneyAndPoints(); changePetImg();})				
	});

	dialog.showModal()
}

chrome.extension.onMessage.addListener(function (message, sender, callback) {
	if (message.functiontoInvoke == "showPetHome")
		showPetHome();
});

