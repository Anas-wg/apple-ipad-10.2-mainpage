# Project Name :apple-ipad10.2page
## Inspired : FASTCAMPUS 2nd Project


<a href = "https://apple-ipad-10-2-mainpage.vercel.app/">PageLink</a>


## 사용언어
- HTML & CSS
- JS
  - 사용자 사용환경(PC,Tablet, Mobile)에 따른 Header 변화(아이콘, 검색창, 토글...etc)
  ```javascript
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
  ```
  - Event Bubbling 방지
  ```javascript
    window.addEventListener('resize',function(){
    if(window.innerWidth <= 740) {
      headerEl.classList.remove('searching')
    } else {
      headerEl.classList.remove('searching--mobile')
    }
  })
  ```
  - 요소의 가시성 관찰(IntersectionObserver())
  ```javascript
    /*
    요소의 가시성 관찰이란 브라우저 Viewport 와 설정한 요소의 교차점을 관찰하며,
    요소의 Viewport 포함 여부를 구별함, 즉 사용자 화면에 보이는 요소인지를 판별
    */
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
  ```
  - 비디오 제어(사용자 클릭에 따른 class add & remove 활용)
  ```javascript
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
  ```
  - 현재 연도 출력 (Date().getFullYear 활용)
  ```javascript
  const thisYearEl = document.querySelector('span.this-year')
  thisYearEl.textContent = new Date().getFullYear()
  ```


- 배포 방법
<br>
![MARKDOWN](data:image/png;base64,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)


## Thanks
<a href="https://github.com/ParkYoungWoong/apple-ipad-app">FASTCAMPUS 강사님 Github</a>
