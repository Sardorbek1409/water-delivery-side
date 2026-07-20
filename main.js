'use strict'

window.addEventListener('DOMContentLoaded', () => {
	// Tabs start

	const tabs = document.querySelectorAll('.tabheader__item'),
		tabContents = document.querySelectorAll('.tab_content'),
		tabParents = document.querySelector('.tabheader__items')

	function hideTabContents() {
		tabContents.forEach(tabContent => {
			tabContent.classList.add('hide')
			tabContent.classList.remove('show')
		})

		tabs.forEach(tab => {
			tab.classList.remove('tabheader__item_active')
		})
	}

	function showTabContent(index = 0) {
		tabContents[index].classList.add('show', 'fade')
		tabContents[index].classList.remove('hide')
		tabs[index].classList.add('tabheader__item_active')
	}

	hideTabContents()
	showTabContent()

	tabParents.addEventListener('click', event => {
		const target = event.target

		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((tab, index) => {
				if (target === tab) {
					hideTabContents()
					showTabContent(index)
				}
			})
		}
	})
	// Tabs end

	// Timer start

	setInterval(() => {
		const realTime = Date.parse(new Date()),
			timer = document.querySelector('.timer'),
			hour = timer.querySelector('#hours'),
			minute = timer.querySelector('#minutes'),
			second = timer.querySelector('#seconds')

		let hours = Math.floor((realTime / (1000 * 60 * 60)) % 24) + 5,
			minutes = Math.floor((realTime / (1000 * 60)) % 60),
			seconds = Math.floor((realTime / 1000) % 60)

		hour.textContent = formatNumber(hours)
		minute.textContent = formatNumber(minutes)
		second.textContent = formatNumber(seconds)
	}, 1000)

	function formatNumber(number) {
		if (number >= 0 && number < 10) {
			return `0${number}`
		} else {
			return number
		}
	}

	// getTimeRemaining(realTime)

	// Timer end

	// Contact Modal start

	const modalOpenBtns = document.querySelectorAll('[data-modal]'),
		modal = document.querySelector('.modal'),
		modalContent = document.querySelector('#modal__content')

	function openModal() {
		modalContent.classList.add('modal_fade')
		modal.classList.add('show')
		modal.classList.remove('hide')
		document.body.style.overflow = 'hidden'
		// clearInterval(modalTimerId)
	}

	function closeModal() {
		modal.classList.add('hide')
		modal.classList.remove('show')
		document.body.style.overflow = ''
	}

	modalOpenBtns.forEach(btn => {
		btn.addEventListener('click', openModal)
	})

	modal.addEventListener('click', event => {
		if (
			event.target === modal ||
			event.target.getAttribute('data-modal-close') === ''
		) {
			closeModal()
		}
	})

	// const modalTimerId = setTimeout(openModal, 5000)

	// Send Contact Modal Data to Telegram
	const form = document.querySelector('#form'),
		telegramTokenBot = '8932993468:AAGXxkoQjYQ_6jLY2mk1jbqd7cqwC4v2eE4',
		// chatId = '814090258' // 7933
		// chatId = '5313348303' // 1409
		chatId = '8957206120' // Tohir
	// Message intagers
	const message = {
		loading: 'Jarayonda...',
		success: "Biz bilan bog'langaningiz uchun rahmat",
		failure: 'Xatolik yuzberdi',
	}

	form.addEventListener('submit', event => {
		event.preventDefault()
		// For data don't come to link

		const formData = new FormData(form)

		const object = {}
		formData.forEach((value, key) => {
			object[key] = value
		})

		fetch(`https://api.telegram.org/bot${telegramTokenBot}/sendMessage`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				chat_id: chatId,
				text: `📩Contact Form\n\n👤Username: ${object.name}\n📞Phone: ${object.phone}`,
			}),
		})
			.then(() => {
				showStatusMessage(message.success)
				form.reset()
			})
			.catch(() => showStatusMessage(message.failure))
			.finally(() => closeModal())
	})

	function showStatusMessage(message) {
		const modalDialog = document.querySelector('.modal__dialog')

		modalDialog.classList.add('hide')
		openModal()

		const statusModal = document.createElement('div')
		statusModal.classList.add('modal__dialog')
		statusModal.innerHTML = `
			<div class="modal__content">
				<div data-modal-close class="modal__close">&times;</div>
				<div class="modal__title">${message}</div>
			</div>
		`

		document.querySelector('.modal').append(statusModal)

		setTimeout(() => {
			statusModal.remove()
			modalDialog.classList.remove('hide')
			closeModal()
		}, 1000)
	}
	// Contact Modal end

	// Order Modal start
	const orderModalopenBtns = document.querySelectorAll('[order-modal]'),
		orderModal = document.querySelector('.order_modal'),
		orderModalContent = document.querySelector('#order_modal_content')

	function openOrderModal() {
		orderModalContent.classList.add('modal_fade')
		orderModal.classList.add('show')
		orderModal.classList.remove('hide')
		document.body.style.overflow = 'hidden'
	}

	function closeOrderModal() {
		orderModal.classList.add('hide')
		orderModal.classList.remove('show')
		document.body.style.overflow = ''
	}

	orderModalopenBtns.forEach(btn => {
		btn.addEventListener('click', openOrderModal)
		console.log(btn.parentElement.parentElement)
	})

	orderModal.addEventListener('click', event => {
		if (
			event.target === orderModal ||
			event.target.getAttribute('data-modal-close') === ''
		) {
			closeOrderModal()
		}
	})

	orderModal.addEventListener('click', event => {
		if (
			event.target === orderModal ||
			event.target.getAttribute('data-modal-close') === ''
		) {
			closeModal()
		}
	})

	document.addEventListener('keydown', event => {
		if (event.code === 'Escape' && modal.classList.contains('show')) {
			closeModal()
		}
		if (event.code === 'Escape' && orderModal.classList.contains('show')) {
			closeOrderModal()
		}
	})

	// Send Order Modal Data to Telegram
	const orderForm = document.querySelector('#order_form')
	orderForm.addEventListener('submit', event => {
		event.preventDefault()
		// For data don't come to link

		const orderFormData = new FormData(order_form)

		const orderObject = {}
		orderFormData.forEach((value, key) => {
			orderObject[key] = value
		})

		fetch(`https://api.telegram.org/bot${telegramTokenBot}/sendMessage`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				chat_id: chatId,
				text: `📩Order Form\n\n👤Username: ${orderObject.name}\n📞Phone: ${orderObject.phone}\n💧Order: ${orderObject.order}\n📍Address: ${orderObject.address}`,
			}),
		})
			.then(() => {
				showStatusMessage(message.success)
				orderForm.reset()
			})
			.catch(() => showStatusMessage(message.failure))
			.finally(() => closeOrderModal())
	})

	function showStatusMessage(message) {
		const modalDialog = document.querySelector('.order_modal_dialog')

		modalDialog.classList.add('hide')
		openOrderModal()

		const statusModal = document.createElement('div')
		statusModal.classList.add('modal__dialog')
		statusModal.innerHTML = `
			<div class="modal__content" id="order_modal_content">
	      <form action="#" id="oredr_form">
	        <div data-modal-close class="modal__close">&times;</div>
	        <div class="modal__title">${message}</div>
	      </form>
	    </div>
		`

		document.querySelector('.order_modal').append(statusModal)

		setTimeout(() => {
			statusModal.remove()
			modalDialog.classList.remove('hide')
			closeOrderModal()
		}, 1000)
	}
	// Order Modal end
})
