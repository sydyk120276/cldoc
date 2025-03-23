const acc = document.querySelector('.accordeon');

if (acc) {
  const items = acc.querySelectorAll('.accordeon__item-header');

  const onClickExpandContent = (evt) => {
    const target = evt.target;
    const content = target.parentNode;
    content.classList.toggle('expanded');
  };

  items.forEach((item) => {
    item.addEventListener('click', onClickExpandContent);
  });
}
