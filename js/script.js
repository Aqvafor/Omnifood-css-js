//Set current year
const yearEl = document.querySelector('.year');
const currentYear = new Date().getFullYear()
yearEl.textContent = currentYear;
//

(".nav - open");


////////////////////
// Когда мы выбираем селектор по классу то пишем через точку .btn
//Make mobile navigation work
////////////////
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

// toggle - переключать 
// Если у headerEl убдет класс nav-open то он его удалит, а нету то добавит
btnNavEl.addEventListener('click', function () {
  // КОгда взаимодействуем с самим классом однако точка не нужна
  headerEl.classList.toggle("nav-open")
})

// /////////////////////////////
// Smooth (гладкий) scrolling animation

// Выбирем якорные элементы содержащие псевдокласс  link
const allLinks = document.querySelectorAll('a:link');
// console.log(allLinks)
//link любое название можем потсавить 
//Пробегаемся по всем ссылкам с помощью forEach и на каждую ставим обработчик событий
allLinks.forEach(function (link) {
  //e это наше событие 
  link.addEventListener('click', function (e) {
    //Мы прерываем обычное обращение
    e.preventDefault();
    // в переменную href  добавляем значение атрибута href
    const href = link.getAttribute("href")
    // console.log(href);

    //Scroll back to top
    if (href === "#") window.scrollTo({
      top: 0,
      behavior: "smooth"
    })


    //Scroll to other links
    // if (href !== "#" && href.startsWith('#')) console.log(href)

    if (href !== "#" && href.startsWith('#')) {

    }
    const sectionEl = document.querySelector(href);
    // Насстраиваем прокрутку гладкую 
    sectionEl.scrollIntoView({
      behavior: "smooth"
    })

    //Close mobile navigation
    if (link.classList.contains("main-nav-link")) {
      headerEl.classList.toggle("nav-open")
    }

  })
})


///////////////////////////////////////
//Sticky navigation
//Добавим в секции. hero mt так как , когда меню появляется у нас ниже hedera, оно уходит вниз с хэдера и получается прыжок
const sectionHeroEl = document.querySelector(".section-hero");

// Мы выбираем что будем следить за данным параметром и если он false то есть мы листанули вниз , а изначально он был true , и когда он возвращается ии изначально сверху то опять становится true и удаляется класс stiky
//Когда прокрутим header наверху появится меню навигации
const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);
    if (ent.isIntersecting === false) {
      document.body.classList.add('sticky');
      // Можно заменить одним if добавив отрицание ! сверху
    }
    if (ent.isIntersecting === true) {
      document.body.classList.remove('sticky');

    }
  }, {
    //In the viewport

    root: null,
    // Когда станет 0 % в экране hero section 
    threshold: 0,
    // Будет поялвтся на  80 рх раньше, так как мы указали такую длину навигации ипкой, и перекрываем заголовок, поэтому делаем отступ
    rootMargin: "-80px"
  });
obs.observe(sectionHeroEl);

////////////////////////////Код ниже лучше везде вставлять , так как sfafari не поддерживает gap свойство во felxbox 
///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js