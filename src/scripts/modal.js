function openModal(modalForm) {
  modalForm.classList.add("popup_is-opened");
}

function closeModal(modalForm) {
  modalForm.classList.remove("popup_is-opened");
}

function closeModalOnOverlayClick(evt) {
  if (evt.target.classList.contains("popup")) {
    closeModal(evt.target);
  }
}

function closeModalOnEscape(evt) {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".popup_is-opened");
    if (openPopup) {
      closeModal(openPopup);
    }
  }
}

export { openModal, closeModal, closeModalOnOverlayClick, closeModalOnEscape };
