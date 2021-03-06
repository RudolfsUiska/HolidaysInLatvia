let controller;
let slideScene;
let pageScene;
let detailScene;

function animateSlides() {
  //init controller
  controller = new ScrollMagic.Controller();
  //Select things
  const sliders = document.querySelectorAll(".slide");
  const nav = document.querySelector(".nav-header");
  //loop over each slide
  sliders.forEach((slide, index, slides) => {
    const revealImg = slide.querySelector(".reveal-img");
    const img = slide.querySelector("img");
    const revealText = slide.querySelector(".reveal-text");
    //GSAP
    const slideTl = gsap.timeline({
      defaults: { duration: 1, ease: "power2.inOut" },
    });
    slideTl.fromTo(revealImg, { x: "0%" }, { x: "100%" });
    slideTl.fromTo(img, { scale: 2 }, { scale: 1 }, "-=1");
    slideTl.fromTo(revealText, { x: "0%" }, { x: "100%" }, "-=0.75");
    //Creating a scene
    slideScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0.25,
      reverse: false,
    })
      .setTween(slideTl)
      .addTo(controller);
    //New Animation
    const pageTl = gsap.timeline();
    let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
    pageTl.fromTo(nextSlide, { y: "0%" }, { y: "50%" });
    pageTl.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.5 });
    pageTl.fromTo(nextSlide, { y: "50%" }, { y: "0%" }, "-=0.5");
    //create new scene
    pageScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: "100%",
      triggerHook: 0,
    })
      .setPin(slide, { pushFollowers: false })
      .setTween(pageTl)
      .addTo(controller);
  });
}
const mouse = document.querySelector(".cursor");
const mouseTxt = mouse.querySelector("span");
const burger = document.querySelector(".burger");
function cursor(event) {
  mouse.style.top = event.pageY + "px";
  mouse.style.left = event.pageX + "px";
}
function activeCursor(event) {
  const item = event.target;
  if (item.id === "logo" || item.classList.contains("burger")) {
    mouse.classList.add("nav-active");
  } else {
    mouse.classList.remove("nav-active");
  }
  if (item.classList.contains("explore")) {
    mouse.classList.add("explore-active");
    gsap.to(".title-swipe", 0.5, { y: "0%" });
    mouseTxt.innerText = "Tap";
  } else {
    mouse.classList.remove("explore-active");
    gsap.to(".title-swipe", 0.5, { y: "100%" });
    mouseTxt.innerText = "";
  }
}
function navToggle(event) {
  if (!event.target.classList.contains("active")) {
    event.target.classList.add("active");
    gsap.to(".line1", 0.5, { rotate: "45", y: 5, background: "black" });
    gsap.to(".line2", 0.5, { rotate: "-45", y: -5, background: "black" });
    gsap.to("#logo", 1, { color: "black" });
    gsap.to(".nav-bar", 1, { clipPath: "circle(2500px at 100% -10%" });
    document.body.classList.add("hide");
  } else {
    event.target.classList.remove("active");
    gsap.to(".line1", 0.5, { rotate: "0", y: 0, background: "white" });
    gsap.to(".line2", 0.5, { rotate: "0", y: 0, background: "white" });
    gsap.to("#logo", 1, { color: "white" });
    gsap.to(".nav-bar", 1, { clipPath: "circle(50px at 100% -10%" });
    document.body.classList.remove("hide");
  }
}

//barba page transitions
const logo = document.querySelector("#logo");
barba.init({
  views: [
    {
      namespace: "home",
      beforeEnter() {
        animateSlides();
        logo.href = "./";
      },
      beforeLeave() {
        slideScene.destroy();
        pageScene.destroy();
        controller.destroy();
      },
    },
    {
      namespace: "ziemassvetki",
      beforeEnter() {
        logo.href = "../";
        detailAnimation();
      },
      beforeLeave() {
        controller.destroy();
        detailScene.destroy();
      },
    },
    {
      namespace: "janji",
      beforeEnter() {
        logo.href = "../";
        detailAnimation();
      },
      beforeLeave() {
        controller.destroy();
        detailScene.destroy();
      },
    },
    {
      namespace: "lieldienas",
      beforeEnter() {
        logo.href = "../";
        detailAnimation();
      },
      beforeLeave() {
        controller.destroy();
        detailScene.destroy();
      },
    },
  ],
  transitions: [
    {
      leave({ current, next }) {
        let done = this.async();
        //scroll to top
        window.scrollTo(0, 0);
        //animation
        const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
        tl.fromTo(current.container, 0.75, { opacity: 1 }, { opacity: 0 });
        tl.fromTo(
          ".swipe",
          0.75,
          { x: "-100%" },
          { x: "0%", onComplete: done },
          "-=0.5"
        );
        location.reload();
      },
      enter({ current, next }) {
        let done = this.async();
        const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
        tl.fromTo(
          ".swipe",
          0.75,
          { x: "0%" },
          { x: "100%", stagger: 0.25, onComplete: done }
        );
        tl.fromTo(next.container, 0.75, { opacity: 0 }, { opacity: 1 });
        tl.fromTo(
          ".nav-header",
          1,
          { y: "-100%" },
          { y: "0%", ease: "power2.inOut" },
          "-=1.5"
        );
        location.reload();
      },
    },
  ],
});

