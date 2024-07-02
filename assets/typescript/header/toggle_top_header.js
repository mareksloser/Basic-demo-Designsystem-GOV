const toggleTopHeaderBtn = document.querySelector('#toggleTopHeader');

toggleTopHeaderBtn.addEventListener('gov-click', () => {
   toggleTopHeaderBtn.classList.toggle('is-active');

   const overflowName = toggleTopHeaderBtn.getAttribute('data-overflow');
   if(overflowName) {
      const overflowElement = document.querySelector('.' + overflowName);

      overflowElement.classList.toggle('is-fixed');
      overflowElement.parentElement.classList.toggle('justify-end');
      overflowElement.parentElement.classList.toggle('justify-between');
   }


});