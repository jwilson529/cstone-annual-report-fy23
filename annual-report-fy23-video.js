jQuery(document).ready(function($) {

  $(document).on('click', '[data-toggle="lightbox"]', function(event) {
      event.preventDefault();
      $(this).ekkoLightbox({
          type: 'youtube'
      });
  });


  var videos = [
    { id: '4dEHc9Ckbxk' },
  ];
  var videoElements = videos.map(function(video, index) {
    var thumbnail = video.thumbnail || `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`;
    // var colClass = (index < 2) ? 'col-md-6 mb-3' : 'col-md-4 mb-3';
    var colClass = 'video-containers';
    return new Promise(function(resolve) {
      getTitle(video.id, function(title) {
        var videoElement = `
          <div class="${colClass}" data-aos="${applyAosClasses(index)}">
            <a href="https://www.youtube.com/watch?v=${video.id}" data-toggle="lightbox" data-title="${title}" data-gallery="gallery">
              <img src="${thumbnail}" alt="${title}" class="img-fluid">
            </a>
          </div>
        `;
        resolve(videoElement);
      });
    });
  });
  Promise.all(videoElements).then(function(elements) {
    $('#video-gallery').html(elements.join(''));
    $(document).on('click', '[data-toggle="lightbox"]', function(event) {
      event.preventDefault();
      $(this).ekkoLightbox({
        type: 'youtube'
      });
    });
  });


  function getTitle(videoId, callback) {
    $.get(
      "https://www.googleapis.com/youtube/v3/videos", {
        part: 'snippet',
        id: videoId,
        key: 'AIzaSyD-kz0j2Bk_FFRwlwoptS98iXIZY40mIus'
      },
      function(data) {
        callback(data.items[0].snippet.title);
      }
    );
  }

  function applyAosClasses(index) {
    var animations = ['fade-right', 'fade-left', 'fade-up', 'fade-down'];
    return animations[index % animations.length];
  }
});