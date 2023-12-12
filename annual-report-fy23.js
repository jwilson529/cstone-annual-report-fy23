  jQuery(document).ready(function($) {
    // Initialize sidebar depending on the screen size
    initializeSidebar();
    applyHighlight();
    // Initialize AOS with disable option set to false
    AOS.init({
      disable: false,
      startEvent: 'DOMContentLoaded',
    });

    // Refresh AOS to ensure animations are applied
    AOS.refresh();

    $(document).on('click', '[data-toggle="lightbox"]', function(event) {
      event.preventDefault();
      $(this).ekkoLightbox();
    });


    function applyHighlight() {
      if ($(window).width() >= 992) {
        // Desktop: Wait for AOS to finish
        $('#highlight-section .highlight-text').one("transitionend webkitTransitionEnd oTransitionEnd", function() {
          // Add the class only if AOS has finished animating this element
          if ($(this).closest('[data-aos]').hasClass('aos-animate')) {
            $(this).closest('.highlight-bg').addClass('highlight-active');
          }

          if ($(this).is('#highlight-section .highlight-text:last')) {
            setTimeout(function() {
              $('.blockquote .highlight-text').closest('.highlight-bg').addClass('highlight-active');
            }, 400);
          }
        });
      } else {
        // Mobile: Apply highlight immediately
        $('#highlight-section .highlight-text, .blockquote .highlight-text').closest('.highlight-bg').addClass('highlight-active');
      }
    }
    $(window).resize(applyHighlight);

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
            console.log(section);
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
    $("#donorList").append("<div id='donorSection'><ul class='heading'><li>Donors</li></ul></div>");

    // Create a container for the grid in the modal
    $("#modal-donors, #modal-sapphire, #modal-honorary, #modal-memorial, #modal-endowment").append("<div class='row my-3'></div>");

    // Iterate through donors and append each donor to both the donor section and the modal donors
    $.each(donors, function(index, value) {
      var donorListItem = "<li><span class='name'>" + value + "</span></li>";
      var donorGridItem = "<div class='col-md-4 col-lg-3'><div class='donor-name border-bottom'>" + value + "</div></div>";

      // Append to the donor section
      $("#donorSection .heading").append(donorListItem);

      // Also append to the modal donors in a grid layout
      $("#modal-donors .row").append(donorGridItem);
    });


    // Create and append "Honorary" section with heading
    $("#donorList").append("<div id='honorarySection'><li class='heading'>Honorary</li></div>");

    // Iterate through endowment and append each member to the endowment section
    $.each(honorary, function(index, value) {
      $("#honorarySection").append("<li><span class='name'>" + value + "</span></li>");
    });

    // Function to format honorary text
    function formatHonoraryText(value) {
        var parts = value.split('<br>');
        var formattedText = "<span class='honorary-intro'>" + parts[0] + "</span><br>";

        if (parts.length > 1) {
            formattedText += "<span class='honorary-name'>" + parts[1] + "</span>";
            for (var i = 2; i < parts.length; i++) {
                formattedText += "<br><span class='honorary-from'>" + parts[i] + "</span>";
            }
        }

        return formattedText;
    }

    // Iterate through honorary and append each honorary member to the honorary section
    $.each(honorary, function(index, value) {
        var formattedValue = formatHonoraryText(value);

        var honoraryListItem = "<li>" + formattedValue + "</li>";
        var honoraryGridItem = `
            <div class='col-md-4 col-lg-4 mb-3'>
                <div class='card mb-3 h-100'>
                    <div class='card-body'>
                        <p class='card-text'>${formattedValue}</p>
                    </div>
                </div>
            </div>
        `;

        // Also append to the modal honorary in a grid layout
        $("#modal-honorary .row").append(honoraryGridItem);
    });


    // Function to format memorial text
    function formatMemorialText(value) {
        var parts = value.split('<br>');
        var formattedText = "<span class='memorial-intro'>" + parts[0] + "</span><br>";

        for (var i = 1; i < parts.length; i++) {
            formattedText += "<span class='memorial-name'>" + parts[i] + "</span>";
            if (i < parts.length - 1) {
                formattedText += "<br>";
            }
        }

        return formattedText;
    }

    // Create and append "Memorial" section with heading
    $("#donorList").append("<div id='memorialSection'><li class='heading'>Memorial</li><ul id='memorialList'></ul></div>");

    // Iterate through memorial and append each member to the memorial section
    $.each(memorial, function(index, value) {
        var formattedValue = formatMemorialText(value);

        var memorialListItem = "<li>" + formattedValue + "</li>";
        $("#memorialList").append(memorialListItem);

        var memorialGridItem = `
            <div class='col-md-4 col-lg-4 mb-3'>
                <div class='card mb-3 h-100'>
                    <div class='card-body'>
                        <p class='card-text'>${formattedValue}</p>
                    </div>
                </div>
            </div>
        `;

        // Also append to the modal memorial in a grid layout
        $("#modal-memorial .row").append(memorialGridItem);
    });


    // Iterate through memorial and append each memorial member to the memorial section
    // Function to format memorial text
    function formatMemorialText(value) {
        var parts = value.split('<br>');
        var formattedText = "<span class='memorial-intro'>" + parts[0] + "</span><br>";

        if (parts.length > 1) {
            formattedText += "<span class='memorial-name'>" + parts[1] + "</span>";
            for (var i = 2; i < parts.length; i++) {
                formattedText += "<br><span class='memorial-name'>" + parts[i] + "</span>";
            }
        }

        return formattedText;
    }

    // Iterate through the memorial arrays and create the cards
    $.each([memorial, memorialLong], function(arrayIndex, memorialArray) {
        $.each(memorialArray, function(index, value) {
            var formattedValue = formatMemorialText(value);

            var memorialGridItem = `
                <div class='col-md-6 col-lg-4'>
                    <div class='card mb-3'>
                        <div class='card-body'>
                            <p class='card-text'>${formattedValue}</p>
                        </div>
                    </div>
                </div>
            `;
        });
    });

    // Create and append "Sapphire" section with heading
    $("#donorList").append("<div id='sapphireSection'><li class='heading'>Sapphire Society</li></div>");

    // Iterate through sapphire and append each member to the sapphire section
    $.each(sapphire, function(index, value) {
      $("#sapphireSection").append("<li><span class='name'>" + value + "</span></li>");

      var sapphireListItem = "<li><span class='name'>" + value + "</span></li>";
      var sapphireGridItem = "<div class='col-md-4 col-lg-3'><div class='donor-name border-bottom'>" + value + "</div></div>";

      // Append to the sapphire section
      $("#sapphireSection .heading").append(sapphireListItem);

      // Also append to the modal sapphires in a grid layout
      $("#modal-sapphire .row").append(sapphireGridItem);

    });

    // Function to format endowment text
    function formatEndowmentText(value) {
        return "<span class='endowment-name'>" + value + "</span>";
    }

    // Create and append "Endowment" section with heading
    $("#donorList").append("<div id='endowmentSection'><li class='heading'>Endowment</li><ul id='endowmentList'></ul></div>");

    // Iterate through restricted endowment and append each member to the endowment section
    $.each(restricted, function(index, value) {
        var formattedValue = formatEndowmentText(value);

        var endowmentListItem = "<li>" + formattedValue + "</li>";
        $("#endowmentList").append(endowmentListItem);

        var endowmentGridItem = `
            <div class='col-md-4 col-lg-4 mb-3'>
                <div class='card mb-3 h-100'>
                    <div class='card-body'>
                        <p class='card-text'>${formattedValue}</p>
                    </div>
                </div>
            </div>
        `;

        // Also append to a modal endowment in a grid layout (if needed)
        $("#modal-endowment .row").append(endowmentGridItem);
    });

    // Iterate through unrestricted endowment and append each member to the endowment section
    $.each(unrestricted, function(index, value) {
        var formattedValue = formatEndowmentText(value);

        var endowmentListItem = "<li>" + formattedValue + "</li>";
        $("#endowmentList").append(endowmentListItem);

        // If grid layout is also required for unrestricted endowment
        var endowmentGridItem = `
            <div class='col-md-4 col-lg-4 mb-3'>
                <div class='card mb-3 h-100'>
                    <div class='card-body'>
                        <p class='card-text'>${formattedValue}</p>
                    </div>
                </div>
            </div>
        `;

        $("#modal-endowment .row").append(endowmentGridItem);
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
    $(document).on('click', '#donorModal .not-filter', function(event) {
        event.preventDefault();
        var sectionId = $(this).attr('href');
        var targetElement = $(sectionId);
        var modalBody = $('#donorModal .modal-body');

        if(targetElement.length) {
            var targetOffset = targetElement.offset().top;
            var modalBodyOffset = modalBody.offset().top;
            var scrollDistance = targetOffset - modalBodyOffset - 120; // 120 can be adjusted for any fixed header or margin

            modalBody.animate({
                scrollTop: modalBody.scrollTop() + scrollDistance
            }, 1000); // Duration of the animation in milliseconds
        } else {
            console.log('Target element not found for ID:', sectionId);
        }
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


    const $elements = $("#annual-report-23, #letter-from-david, #history-centerstone, #highlights-accomplishments, #patient-stories, #update-988, #national-policy, #by-the-numbers, #financial-growth, #military-services, #institute, #our-board-members, #our-donors, #team-photo-gallery, #about-the-design");

    //SCROLLIFY

    function debounce(func, wait, immediate) {
      var timeout;
      return function() {
        var context = this,
          args = arguments;
        var later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    };




    // Utility function to check the visibility of elements
    function checkVisibility() {
      $elements.each(function() {
        const $element = $(this);
        const topOfElement = $element.offset().top;
        const bottomOfElement = topOfElement + $element.outerHeight();
        const topOfViewport = $(window).scrollTop();
        const bottomOfViewport = topOfViewport + $(window).height();

        if (bottomOfElement > topOfViewport && topOfElement < bottomOfViewport) {
          $element.addClass('in-viewport');
        } else {
          $element.removeClass('in-viewport');
        }
      });
    }

    // Function to handle activation of section links
    function handleSectionActivation() {
      const offset = -150;
      const currentScroll = $(window).scrollTop() + offset;
      let $currentSection;

      $('section[id]').each(function() {
        const divPosition = $(this).offset().top;
        if (divPosition - 1 < currentScroll) {
          $currentSection = $(this);
        }
      });

      $('.nav-link').removeClass('active');
      if ($currentSection) {
        const id = $currentSection.attr('id');
        $('[href="#' + id + '"]').addClass('active');
      }
    }

    // Initialize Scrollify if window width is sufficient
    function initializeScrollify() {
      if ($(window).width() >= 992) {
        $.scrollify({
          section: ".section",
          easing: "easeOutExpo",
          scrollSpeed: 800,
          setHeights: true,
          updateHash: false,
          after: function(sectionIndex) {
              var scrolledSection = $.scrollify.current();
              if (scrolledSection.length > 0) {
                  var topOffset = scrolledSection.offset().top;
                  if (window.scrollY !== topOffset) {
                      window.scrollTo(0, topOffset);
                  }
              }
          }
        });
      } else {
        $.scrollify.destroy();
      }
    }

    // Also consider reinitializing on window resize
    $(window).on('resize', function() {
      initializeScrollify();
    });


    // Function to handle Scrollify navigation
    function handleScrollifyNavigation() {
      $(document).on("click", ".nav-link", function(event) {
        console.log('nav-link click');

        // Check if the window's width is greater than 992px
        if ($(window).width() > 992) {
          event.preventDefault();
          const target = $(this).attr("href");
          const index = $(target).index('.section');
          if (index !== -1) {
            $.scrollify.move(index);
          }
        }
      });
    }


    // Event Listeners
    $(window).on('scroll resize', checkVisibility);
    // Usage with your scroll event
    $(window).on('scroll', debounce(handleSectionActivation, 150));
    initializeScrollify();
    handleScrollifyNavigation();

    // Modal event handlers
    $('#donorModal').on('shown.bs.modal', function() {
      $.scrollify.disable();
      // Rest of the modal open logic
    });

    $('#donorModal').on('hidden.bs.modal', function() {
      $.scrollify.enable();
      // Additional logic when modal is closed, if needed
    });

    // Handle Scrollify state for scrollable list
    $('#donor-list-container').on('mouseenter mouseleave', function(event) {
      if (event.type === 'mouseenter') {
        $.scrollify.disable();
      } else {
        $.scrollify.enable();
      }
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
            "right": `-${80 - 2}%`, // Hide sidebar but leave 5% visible for the button
            "width": "80%" // Set to 80% width
          });
        } else {
          $(".sidebar").css("right", "-19%"); // Hide sidebar
        }
      }
    }

    function initializeSidebar() {
      const windowWidth = $(window).width();
      if (windowWidth < 992) {
        // Mobile settings
        $(".sidebar").removeAttr('style').css({
          "right": `-${80 - 2}%`, // Adjust as needed
          "width": "80%"
        }).removeClass("visible");

        $(".main-content").removeAttr('style').css("width", "100%").removeClass("with-sidebar");

        $("#toggleIcon").addClass("fa-chevron-left moved-icon").removeClass("fa-times");
      } else {
        // Desktop settings
        $(".sidebar").removeAttr('style').addClass("visible").css("width", "20%");
        $(".main-content").removeAttr('style').css("width", "80%").addClass("with-sidebar");
        $("#toggleIcon").addClass("fa-times").removeClass("fa-chevron-left moved-icon");
      }
    }

    // Debounce function to limit how often a function can run
    function debounce(func, wait, immediate) {
      let timeout;
      return function() {
        const context = this,
          args = arguments;
        const later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    }

    const debouncedInitializeSidebar = debounce(initializeSidebar, 250);

    $(window).on("resize", debouncedInitializeSidebar);



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