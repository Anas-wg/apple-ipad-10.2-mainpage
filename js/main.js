import ipads from "../data/ipads.js"
import navigations from "../data/navigations.js"

// 장바구니
const basketStarterEl = document.querySelector("header .basket-starter")
const basketEl = basketStarterEl.querySelector(".basket")

basketStarterEl.addEventListener('click', function(event) {
  event.stopPropagation()
  if (basketEl.classList.contains('show') ) {
    // true -> hide
    hideBasket();
  } else {
    //false -> show
    showBasket();
  }
})

basketEl.addEventListener('click' ,function(event){
  event.stopPropagation();
})

window.addEventListener('click', function() {
  hideBasket();
})

function showBasket(){
  basketEl.classList.add('show')
}

function hideBasket() {
  basketEl.classList.remove('show')
}

// 검색

const headerEl = document.querySelector('header')
// 전개 연산자 이용한 얕은 복사 => 배열로 변환
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu > li')]
const searchWrapEl = document.querySelector('.search-wrap')
const searchStarterEl = document.querySelector('.search-starter')
const searchCloserEl = searchWrapEl.querySelector('.search-closer')
const searchShadowEl = searchWrapEl.querySelector('.shadow')
const searchInputEl = searchWrapEl.querySelector('input')
const searchDelayEls = [...searchWrapEl.querySelectorAll('li')]

searchStarterEl.addEventListener('click', showSearch)
searchCloserEl.addEventListener('click',function(event){
  event.stopPropagation();
  hideSearch();
})
searchShadowEl.addEventListener('click', hideSearch)

function showSearch() {
  headerEl.classList.add('searching')
  // documentElement -> 문서의 최상단 요소 = html
  stopScroll()
  // reverse 메소드로 역순으로 처리
  headerMenuEls.reverse().forEach(function (el, index) {
    // index 숫자 * 0.4 / 배열 아이템의 개수
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
  })
  searchDelayEls.forEach(function (el, index) {
    // index 숫자 * 0.4 / 배열 아이템의 개수
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
  });
  setTimeout(function(){
    searchInputEl.focus()
  }, 600)
}

function hideSearch() {
  headerEl.classList.remove('searching')
  playScroll();
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
  });
  searchDelayEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
  });
  searchDelayEls.reverse()
  searchInputEl.value = ''
}

function playScroll(){
  document.documentElement.classList.remove("fixed")
}

function stopScroll(){
  document.documentElement.classList.add("fixed")
}

// header menu toggle
const menuStaterEl = document.querySelector("header .menu-starter")
menuStaterEl.addEventListener('click', function(){
  if(headerEl.classList.contains("menuing")){
    headerEl.classList.remove("menuing")
    searchInputEl.value = ''
    playScroll()
  } else {
    headerEl.classList.add("menuing");
    stopScroll()
  }
})

// 헤더 검색
const searchTextFieldEl = document.querySelector('header .textfield')
const searchCancelEl = document.querySelector('header .search-canceler')
searchTextFieldEl.addEventListener('click', function(){
  headerEl.classList.add('searching--mobile')
})

searchCancelEl.addEventListener('click', function(){
  headerEl.classList.remove('searching--mobile')
  searchInputEl.focus();
})

//Event Bubling 방지 
window.addEventListener('resize',function(){
  if(window.innerWidth <= 740) {
    headerEl.classList.remove('searching')
  } else {
    headerEl.classList.remove('searching--mobile')
  }
})

// nav toggle
const navEl = document.querySelector('nav')
const navMenuToggleEl = document.querySelector('.menu-toggler')
const navMenuShadowEl = document.querySelector('.shadow')

navMenuToggleEl.addEventListener('click',function(){
  if(navEl.classList.contains('menuing')) {
    hideNavMenu();
  } else {
    showNavMenu();
  }
})

navEl.addEventListener('click',function(event) {
  event.stopPropagation();
})

navMenuShadowEl.addEventListener('click',hideNavMenu);
window.addEventListener('click',hideNavMenu);

function showNavMenu() {
  navEl.classList.add('menuing')
}

function hideNavMenu() {
  navEl.classList.remove('menuing')
}


//요소의 가시성 관찰
const io = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry){
    if(!entry.isIntersecting) {
      return
    }
    entry.target.classList.add('show')
  })
})

const infoEls = document.querySelectorAll('.info')
infoEls.forEach(function(el){
  io.observe(el)
})


// 비디오 제어

const video = document.querySelector('.stage video')
const playBtn = document.querySelector(".stage .controller--play")
const pauseBtn = document.querySelector('.stage .controller--pause')

playBtn.addEventListener('click', function() {
  video.play()
  playBtn.classList.add('hide')
  pauseBtn.classList.remove('hide')
})

pauseBtn.addEventListener('click', function() {
  video.pause()
  playBtn.classList.remove('hide')
  pauseBtn.classList.add('hide')
})

// 당신에게 맞는 iPad는? 렌더링

const itemsEl = document.querySelector('section.compare .items')
ipads.forEach(ipad => {
  const itemEl = document.createElement('div')
  itemEl.classList.add('item')

  let colorList = ''
  ipad.colors.forEach(color => {
    colorList += `<li style="background-color: ${color};"></li>`
  })

  // VS Code 확장 프로그램 - Comment tagged templates
  itemEl.innerHTML = /* html */ `
    <div class="thumbnail">
      <img src="${ipad.thumbnail}" alt="${ipad.name}" />
    </div>
    <ul class="colors">
      ${colorList}
    </ul>
    <h3 class="name">${ipad.name}</h3>
    <p class="tagline">${ipad.tagline}</p>
    <p class="price">₩${ipad.price.toLocaleString('en-US')}부터</p>
    <button class="btn">구입하기</button>
    <a href="${ipad.url}" class="link">더 알아보기</a>
  `

  itemsEl.append(itemEl)
})

const navigationsEl = document.querySelector('footer .navigations')
navigations.forEach(function(nav){
  const mapEl = document.createElement('div')
  mapEl.classList.add('map')

  let mapList = ''
  nav.maps.forEach(function (map){
    mapList += /* html */`<li>
      <a href="${map.url}">${map.name}</a>
    </li>`
  })

  mapEl.innerHTML= /* html */`
  <h3>
    <span class="text">${nav.title}</span>
    <span class="icon">+</span>
  </h3>
  <ul>
    ${mapList}
  </ul>
  `

  navigationsEl.append(mapEl)
})

// 현재 연도
const thisYearEl = document.querySelector('span.this-year')
thisYearEl.textContent = new Date().getFullYear()


// 모바일 버전 footer 아코디언 메뉴 - toggle 메서드 활용
const mapEls = document.querySelectorAll('footer .navigations .map');
mapEls.forEach(function(el){
  const h3El = el.querySelector('h3')
  h3El.addEventListener('click', function(){
    el.classList.toggle('active')
  })
})