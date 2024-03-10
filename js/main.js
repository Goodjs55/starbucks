const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');

searchEl.addEventListener('click', function(){
  searchInputEl.focus();
});

searchInputEl.addEventListener('focus',function() {
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder', '통합검색');
});

searchInputEl.addEventListener('blur',function() {
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', '');
});

const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');

//window 보고있는 화면 자체
//0.3초 단위로 부하 방지, loadsh에서 제공하는 throttle 메소드 적용
window.addEventListener('scroll',_.throttle(function() {
  console.log(window.scrollY);
  if(window.scrollY > 500)  {
    //gsap.to(요소, 지속시간, 옵션);
    gsap.to(badgeEl, .6, {
      opacity: 0,
      display: 'none' //화면에서 요소가 사라지도록 설정
    } );
    //버튼보이기
    gsap.to(toTopEl,.2, {
      x:0 //원래위치
    });
  } else {
    gsap.to(badgeEl, .6, {
      opacity: 1,
      display: 'block'
    } );
    //버튼 숨기기
    gsap.to(toTopEl,.2, {
      x:100 //오른쪽으로 100px 이동
    });
  }
},300)); 


toTopEl.addEventListener('click', function () {
  gsap.to(window, .7, {
    scrollTo: 0 //0.7s 동안 화면을 가장위로 올려주겠다.
  });
});

const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function (fadeEl, index) {
  gsap.to(fadeEl, 1, {
    delay: (index+1) * .7, //0.7, 1.4, 2.1, 2.7s
    opacity: 1
  });
});

// new Swiper(선택자, 옵션)
new Swiper('.notice-line .swiper-container', {
  direction: 'vertical', //horizontal 이 기본값
  autoplay: true,
  loop: true,
}); /*생성자 클래스*/

new Swiper('.promotion .swiper-container', {
  slidesPerView: 3, //한번에 보여줄 슬라디으 개수
  spcaeBetween: 10, //슬라이드 사이 여백
  centeredSlides : true, //1번 슬라이드가 가운데 보이기
  autoplay: true,
  delay: 5000,
  loop: true,
  pagination: {
    el: '.promotion .swiper-pagination', //페이지 번호 요소 선택자
    clickable: true 
  },
  navigation: {
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next'
  }

}); 
new Swiper('.awards .swiper-container', {
  autoplay:true,
  loop:true,
  spcaeBetween: 30,
  slidesPerView: 5,
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next'
  }
});

const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;
promotionToggleBtn.addEventListener('click', function() {
  isHidePromotion = !isHidePromotion
  if (isHidePromotion) {
    promotionEl.classList.add('hide');
  } else {
    promotionEl.classList.remove('hide');
  }
});
// 랜덤함수
function random(min, max) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}
function floatingObject(selector, delay, size) {
  gsap.to(
    selector, 
    random(1.5,2.5), { //애니메이션 동작 시간
    y : size,
    repeat:-1, //무한반복
    yoyo: true,
    ease: Power1.easeInOut,
    delay: random(0, delay) 
  });
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);

const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function(spyEl) {
  new ScrollMagic
    .Scene({
      triggerElement: spyEl, //보여짐 여부를 감시할 요소를 지정
      triggerHook: .8 //위에서부터 바닥까지 0~1 
    })
    .setClassToggle(spyEl, 'show') //show 라는 클래스를 추가함
    .addTo(new ScrollMagic.Controller());
});

//올해날짜 표시//
const thisYear =  document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear(); //올해

