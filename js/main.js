const animItems = document.querySelectorAll("._anim-items");
const elPhoneController = document.querySelector(".email-input");
const elPhoneForm = document.querySelector(".email-form");
const elError = document.querySelector(".form-control-error");
const elSuccess = document.querySelector(".form-control-success");
const elOpenNavigationToggler = document.querySelector(".menu-icon");
const elOpenNavigationToggler_Mobile = document.querySelector(
  ".header__nav--mobile-toggler"
);
const elHeader = document.querySelector(".header__nav");

if (animItems.length > 0) {
  window.addEventListener("scroll", animOnScroll);
  function animOnScroll() {
    for (let index = 0; index < animItems.length; index++) {
      const animItem = animItems[index];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      const animStart = 4;

      let animItemPoint = window.innerHeight - animItemHeight / animStart;

      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if (
        pageYOffset > animItemOffset - animItemPoint &&
        pageYOffset < animItemOffset + animItemHeight
      ) {
        animItem.classList.add("_active");
      } else {
        if (!animItem.classList.contains("_anim-no-hide")) {
          animItem.classList.remove("_active");
        }
      }
    }
  }

  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  }

  setTimeout(() => {
    animOnScroll();
  }, 300);
}

window.addEventListener("scroll", reveal);

function reveal() {
  let reveals = document.querySelectorAll(".reveal");

  for (let i = 0; i < reveals.length; i++) {
    let windowHeight = window.innerHeight;
    let revealTop = reveals[i].getBoundingClientRect().top;
    let revealPoint = 150;

    if (revealTop < windowHeight - revealPoint) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

elPhoneForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let inputValue = elPhoneController.value;

  let validValue = inputValue.match(
    /^[+]*[0-9]{0,4}[\s]?[0-9]{1,3}[-\s\./0-9]*$/g
  );
  console.log(validValue?.length > 0);

  if (validValue?.length > 0) {
    // Fetch value
    elSuccess.style.display = "block";
    elError.style.display = "none";
    elPhoneForm.reset();
  } else {
    elSuccess.style.display = "none";
    elError.style.display = "block";
  }
});

elOpenNavigationToggler.addEventListener("click", (e) => {
  elHeader.dataset.visibility = true;
});

elOpenNavigationToggler_Mobile.addEventListener("click", (e) => {
  elHeader.dataset.visibility = false;
});
