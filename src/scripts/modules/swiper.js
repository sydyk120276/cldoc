import Swiper, {
  Navigation,
  Thumbs,
  EffectFade,
  Pagination,
  Autoplay,
} from "swiper";
Swiper.use([Thumbs, EffectFade, Navigation, Pagination, Autoplay]);

const topBannerSlider = document.querySelector(".top-banner .swiper");

if (topBannerSlider) {
  new Swiper(topBannerSlider, {
    slidesPerView: 1,
    spaceBetween: 40,

    pagination: {
      el: ".top-banner .swiper-pagination",
      clickable: true,
    },
  });
}

const infSliders = document.querySelectorAll(".infinity-slider");

if (infSliders.length) {
  infSliders.forEach((slider) => {
    new Swiper(slider, {
      modules: [Autoplay],
      autoplay: {
        enabled: true,
        delay: 0,
        pauseOnMouseEnter: false,
        disableOnInteraction: false,
      },
      loop: true,
      noSwipingClass: "swiper-slide",
      allowTouchMove: false,
      slidesPerView: "auto",
      spaceBetween: 60,
      speed: 5000,
      freeMode: true,
    });
  });
}

const reviewSlider = document.querySelector(".review-clients-slider");

if (reviewSlider) {
  const reviewSwiper = new Swiper(reviewSlider, {
    slidesPerView: 1,
    breakpoints: {
      767: {
        slidesPerView: 2,
      },

      1139: {
        slidesPerView: 3,
      },
    },
    spaceBetween: 20,

    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
      clickable: true,
    },
  });

  const tabs = document.querySelectorAll(".review-clients-tabs button");

  if (tabs) {
    const reviewCards = document.querySelectorAll(".review-card");

    const onClickFillSwiper = (evt) => {
      const target = evt.target;
      const type = target.dataset.type;

      const active = document.querySelector(
        ".review-clients-tabs button.active"
      );

      if (active === target) return;

      active.classList.remove("active");
      target.classList.add("active");

      if (type !== "all") {
        reviewCards.forEach((card) => {
          card.dataset.type === type
            ? card.classList.remove("hidden")
            : card.classList.add("hidden");
        });
      } else {
        reviewCards.forEach((card) => {
          card.classList.contains("hidden")
            ? card.classList.remove("hidden")
            : null;
        });
      }

      reviewSwiper.update();
    };

    tabs.forEach((tab) => {
      tab.addEventListener("click", onClickFillSwiper);
    });
  }
}

const sliders = document.querySelectorAll(".main-slider");

if (sliders) {
  sliders.forEach((slider) => {
    new Swiper(slider, {
      slidesPerView: "auto",
      autoHeight: true,
      spaceBetween: 30,
      pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
        clickable: true,
      },
    });
  });
}

const tabsSliders = document.querySelectorAll(".review-clients-tabs-slider");

if (tabsSliders) {
  tabsSliders.forEach((slider) => {
    new Swiper(slider, {
      slidesPerView: "auto",
    });
  });
}
