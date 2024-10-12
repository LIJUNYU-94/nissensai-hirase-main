"use strict";

// ... 既存のコード ...
if (
  !location.pathname.includes("/member") &&
  !location.pathname.includes("/greeting")
) {
  document.addEventListener("DOMContentLoaded", function () {
    const buttons = [...document.querySelectorAll(".section__stalls-btn")];
    const swipers = [...document.querySelectorAll(".swiper")];
    swipers.forEach((swiperElement) => {
      new Swiper(swiperElement, {
        loop: false,
        spaceBetween: 12,
        width: 300,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    });
    // const swiper = new Swiper(".swiper", {
    //   loop: false,
    //   spaceBetween: 12,
    //   width: 300,
    //   navigation: {
    //     nextEl: ".swiper-button-next",
    //     prevEl: ".swiper-button-prev",
    //   },
    // });

    // 各スライドにaria-labelを設定
    document
      .querySelector(".swiper-button-next")
      .classList.remove("swiper-button-lock");
    document
      .querySelector(".swiper-button-next")
      .classList.remove("swiper-button-disabled");
    document
      .querySelector(".swiper-button-prev")
      .classList.remove("swiper-button-lock");
    swipers.forEach(function (x) {
      x.style.display = "none";
    });
    swipers[0].style.display = "block";
    buttons[0].classList.add("active");
    buttons.forEach((button, index) => {
      button.addEventListener("click", () => {
        document.querySelectorAll(".section__stalls-btn").forEach(function (b) {
          b.classList.remove("active");
        });
        // クリックされたボタンにアクティブクラスを追加
        button.classList.add("active");

        // すべてのスライドを非表示にする
        swipers.forEach(function (x) {
          x.style.display = "none";
        });
        swipers[index].style.display = "flex"; // 対応するラッパーを表示
        let wrapper = swipers[index].querySelector(".swiper-wrapper");
        wrapper.style.transform = "translate3d(0px, 0px, 0px)";
        if (index === 3 || index === 4) {
          document
            .querySelector(".swiper-button-next")
            .classList.add("swiper-button-lock");
          document
            .querySelector(".swiper-button-prev")
            .classList.add("swiper-button-lock");
        } else {
          document
            .querySelector(".swiper-button-next")
            .classList.remove("swiper-button-lock");
          document
            .querySelector(".swiper-button-next")
            .classList.remove("swiper-button-disabled");
          document
            .querySelector(".swiper-button-prev")
            .classList.remove("swiper-button-lock");
          document
            .querySelector(".swiper-button-prev")
            .classList.add("swiper-button-disabled");
        }
      });
    });
  });

  // const slideBtns = document.querySelectorAll(".section__stalls-btn");
  // if (slideBtns) {
  //   slideBtns.forEach((btn) => {
  //     btn.addEventListener("click", () => {
  //       const targetId = btn.getAttribute("data-target");
  //       const targetSection = document.getElementById(targetId);
  //       if (targetSection) {
  //         targetSection.scrollIntoView({ behavior: "smooth" });
  //       }
  //     });
  //   });
  // }
  const light = document.querySelector(".keyvisual_light");
  const logo = document.querySelector(".keyvisual_logo");
  let logoHeight = logo.offsetHeight; // logoの高さを取得
  document.addEventListener("scroll", function () {
    logoHeight = logo.offsetHeight;
    const width = window.innerWidth;
    if (window.scrollY > ((0.4 * width) / 1280) * logoHeight) {
      light.classList.add("stop");
    } else {
      light.classList.remove("stop");
    }
  });
  // function kvheight() {
  //   const bottom = document.querySelector(".btn__container1");
  //   const bottomPosition = bottom.offsetTop;
  //   console.log(bottomPosition);
  //   logo.style.height = bottomPosition + 600;
  //   console.log(logo.style.height);
  // }
  // kvheight();
  // window.addEventListener("resize", kvheight);
}

//back to topボタンの作り、logoとnavのfixed効果
const menuBtn = document.querySelector(".menu_icon");
const menuLinea = document.querySelector(".linea");
const menuLineb = document.querySelector(".lineb");
const menuLinec = document.querySelector(".linec");
const nav = document.querySelector(".phone-nav");
const navPC = document.querySelector(".pc-nav");
menuBtn.addEventListener("click", function () {
  menuLinea.classList.toggle("open");
  menuLineb.classList.toggle("open");
  menuLinec.classList.toggle("open");
  nav.classList.toggle("open");
}); //スマホナビゲーションの動き
const links = nav.querySelectorAll("a");
links.forEach((link) => {
  link.addEventListener("click", function () {
    nav.classList.remove("open"); // リンクがクリックされたらナビゲーションを閉じる
    menuLinea.classList.remove("open");
    menuLineb.classList.remove("open");
    menuLinec.classList.remove("open");
  });
});
//スマホのリンクを押されたらnavの.openを外す　（やり方あってる？）
const fixedBox = document.createElement("div");
fixedBox.className = "fixedbox";
document.body.appendChild(fixedBox);
let width = window.innerWidth;
let height = window.innerHeight;
window.addEventListener("resize", function () {
  width = window.innerWidth; // 画面の幅が変動がある度画面の幅を取得
  height = window.innerHeight; //画面の幅が変動がある度画面の高さを取得

  scroll();
});

let scrollTopBefore = window.scrollY;
function scroll() {
  const scrollPosition = window.pageYOffset;
  const backToTop = document.querySelector(".backtotop");
  const documentHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const logo = document.querySelector(".header-logo");

  if (scrollPosition > 800) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }

  backToTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }); //backtotop機能
  let scrollTop = window.scrollY;

  if (width > 640) {
    menuBtn.style.display = "none";
    if (scrollPosition > 300) {
      if (scrollTopBefore > scrollTop) {
        fixedBox.style.display = "block"; // ボックスを表示
        logo.style.display = "block";
        navPC.style.display = "block";
      } else {
        fixedBox.style.display = "none"; // ボックスを非表示
        logo.style.display = "none";
        navPC.style.display = "none";
      }
    } else {
      fixedBox.style.display = "none"; // ボックスを非表示
      logo.style.display = "block";
      navPC.style.display = "block";
    }
  } else {
    navPC.style.display = "none";
    if (scrollPosition / documentHeight > 0.8) {
      fixedBox.style.display = "none";
      menuBtn.style.display = "none";
      logo.style.display = "none";
    } else {
      if (scrollPosition > 300) {
        if (scrollTopBefore > scrollTop) {
          fixedBox.style.display = "block"; // ボックスを表示
          logo.style.display = "block";
          menuBtn.style.display = "flex";
        } else {
          fixedBox.style.display = "none"; // ボックスを非表示
          logo.style.display = "none";
          menuBtn.style.display = "none";
        }
      } else {
        fixedBox.style.display = "none"; // ボックスを非表示
        logo.style.display = "block";
        menuBtn.style.display = "flex";
      }
    }
  }
  scrollTopBefore = scrollTop;

  const path = window.location.pathname;

  if (path.includes("/member") || path.includes("/greeting")) {
    backToTop.addEventListener("mouseover", function () {
      backToTop.classList.add("hovered");
      setTimeout(() => {
        backToTop.src = "../img/btn_sp_hover.png";
        backToTop.classList.remove("hovered");
      }, 300); // 0.5秒後に画像を変更
    });
    backToTop.addEventListener("mouseleave", function () {
      backToTop.classList.add("hovered");
      setTimeout(() => {
        backToTop.src = "../img/btn-white.png";
        backToTop.classList.remove("hovered");
      }, 300); // 0.5秒後に画像を変更
    });
  } else {
    backToTop.addEventListener("mouseover", function () {
      backToTop.classList.add("hovered");
      setTimeout(() => {
        backToTop.src = "./img/btn_sp_hover.png";
        backToTop.classList.remove("hovered");
      }, 300); // 0.5秒後に画像を変更
    });
    backToTop.addEventListener("mouseleave", function () {
      backToTop.classList.add("hovered");
      setTimeout(() => {
        backToTop.src = "./img/btn-white.png";
        backToTop.classList.remove("hovered");
      }, 300); // 0.5秒後に画像を変更
    });
  }
}
window.addEventListener("scroll", scroll);
document.addEventListener("DOMContentLoaded", function () {
  if (
    location.pathname.includes("/member") ||
    location.pathname.includes("/greeting")
  ) {
    const hpbtn = document.querySelector(".hpbtn");
    hpbtn.addEventListener("mouseover", function () {
      hpbtn.src = "../img/hpbtnhover.svg";
    });
    hpbtn.addEventListener("mouseleave", function () {
      hpbtn.src = "../img/hpbtn.svg";
    });
  } else {
    const hpbtn = document.querySelector(".hpbtn");
    hpbtn.addEventListener("mouseover", function () {
      hpbtn.src = "img/hpbtnhover.svg";
    });
    hpbtn.addEventListener("mouseleave", function () {
      hpbtn.src = "img/hpbtn.svg";
    });
  }
});
//footer hplinkのhover

