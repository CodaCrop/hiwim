window.onload = function() {
  // Fetch sections to trigger animation
  let work = document.getElementById("work-section");
  let about = document.getElementById("about-section");
  let contact = document.getElementById("contact-section");

  // Fetch menu items to animate on scroll
  let menu = document.querySelectorAll('.menu-item');
  let work_menu = menu[0];
      about_menu = menu[1];
      contact_menu = menu[2];

  // Scroll event listener
  window.addEventListener('scroll', function() {
    if (isInViewport(work)) {
      work_menu.classList.add('active');
      if(about_menu.classList.contains('active') || contact_menu.classList.contains('active')) {
        about_menu.classList.remove('active'); contact_menu.classList.remove('active');
      }
    }
    if (isInViewport(about)) {
      about_menu.classList.add('active');
      if(work_menu.classList.contains('active') || contact_menu.classList.contains('active')) {
        work_menu.classList.remove('active'); contact_menu.classList.remove('active');
      }
    }
    if (isInViewport(contact)) {
      contact_menu.classList.add('active');
      if(work_menu.classList.contains('active') || about_menu.classList.contains('active')) {
        work_menu.classList.remove('active'); about_menu.classList.remove('active');
      }
    }
  });

  // Check if section is within viewport (40% off top and 60% off bottom)
  function isInViewport(el) {
    let rect = el.getBoundingClientRect();
    let html = document.documentElement;
    return (
      rect.top <= (window.innerHeight * .4 || html.clientHeight) &&
      rect.bottom >= (window.innerHeight * .6 || html.clientHeight)
    );
  }
}
