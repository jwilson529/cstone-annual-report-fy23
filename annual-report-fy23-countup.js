 jQuery(document).ready(function($) {
   console.log('my custom CountUp file');

   // Custom count up function
   function animateValue(id, start, end, duration) {
       let obj = $('#' + id);
       let current = start;
       let change = end - start;
       let startTime = new Date().getTime();

       function easeOutQuad(t, b, c, d) {
           t /= d;
           return -c * t*(t-2) + b;
       }

       let timer = setInterval(function() {
           let timeElapsed = new Date().getTime() - startTime;
           current = easeOutQuad(timeElapsed, start, change, duration);

           // Correct for overshooting the end value
           if ((change > 0 && current > end) || (change < 0 && current < end)) {
               current = end;
           }

           obj.text(Math.round(current).toLocaleString());

           if (timeElapsed >= duration) {
               clearInterval(timer);
           }
       }, 60); // 60ms for smoother animation
   }



   // Trigger the count-up animations when the page is loaded
   animateValue('annualRevenue', 0, 341695779, 2500); // 5 seconds duration
   animateValue('numOfStaff', 0, 3629, 2500);
   animateValue('totalServices', 0, 2115852, 2500);
   animateValue('patientsServed', 0, 109311, 2500);
   animateValue('schoolsServed', 0, 852, 2500);
   animateValue('fosterAdmissions', 0, 129, 2500);
   animateValue('fosterAdoptions', 0, 46, 2500);
   animateValue('fosterReunifications', 0, 67, 2500);
   animateValue('inquiriesManaged', 0, 116371, 2500);
 });