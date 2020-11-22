function createDialogElement(id='our-dialog') {
	const dialog = document.createElement('dialog')
	dialog.id = id
	dialog.style = `
		height: 460px;
		width: 390px;
		border: 0px solid black;
		box-shadow:
			0 2.8px 2.2px rgba(0, 0, 0, 0.02),
			0 6.7px 5.3px rgba(0, 0, 0, 0.028),
			0 12.5px 10px rgba(0, 0, 0, 0.035),
			0 22.3px 17.9px rgba(0, 0, 0, 0.042),
			0 41.8px 33.4px rgba(0, 0, 0, 0.05),
			0 100px 80px rgba(0, 0, 0, 0.07);
		border-radius: 5px;
	`
	return dialog
}


const cardStyle = `
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
	align-items: center;
	margin-top: 16px;
`

const font24 = "font-size: 24px"
const mb8 = "margin-bottom: 8px"

function getBaseCard(lowerBody) {
	const url = chrome.extension.getURL('images/logo.png')
	const exit_url = chrome.extension.getURL('images/exit.svg')

	return `
		<div style="${cardStyle}">
			<div style="display: flex; margin-bottom: 35px; margin-top: 2px">
				<img width="175" height"50" src="${url}"/>

				<div class="close-dialog" style="position: absolute; right: 24px; top: 36px;">
					<img src="${exit_url}"/>
				</div>
			</div>

			<div style="display: flex; margin-bottom: 40px">
				<div style="display: flex; flex-direction: column; margin-right: 100px; text-align: center;">
					<h6 style="${mb8}"> You\'ve saved: </h6>
					<h5 class="saved-amt" style="${font24}; color: #632C39"> $0 </h5>
				</div>

				<div style="display: flex; flex-direction: column; text-align: center;">
					<h6 style="${mb8}"> Points: </h6>
					<h5 class="points" style="${font24}; color: #E52C55"> 100 </h5>
				</div>
			</div>

			${lowerBody}
		</div>
	`
}

function paragraphButtonComponent(paragraph, buttonHTML) {
	return `
		<div style="font-size: 20px; width: 270px; line-height: 30px; text-align: center">
			${paragraph}
		</div>
		<div style="display: flex; margin-top: 32px">
			${buttonHTML}
		</div>
	`
}

function redButton(buttonText, id) {
	const redBtnStyle = `
		background-color: #E52C55;
		border-radius: 8px;
		width: 130px;
		height: 40px;
		text-align: center;
		line-height: 35px;
		color: white;
		font-size: 14px;
	`
	return `
		<div style="${redBtnStyle}" id="${id}">
			${buttonText}	
		</div>
	`
}
