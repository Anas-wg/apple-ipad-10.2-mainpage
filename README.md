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
![MARKDOWN](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpyndK5rkmHRm35WG4kX6Y8DVtsvPZaTNy0Q&usqp=CAU)


## Thanks
<a href="https://github.com/ParkYoungWoong/apple-ipad-app">FASTCAMPUS 강사님 Github</a>