function detailAnimation() {
  controller = new ScrollMagic.Controller();
  const slides = document.querySelectorAll(".details-slide");
  slides.forEach((slide, index, slides) => {
    const slideTl = gsap.timeline({ defaults: { duration: 1 } });
    let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
    const nextImg = nextSlide.querySelector("img");
    slideTl.fromTo(slide, { opacity: 1 }, { opacity: 0 });
    slideTl.fromTo(nextSlide, { opacity: 0 }, { opacity: 1 }, "-=1");
    slideTl.fromTo(nextImg, { x: "175%" }, { x: "0%" });
    //scene
    detailScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: "100%",
      triggerHook: 0,
    })
      .setPin(slide, { pushFollowers: false })
      .setTween(slideTl)
      .addTo(controller);
  });
}

//Event listeners
burger.addEventListener("click", navToggle);
window.addEventListener("mousemove", cursor);
window.addEventListener("mousemove", activeCursor);

document.addEventListener("DOMContentLoaded", function(event) { 
  var lang = sessionStorage.getItem("lang");
  if (lang == null) {
    lang = "lv";
  }
  var request = new XMLHttpRequest();
  request.open("GET", "https://rudolfsuiska.github.io/HolidaysInLatvia/data/" + lang +".json", false);
  request.send(null)
  var tData = JSON.parse(request.responseText);

  tData.data.forEach(showHollidays);
  time = tData.time;
  for (const element of document.getElementsByClassName("explore")){
    element.innerHTML = tData.general.more;
  }
  document.getElementById("logo").innerHTML = tData.general.logo;
  document.getElementById("vainags").innerHTML = tData.general.vainags;
  if(document.getElementsByClassName("countdown")) {
    const myCountdown = new countdown({
      target: '.countdown',
      dayWord: time.day,
      hourWord: time.h,
      minWord: time.min,
      secWord: time.s
    });
    const myCountdown1 = new countdown({
      target: '.countdown1',
      dayWord: time.day,
      hourWord: time.h,
      minWord: time.min,
      secWord: time.s
    });
    const myCountdown2 = new countdown({
      target: '.countdown2',
      dayWord: time.day,
      hourWord: time.h,
      minWord: time.min,
      secWord: time.s
    });
}
});

function showHollidays(item) {
  ifElemetExistSetValue(document.getElementById(item.class + "-text"), item.text);
  ifElemetExistSetValue(document.getElementById(item.class + "-titleStart"), item.titleStart);
  ifElemetExistSetValue(document.getElementById(item.class + "-title"), item.title);
  ifElemetExistSetValue(document.getElementById(item.class + "-till"), item.till);
  ifElemetExistSetValue(document.getElementById(item.class + "-title1"), item.title1);
  ifElemetExistSetValue(document.getElementById(item.class + "-title2"), item.title2);
  ifElemetExistSetValue(document.getElementById(item.class + "-title3"), item.title3);
  ifElemetExistSetValue(document.getElementById(item.class + "-text1"), item.text1);
  ifElemetExistSetValue(document.getElementById(item.class + "-text2"), item.text2);
  ifElemetExistSetValue(document.getElementById(item.class + "-text3"), item.text3);
}

function ifElemetExistSetValue(elemet, value) {
  if (elemet) {
    elemet.innerHTML = value;
  }
}

function changeLang(lang) {
  sessionStorage.setItem("lang", lang);
  location.reload();
}
