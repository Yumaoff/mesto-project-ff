function openModal(modalForm) {
  modalForm.classList.add('popup_is-opened');
}

function closeModal(modalForm) {
  modalForm.classList.remove('popup_is-opened');
}

function closeModalOnOverlayClick(event) {
  if (event.target.classList.contains('popup')) {
    closeModal(event.target);
  }
}

function closeModalOnEscape (event) {
  if (event.key === 'Escape') {
    const openPopup = document.querySelector('.popup_is-opened');
    if (openPopup) {
      closeModal(openPopup);
    }
  }
}

export {openModal, closeModal, closeModalOnOverlayClick, closeModalOnEscape};