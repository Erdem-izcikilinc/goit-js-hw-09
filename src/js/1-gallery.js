
const images = [
  {
    preview:
      '<https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg>',
    original:
      '<https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg>',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      '<https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg>',
    original:
      '<https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg>',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      '<https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg>',
    original:
      '<https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg>',
    description: 'Aerial Beach View',
  }, 
  {
    preview:
      '<https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg>',
    original:
      '<https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg>',
    description: 'Flower Blooms',
  },
  {
    preview:
      '<https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg>',
    original:
      '<https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg>',
    description: 'Alpine Mountains',
  },
  {
    preview:
      '<https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg>',
    original:
      '<https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg>',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      '<https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg>',
    original:
      '<https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg>',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      '<https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg>',
    original:
      '<https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg>',
    description: 'Nature Landscape',
  },
  {
    preview:
      '<https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg>',
    original:
      '<https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg>',
    description: 'Lighthouse Coast Sea',
  },
];
const gallery = document.querySelector('.gallery');

const galleryMap = images
  .map(
    (image, index) => `<li class="gallery-item">
  <a class="gallery-link" href="${image.preview.slice(1, -1)}">
    <img
      class="gallery-image"
      src="${image.preview.slice(1, -1)}"
      data-source="${image.original.slice(1, -1)}"
      data-index="${index}"
      alt="${image.description}"
    />
  </a>
</li>`
  )
  .join('');

gallery.insertAdjacentHTML('beforeend', galleryMap);

let instance = null;
let currentIndex = 0;

function createControls() {
  const closeBtn = document.createElement('button');
  closeBtn.textContent = '×';
  closeBtn.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    font-size: 48px;
    background: transparent;
    border: none;
    color: black;
    cursor: pointer;
    z-index: 10001;
  `;

  const prevBtn = document.createElement('button');
  prevBtn.textContent = '❮';
  prevBtn.style.cssText = `
    position: fixed;
    top: 50%;
    left: 20px;
    transform: translateY(-50%);
    font-size: 48px;
    background: transparent;
    border: none;
    color: black;
    cursor: pointer;
    z-index: 10001;
  `;

  const nextBtn = document.createElement('button');
  nextBtn.textContent = '❯';
  nextBtn.style.cssText = `
    position: fixed;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    font-size: 48px;
    background: transparent;
    border: none;
    color: black;
    cursor: pointer;
    z-index: 10001;
  `;

  document.body.appendChild(closeBtn);
  document.body.appendChild(prevBtn);
  document.body.appendChild(nextBtn);

  return { closeBtn, prevBtn, nextBtn };
}

function removeControls() {
  if (!window._lightboxControls) return;
  const { closeBtn, prevBtn, nextBtn } = window._lightboxControls;

  closeBtn.remove();
  prevBtn.remove();
  nextBtn.remove();

  window._lightboxControls = null;
}

function showImage(index) {
  const image = images[index];
  if (!image) return;

  currentIndex = index;

  const content = `
    <div style="position: relative; display: inline-block; max-width: 90vw; margin: 0 auto;">
      <img src="${image.original.slice(1, -1)}" alt="${image.description}" style="display: block; max-width: 100%; border-radius: 4px;" />
      <div class="lightbox-caption" style="
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        background: rgba(0, 0, 0, 0.6);
        color: white;
        padding: 8px 20px;
        font-size: 18px;
        box-sizing: border-box;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        text-align: left;
        user-select: none;
        opacity: 0;
        transition: opacity 1.5s ease;
      ">
        ${image.description}
      </div>
    </div>
  `;

  if (instance) {
    instance.close();
    instance = null;
    removeControls();
  }

  instance = basicLightbox.create(content, {
    onShow: (inst) => {
      const controls = createControls();

      controls.closeBtn.onclick = () => inst.close();
      controls.prevBtn.onclick = () => showImage((currentIndex - 1 + images.length) % images.length);
      controls.nextBtn.onclick = () => showImage((currentIndex + 1) % images.length);

      document.addEventListener('keydown', onKeyDown);

      window._lightboxControls = controls;

      const caption = inst.element().querySelector('.lightbox-caption');
      setTimeout(() => {
        caption.style.opacity = '1';
      }, 500);
    },
    onClose: (inst) => {
      document.removeEventListener('keydown', onKeyDown);
      removeControls();
      instance = null;
    },
  });

  instance.show();
}

function onKeyDown(e) {
  if (!instance) return;

  if (e.key === 'Escape') {
    instance.close();
  } else if (e.key === 'ArrowRight') {
    showImage((currentIndex + 1) % images.length);
  } else if (e.key === 'ArrowLeft') {
    showImage((currentIndex - 1 + images.length) % images.length);
  }
}

gallery.addEventListener('click', (event) => {
  event.preventDefault();
  const target = event.target;
  if (target.tagName !== 'IMG') return;

  const index = Number(target.dataset.index);
  showImage(index);
});
