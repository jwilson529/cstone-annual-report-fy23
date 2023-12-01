  jQuery(document).ready(function($) {
    // Initialize sidebar depending on the screen size
    initializeSidebar();

    // Initialize AOS
    AOS.init();

    $('#annual-report-23 .highlight-text').one("transitionend webkitTransitionEnd oTransitionEnd", function() {
      $(this).closest('.highlight-bg').addClass('highlight-active');
    });


    // Listener for click events on the buttons
    $('.toggle-filter').on('click', function(event) {
      event.stopPropagation(); // Prevent click from propagating to document

      $("#donorList").css({
        'animation': 'none',
        'top': '0'
      });
      $('#donorList').animate({ scrollTop: 0 }, 'slow');
      $('.toggle-filter').removeClass('active');
      $(this).addClass('active');
      filterList();
    });

    // Listener for click events on the document
    $(document).on('click', function(event) {
      var $buttonGroup = $(".btn-group");

      // Check if the click was outside the button group
      if (!$buttonGroup.is(event.target) && $buttonGroup.has(event.target).length === 0) {
        $('.toggle-filter').removeClass('active');
      }
      $("#donorList").css({
        'animation': 'scrollUp 650s linear infinite',
        'top': '0'
      });
    });


    function filterList() {
      var searchValue = $("#liveSearch").val().toLowerCase().trim();
      var activeFilter = $('.toggle-filter.active').data('filter'); // Get the data-filter attribute of the active button

      $("#donorList > div").each(function() {
        var section = $(this);
        var sectionId = section.attr('id');
        var sectionName = sectionId.replace('Section', '').toLowerCase();

        // Determine if the section should be shown based on the active filter
        var shouldShowSection = !activeFilter || activeFilter === sectionName;


        if (shouldShowSection) {
          var foundInSearch = false;

          // Search within this section
          section.find("li").each(function() {
            if (!$(this).hasClass('heading')) {
              var name = $(this).text().toLowerCase().replace(/\s+/g, ' ').trim();
              if (name.includes(searchValue)) {
                $(this).show();
                foundInSearch = true;
              } else {
                $(this).hide();
              }
            }
          });

          // Always show the section header
          section.find("li.heading").show();

          // Show or hide the entire section based on search
          if (foundInSearch || searchValue === '') {
            section.show();
          } else {
            section.hide();
          }
        } else {
          section.hide();
        }
      });
    }




    $("#liveSearch").on("keyup", function() {
      var value = $(this).val().toLowerCase().trim();

      // Stop animation when typing starts
      if (value !== '') {
        $("#donorList").css('animation', 'none');
      }

      // Iterate through each section
      $("#donorList > div").each(function() {
        var section = $(this);
        var found = false;

        // Search within this section
        section.find("li").each(function() {
          var name = $(this).text().toLowerCase().replace(/\s+/g, ' ').trim();
          if (name.includes(value)) {
            $(this).show();
            found = true; // Mark that a match was found in this section
          } else {
            if (!$(this).hasClass('heading')) {
              $(this).hide(); // Hide non-heading list items that don't match
            }
          }
        });

        // Show or hide the entire section based on if a match was found
        if (found) {
          section.show();
        } else {
          section.hide();
        }
      });
      filterList();
    });

    // Pause and reset animation on focus
    $("#liveSearch").on("focus", function() {
      $("#donorList").css({
        'animation': 'none',
        'top': '0'
      });
    });

    // Optional: Resume animation on blur, if needed
    $("#liveSearch").on("blur", function() {
      // Resume the animation
      $("#donorList").css({
        'animation': 'scrollUp 650s linear infinite',
        'top': '0'
      });
    });
    // Populate the list
    // Create and append "Donors" section with heading
    $("#donorList").append("<div id='donorSection'><li class='heading'>Donors</li></div>");

    // Iterate through donors and append each donor to the donor section
    $.each(donors, function(index, value) {
      $("#donorSection").append("<li><span class='name'>" + value + "</span></li>");
    });

    // Create and append "Honorary" section with heading
    $("#donorList").append("<div id='honorarySection'><li class='heading'>Honorary</li></div>");

    // Iterate through honorary and append each honorary member to the honorary section
    $.each(honorary, function(index, value) {
      $("#honorarySection").append("<li><span class='name'>" + value + "</span></li>");
    });

    // Create and append "Memorial" section with heading
    $("#donorList").append("<div id='memorialSection'><li class='heading'>Memorial</li></div>");

    // Iterate through memorial and append each memorial member to the memorial section
    $.each(memorial, function(index, value) {
      $("#memorialSection").append("<li><span class='name'>" + value + "</span></li>");
    });

    // Create and append "Sapphire" section with heading
    $("#donorList").append("<div id='sapphireSection'><li class='heading'>Sapphire</li></div>");

    // Iterate through sapphire and append each member to the sapphire section
    $.each(sapphire, function(index, value) {
      $("#sapphireSection").append("<li><span class='name'>" + value + "</span></li>");
    });

    // Create and append "Endowment" section with heading
    $("#donorList").append("<div id='endowment-r-Section'><li class='heading'>Endowment - Restricted</li></div>");

    // Iterate through endowment and append each member to the endowment section
    $.each(restricted, function(index, value) {
      $("#endowment-r-Section").append("<li><span class='name'>" + value + "</span></li>");
    });

    // Create and append "Endowment" section with heading
    $("#donorList").append("<div id='endowment-ur-Section'><li class='heading'>Endowment - Unrestricted</li></div>");

    // Iterate through endowment and append each member to the endowment section
    $.each(unrestricted, function(index, value) {
      $("#endowment-ur-Section").append("<li><span class='name'>" + value + "</span></li>");
    });

    // Function to append items to Bootstrap columns within a row
    function appendItemsToColumns(containerId, items) {
      var $container = $(containerId);
      var row = $('<div class="row"></div>'); // Create a row
      $container.append(row); // Append the row to the container

      // Create a col-md-3 for each item and append to the row
      $.each(items, function(index, value) {
        var col = $('<div class="col-md-3 mb-3"></div>'); // Create a column
        col.append("<div class='item-container border-bottom'>" + value + "</div>"); // Append item to the column
        row.append(col); // Append column to the row
      });
    }

    // jQuery to handle scrolling within the modal
    $(document).on('click', '.not-filter', function() {
      var sectionId = $(this).data('section');
      $('#donorModal').on('shown.bs.modal', function() {
        $('#donorModal .modal-body').animate({
          scrollTop: $(sectionId).offset().top
        }, 500);
      });
    });

    // When the donor modal is shown
    $('#donorModal').on('shown.bs.modal', function() {
      // Disable scrollify
      $.scrollify.disable();

      // Clear previous content
      $("#modal_donors, #modal_sapphire, #modal-honorary, #modal-memorial, #modal-endowment").empty();

      // Populate the modal sections within rows and columns
      appendItemsToColumns("#modal_donors", donors);
      appendItemsToColumns("#modal_sapphire", sapphire);
      appendItemsToColumns("#modal-honorary", honorary);
      appendItemsToColumns("#modal-memorial", memorial);
      appendItemsToColumns("#modal-endowment", restricted.concat(unrestricted)); // Combining both arrays for a single section
    });

    // Enable scrollify again when the donor modal is closed
    $('#donorModal').on('hidden.bs.modal', function() {
      $.scrollify.enable();
    });


    // Disable Scrollify when the scrollable list is focused
    $('#donor-list-container').on('mouseenter', function() {
      $.scrollify.disable();
    });

    // Re-enable Scrollify when the scrollable list loses focus
    $('#donor-list-container').on('mouseleave', function() {
      $.scrollify.enable();
    });

    // When the modal is opened
    $('#donorModal').on('shown.bs.modal', function() {
      $.scrollify.disable();
    });

    // When the modal is closed
    $('#donorModal').on('hidden.bs.modal', function() {
      $.scrollify.enable();
    });



    // Calculate the full height of the donorList
    var listHeight = $("#donorList").height();

    // Update the animation rule
    var cssAnimation = "@keyframes scrollUp { from { top: 0; } to { top: -" + listHeight + "px; } }";
    $('<style>' + cssAnimation + '</style>').appendTo('head');

    // Apply the updated animation
    $("#donorList").css({
      "animation": "scrollUp 650s linear infinite"
    });

    // Slow down animation on hovering over the list item but not the name
    $("#donorList li").hover(
      function() {
        $(this).css({
          "animation-play-state": "paused"
        });
      },
      function() {
        $(this).css({
          "animation-play-state": "running"
        });
      }
    );


    // Stop animation entirely on hovering over a specific name
    $("#donorList li .name").hover(
      function() {
        $("#donorList").css({
          "animation-play-state": "paused"
        });
      },
      function() {
        $("#donorList").css({
          "animation-play-state": "running"
        });
      }
    );


    const $elements = $("#update-988, #by-the-numbers, #financial-growth, #our-board-members, #our-donors, #annual-report-23, #letter-from-david, #history-centerstone");

    function checkVisibility() {
      $elements.each(function() {
        const $element = $(this);

        const topOfElement = $element.offset().top;
        const bottomOfElement = $element.offset().top + $element.outerHeight();
        const topOfViewport = $(window).scrollTop();
        const bottomOfViewport = topOfViewport + $(window).height();

        if (bottomOfElement > topOfViewport && topOfElement < bottomOfViewport) {
          $element.addClass('in-viewport');
        } else {
          $element.removeClass('in-viewport');
        }
      });
    }



    // Check visibility initially and on scroll
    checkVisibility();
    $(window).on('scroll resize', checkVisibility);

    // Scrollify Initialization
    if ($(window).width() >= 992) { // 768px is generally the breakpoint for mobile devices
      $.scrollify({
        section: ".section"
      });
      // Handle Scrollify navigation
      $(document).on("click", ".nav-link", function(event) {
        event.preventDefault();
        const target = $(this).attr("href");
        const index = $(target).index('.section');
        if (index !== -1) {
          $.scrollify.move(index);
        }
      });
    }

    // Handle scroll event for activating section links
    $(window).on('scroll', function() {
      const offset = 50;
      const currentScroll = $(this).scrollTop() + offset;
      let $currentSection;

      $('section[id]').each(function() {
        const divPosition = $(this).offset().top;

        if (divPosition - 1 < currentScroll) {
          $currentSection = $(this);
        }

        $('.nav-link').removeClass('active');

        if ($currentSection) {
          const id = $currentSection.attr('id');
          $('[href="#' + id + '"]').addClass('active');
        }
      });
    });

    // SIDEBAR //

    // Toggle sidebar visibility and adjust main content
    function toggleSidebar() {
      let windowWidth = $(window).width();
      console.log('main-content: ' + $('.main-content').width());
      console.log('combined-sections: ' + $('#combined-sections').width());
      console.log('body: ' + $('body').width());
      
      let position = parseFloat($(".sidebar").css("right")); // Parse the value to a float

      if (position < 0) { // If it's negative (hidden)
        $("#toggleIcon").removeClass("fa-chevron-left moved-icon").addClass("fa-times"); // Change icon to X

        if (windowWidth < 992) {
          $(".sidebar").css({
            "right": "0%",
            "width": "80%" // Set to 80% width if window width is below 992px
          });
        } else {
          $(".sidebar").css({
            "right": "0%",
            "width": "20%" // Reset to 20% width for window width above 992px
          });
          $(".main-content").removeClass("full-width").addClass("with-sidebar"); // Expand content to full width
        }
      } else {
        $("#toggleIcon").removeClass("fa-times").addClass("fa-chevron-left moved-icon"); // Change icon to chevron-left
        $(".main-content").removeClass("with-sidebar").addClass("full-width"); // Reset content margin-right

        if (windowWidth < 992) {
          $(".sidebar").css({
            "right": `-${80 - 5}%`, // Hide sidebar but leave 5% visible for the button
            "width": "80%" // Set to 80% width
          });
        } else {
          $(".sidebar").css("right", "-19%"); // Hide sidebar
        }
      }
    }

    // Initialize sidebar based on window size
    function initializeSidebar() {
      const windowWidth = $(window).width();
      console.log('combined-sections: ' + $('#combined-sections').width());
      console.log('body: ' + $('body').width());

      if (windowWidth < 992) {
        // Set initial state for mobile
        $(".sidebar").css({
          "right": `-${80 - 5}%`, // Adjust as needed
          "width": "80%"
        });
        $(".main-content").css("width", "100%").removeClass("with-sidebar");
        $("#toggleIcon").addClass("fa-chevron-left moved-icon").removeClass("fa-times");
      } else {
        // Set initial state for desktop
        $(".sidebar").addClass("visible").css("width", "20%");
        $(".main-content").css("width", "80%").addClass("with-sidebar");
        $("#toggleIcon").addClass("fa-times").removeClass("fa-chevron-left moved-icon");
      }

      console.log('main-content: ' + $('.main-content').width());
    }



    // $(window).on("resize", function() {
    //   const windowWidth = $(window).width();
    //   const toggleIconWidth = $("#toggleIcon").outerWidth(true); // Get the total width including margin, padding, and border

    //   if (windowWidth >= 992) {
    //     $(".sidebar").css({
    //       "right": "0%",
    //       "width": "20%"
    //     });
    //     $(".main-content").removeClass("full-width").addClass("with-sidebar");
    //     $("#toggleIcon").removeClass("fa-chevron-left moved-icon").addClass("fa-times");

    //     // Reset the left margin/padding of .main-content
    //     $(".main-content").css("margin-left", "0px");
    //   } else {
    //     $(".sidebar").css({
    //       "right": `-${80 - 2}%`,
    //       "width": "80%"
    //     });
    //     $(".main-content").removeClass("with-sidebar").addClass("full-width");
    //     $("#toggleIcon").removeClass("fa-times").addClass("fa-chevron-left moved-icon");

    //     // Set the left margin/padding of .main-content to ensure the toggle icon doesn't overlap
    //     $(".main-content").css("margin-left", `${toggleIconWidth + 20}px`); // 20px buffer
    //   }
    // });


    // Toggle sidebar when menu button is clicked
    $("#sidebarCollapse").on("click", toggleSidebar);

    // Close sidebar when clicking outside of it, only on mobile
    $(document).on("click", function(event) {
      const windowWidth = $(window).width();
      if (windowWidth < 992) { // Check if it's mobile view
        const $sidebar = $(".sidebar");
        const position = parseFloat($sidebar.css("right")); // Parse the value to a float

        // Check if sidebar is currently open (its right position is >= 0)
        if (position >= 0) {
          // Check if clicked target is outside the sidebar
          if (!$(event.target).closest('.sidebar').length && !$(event.target).closest('#sidebarCollapse').length) {
            toggleSidebar();
          }
        }
      }
    });

  });