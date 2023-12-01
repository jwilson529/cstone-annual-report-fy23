 jQuery(document).ready(function($) {
  console.log('my CountUp file');
   // CountUp animations
   const annualRevenue = new CountUp('annualRevenue', 0, 341695779);
   const numOfStaff = new CountUp('numOfStaff', 0, 3629);
   const totalServices = new CountUp('totalServices', 0, 2115852);
   const patientsServed = new CountUp('patientsServed', 0, 109311);
   const schoolsServed = new CountUp('schoolsServed', 0, 852);
   const fosterAdmissions = new CountUp('fosterAdmissions', 0, 129);
   const fosterAdoptions = new CountUp('fosterAdoptions', 0, 46);
   const fosterReunifications = new CountUp('fosterReunifications', 0, 67);
   const inquiriesManaged = new CountUp('inquiriesManaged', 0, 116371);

   // Trigger the count-up animations when the page is loaded
   annualRevenue.start();
   numOfStaff.start();
   totalServices.start();
   patientsServed.start();
   schoolsServed.start();
   fosterAdmissions.start();
   fosterAdoptions.start();
   fosterReunifications.start();
   inquiriesManaged.start();
 });