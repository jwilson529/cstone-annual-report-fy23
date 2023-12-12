 jQuery(document).ready(function($) {
   // Custom count up function
  function animateValue(id, start, end, duration) {
    let obj = $('#' + id);
    let current = start;
    let change = end - start;
    let startTime = new Date().getTime();

    function easeOutQuad(t, b, c, d) {
      t /= d;
      return -c * t * (t - 2) + b;
    }

    let timer = setInterval(function() {
      let timeElapsed = new Date().getTime() - startTime;
      current = easeOutQuad(timeElapsed, start, change, duration);

      if (timeElapsed >= duration) {
        clearInterval(timer);
        current = end; // Ensure final value is exactly the end value
      } else if ((change > 0 && current > end) || (change < 0 && current < end)) {
        current = end; // Correct for overshooting the end value
      }

      obj.text(Math.round(current).toLocaleString());
    }, 60); // 60ms for smoother animation
  }


   // Function to check if an element is in the viewport.
   function isElementInView(element) {
       const rect = element.getBoundingClientRect();
       const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
       const windowWidth = (window.innerWidth || document.documentElement.clientWidth);
       // Check if any part of the element is visible in the viewport.
       const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
       const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);
       return vertInView && horInView;
   }




   // Flag to ensure animation only runs once
   let animationDone = false;

   // Check if the element is in view and start the animation
   function checkAnimation() {
     const byTheNumbers = $('#by-the-numbers');
     if (isElementInView(byTheNumbers[0]) && !animationDone) {
       animateValue('annualRevenue', 0, 341695779, 2500);
       animateValue('numOfStaff', 0, 3629, 2500); // 3080
       animateValue('totalServices', 0, 2115852, 2500); // 2189937
       animateValue('patientsServed', 0, 109311, 2500); // 107406
       animateValue('schoolsServed', 0, 852, 2500); // 750
       animateValue('fosterAdmissions', 0, 129, 2500);
       animateValue('fosterAdoptions', 0, 46, 2500);
       animateValue('fosterReunifications', 0, 67, 2500);
       animateValue('fosterServed', 0, 357, 2500);
       animateValue('inquiriesManaged', 0, 116371, 2500);
       animateValue('networkTherapists', 0, 1500, 2500); // 1400
       animateValue('veteransServed', 0, 6567, 2500);   //6580     
       animationDone = true;
     }
   }

   // Trigger the check when the page is scrolled
   $(window).on('scroll', checkAnimation);

   // Trigger the check when the page is initially loaded in case the section is already in view
   checkAnimation();
 });