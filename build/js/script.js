'use strict';

var messageLink = document.querySelector(".call");
var messageForm = document.querySelector(".modal__message-form");
var closeButtonLink = document.querySelector(".modal__button-close");
var phoneInputList = document.querySelectorAll(".phone");
var overlay = document.querySelector(".overlay");
var anchorList = document.querySelectorAll(".scroll-link")
var phoneInput;
var anchor;
var close;
var userName;
var userPhone;
var messageContent;
var isStorageSupport = true;
var storageuserName = "";
var storageuserPhone = "";
var storagemessageContent = "";

//проверка работы хранилища
try {
  storageuserName = localStorage.getItem("userName");
  storageuserPhone = localStorage.getItem("userPhone");
  storagemessageContent = localStorage.getItem("messageContent");
} catch (err) {
  isStorageSupport = false;
}

//форма отправки сообщения
if (messageLink) {
  userName = messageForm.querySelector("[id=name]");
  userPhone = messageForm.querySelector("[id=phone]");
  messageContent = messageForm.querySelector("[id=content]");

  //открытие формы отправки сообщения по кнопке
  messageLink.addEventListener("click", function (evt) {
    evt.preventDefault();
    overlay.classList.add("modal-show");
    messageForm.classList.add("modal-show");
    userName.focus();
  });

  //проверка полей формы отправки сообщения
  messageForm.addEventListener("submit", function (evt) {
    if (!userName.value || !userPhone.value || messageContent.value == "")
      {
        evt.preventDefault();
        console.log("Заполните ваше имя, телефон и текст вопроса");
        messageForm.classList.remove("modal-error");
        messageForm.offsetWidth = messageForm.offsetWidth;
        messageForm.classList.add("modal-error");
        if (!userName.value) {
          userName.focus();
        } else {
          if (!userPhone.value) {
            userPhone.focus();
          } else {
            if (messageContent.value == "") {
              messageContent.focus();
            }
          }
        }
    } else {
      if (isStorageSupport) {
        localStorage.setItem("userName", userName.value);
        localStorage.setItem("userPhone", userPhone.value);
      }
    }
  });
}

//закрытие модального окна по кнопке закрытия
closeButtonLink.addEventListener("click", function (evt) {
  close = evt.target;
  if (close.parentNode.classList.contains("modal-show")) {
      close.parentNode.classList.remove("modal-show");
      overlay.classList.remove("modal-show");
  }
  if (close.parentNode.classList.contains("modal-error")) {
      close.parentNode.classList.remove("modal-error");
  }
});

//закрытие модального окна по esc
window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (messageForm) {
      if (messageForm.classList.contains("modal-show")) {
        messageForm.classList.remove("modal-show");
        messageForm.classList.remove("modal-error");
        overlay.classList.remove("modal-show");
      }
    }
  }
});

//закрытие модального окна по клику на overlay
overlay.addEventListener("click", function (evt) {
  if (messageForm.classList.contains("modal-show")) {
    messageForm.classList.remove("modal-show");
    messageForm.classList.remove("modal-error");
    overlay.classList.remove("modal-show");
  }
});

//валидация формы номера телефона
for (var i = 0; i < phoneInputList.length; i++) {
  phoneInput = phoneInputList[i];
  phoneInput.addEventListener("click", addPhone);
  phoneInput.addEventListener("keydown", checkPhone);
}

function addPhone() {
  this.value = "+7(";
}

function checkPhone(evt) {
  var curLen = this.value.length;
  if (!/\d/.test(evt.key)) {
    if (evt.keyCode === 8) {
      return;
    } else {
      evt.preventDefault();
    }
  }
  if (curLen === 0) {
    this.value = this.value + "+7(";
  }
  if (curLen === 2) {
    this.value = this.value + "(";
  }
  if (curLen === 6) {
    this.value = this.value + ") ";
  }
  if (curLen === 10) {
    this.value = this.value + "-";
  }
  if (curLen === 13) {
    this.value = this.value + "-";
  }
  if (curLen > 16) {
    this.value = this.value.substring(0, this.value.length - 1);
  }
}

//плавный скроллинг
for (var i = 0; i < anchorList.length; i++) {
  anchor = anchorList[i];
  var blockID = anchor.getAttribute('href').substr(1);
  anchor.addEventListener('click', function() {
    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
}
