document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelector(".slides");
  const dots = document.querySelector(".dots");
  const slideItems = document.querySelectorAll(".services-list-item");
  const itemsPerSlide = 3; // 3 элемента на слайд
  const gap = 32; // Отступ между элементами
  const totalItems = slideItems.length;
  const totalSlides = Math.ceil(totalItems / itemsPerSlide); // Количество слайдов (каждый слайд с 3 элементами)

  let currentSlide = 0;

  // Функция для обновления точек
  function updateDots() {
    dots.innerHTML = ""; // Очистить существующие точки
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("button");
      dot.classList.add("dot");
      if (i === currentSlide) dot.classList.add("active");
      dot.addEventListener("click", () => {
        currentSlide = i;
        updateSlidePosition();
        updateDots();
      });
      dots.appendChild(dot);
    }
  }

  // Функция для обновления положения слайдов
  function updateSlidePosition() {
    const slideWidth = slideItems[0].offsetWidth; // Ширина одного элемента
    const offset = currentSlide * (slideWidth + gap); // Смещаем слайд на ширину одного элемента + gap
    slides.style.transition = "transform 0.3s ease";
    slides.style.transform = `translateX(-${offset}px)`;
  }

  // Инициализация точек
  updateDots();

  // Обработка свайпов и драг
  let startX = 0;
  let isDragging = false;

  // Начало свайпа/драга
  slides.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
    slides.style.transition = "none"; // Убираем анимацию
  });

  // Конец свайпа/драга
  slides.addEventListener("mouseup", (e) => {
    if (!isDragging) return;
    let diff = e.clientX - startX;
    isDragging = false;

    // Проверяем разницу, чтобы переключить слайды
    if (Math.abs(diff) > 50) {
      if (diff < 0) {
        currentSlide = (currentSlide + 1) % totalSlides; // Переход на следующий слайд, цикл
      }
      if (diff > 0) {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides; // Переход на предыдущий слайд, цикл
      }
    }

    slides.style.transition = "transform 0.3s ease";
    updateSlidePosition();
    updateDots();
  });

  // События для мобильных устройств
  slides.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
    slides.style.transition = "none"; // Убираем анимацию
  });

  slides.addEventListener("touchend", (e) => {
    if (!isDragging) return;
    let diff = e.changedTouches[0].clientX - startX;
    isDragging = false;

    // Проверяем разницу, чтобы переключить слайды
    if (Math.abs(diff) > 50) {
      if (diff < 0) {
        currentSlide = (currentSlide + 1) % totalSlides; // Переход на следующий слайд, цикл
      }
      if (diff > 0) {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides; // Переход на предыдущий слайд, цикл
      }
    }

    slides.style.transition = "transform 0.3s ease";
    updateSlidePosition();
    updateDots();
  });

  // Изначально обновим позицию слайдов
  updateSlidePosition();
});