//backtotopボタンのhover
//******************************* 以上は共通部分*******************************/

document.addEventListener("DOMContentLoaded", function () {
  const path = window.location.pathname;
  //memberページ飾りの動き
  if (path.includes("/member")) {
    const decoChange = [...document.querySelectorAll(".member-deco1")];
    let currentImage = 0;

    setInterval(() => {
      const nextImage = (currentImage + 1) % decoChange.length;
      decoChange[currentImage].classList.add("deco-hidden");
      decoChange[nextImage].classList.remove("deco-hidden");
      currentImage = nextImage;
    }, 2000); //二つの画像を切り替える

    const decoBilibili = document.querySelector(".member-deco2");
    setInterval(() => {
      decoBilibili.classList.toggle("deco-active");
    }, 1000); //拡大縮小

    //でんちゃんの制作担当の切り替え機能

    const switches = [...document.querySelectorAll(".member-switch")];
    const infos = [...document.querySelectorAll(".member_info3")];
    const slide = document.querySelector(".member_infoslide");
    let timereset;
    function switchTo1() {
      switches[0].classList.add("active");
      switches[1].classList.remove("active");
      infos[0].classList.add("info-active");
      infos[1].classList.remove("info-active");
    }
    function switchTo2() {
      switches[0].classList.remove("active");
      switches[1].classList.add("active");
      infos[0].classList.remove("info-active");
      infos[1].classList.add("info-active");
    }
    reset();
    let currentIndex = 0;

    function reset() {
      clearInterval(timereset);
      timereset = setInterval(() => {
        if (currentIndex === 0) {
          switchTo1(); // 1枚目に切り替え
          currentIndex = 1;
        } else {
          switchTo2(); // 2枚目に切り替え
          currentIndex = 0;
        }
      }, 10000);
    }

    switches[0].addEventListener("click", switchTo1, reset);
    switches[1].addEventListener("click", switchTo2, reset);
    //でんちゃんの制作担当の切り替え機能

    const minDis = 100;
    let startX = 0;
    let endX = 0;

    slide.addEventListener("touchstart", (e) => {
      startX = e.touches[0].pageX;
    });
    slide.addEventListener("touchmove", (e) => {
      endX = e.changedTouches[0].pageX;
    });
    slide.addEventListener("touchend", (e) => {
      const distanceX = Math.floor(endX - startX);

      if (distanceX > minDis) {
        switchTo2();
        reset();
      } else if (distanceX < -minDis) {
        switchTo1();
        reset();
      } else {
        return;
      }
    });
    //スワイプで切り替える機能（スマホのみ有効）
  } //greetingページの動き↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
  else if (path.includes("/greeting")) {
    const texts = [...document.querySelectorAll(".greeting_text")];
    const photos = [...document.querySelectorAll(".greeting_img")];
    //テキストのスパン化
    texts.forEach((element) => {
      const fullText = element.textContent; // 元のテキストを取得
      element.innerHTML = ""; // 元の内容を消去

      // 各文字をスパンでラップ
      for (let char of fullText) {
        if (char === " ") {
          element.innerHTML += " "; // 空白の場合はそのまま追加
        } else if (char === "\n") {
          element.innerHTML += "<br>"; // 改行の場合は<br>を追加
        } else {
          const span = document.createElement("span"); // 新しいスパン要素を作成
          span.textContent = char; // スパン要素に文字を設定
          element.appendChild(span); // スパンをテキスト要素に追加
        }
      }
    });
    //textboxに入ってるかどうかチェック。
    window.addEventListener("scroll", () => {
      texts.forEach((x, y) => {
        const rect = x.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          textPrint(y);
        } else {
          reset(y);
        }
      });
    });
    //画面外の部分をreset
    function reset(x) {
      const spans = texts[x].querySelectorAll("span");
      spans.forEach((span) => {
        span.style.color = "white";
      });
    }

    //画面内の部分を動きを付ける
    function textPrint(x) {
      const spans = texts[x].querySelectorAll("span"); //全部のspanを配列化
      const totalSpans = spans.length; //文字数
      const scrollTop = window.scrollY; //今のスクロールの位置取得
      const text = texts[x];
      let textTop;

      if (width >= 300 && width < 400) {
        textTop = text.offsetTop + text.offsetHeight - 1000;
      } else if (width >= 400 && width < 639) {
        textTop = text.offsetTop + text.offsetHeight - 1200;
      } else if (width >= 640 && width <= 780) {
        textTop = text.offsetTop + text.offsetHeight - 1200;
      } else if (width >= 781 && width <= 1100) {
        textTop = text.offsetTop + text.offsetHeight - 1400;
      } else if (width <= 1500) {
        textTop = text.offsetTop + text.offsetHeight - 1100;
      } else if (width <= 1920) {
        textTop = text.offsetTop + text.offsetHeight - 900;
      } else {
        textTop = text.offsetTop + text.offsetHeight - 1400;
      }
      //スマホとpcのスピード調整

      const viewportHeight = window.innerHeight; //viewport取得
      const scrollPercent = Math.min((scrollTop - textTop) / viewportHeight, 1); //パーセント計算
      const readCount = Math.floor(totalSpans * scrollPercent); //今読んでる部分を確認
      const readingChars = 7;

      spans.forEach((span, index) => {
        if (index < readCount) {
          span.style.color = "rgba(255,255,255,1)"; //既読部分は白
        } else if (index < readCount + readingChars) {
          const colors = [
            "rgb(238,238,238)",
            "rgb(228,228,228)",
            "rgb(213,213,214)",
            "rgb(195,195,196)",
            "rgba(255,255,244,0.7)",
            "rgba(255,255,255,0.6)",
            "rgba(255,255,255,0.4)",
          ]; //読んでる部分の7文字の色調整
          span.style.color = colors[index - readCount] || "gray"; //範囲外回避
        } else {
          span.style.color = "#496ec6"; //未読部分は灰色
        }
      });
    }
  }
});
