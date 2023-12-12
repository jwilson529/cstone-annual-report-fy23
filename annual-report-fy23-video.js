jQuery(document).ready(function($) {
  AOS.init();
  var videos = [
    { id: '1i2slOPPxDM' },
    { id: '7bBBPJ2Y6rQ' },
    { id: 'Hz-c9kakvTQ'}
  ];

  videos.forEach(function(video, index) {
    getTitle(video.id, function(title) {
      var thumbnail = video.thumbnail || `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`;
      var colClass = 'col-md-12 mb-3';
      var videoElement = `
        <div class="${colClass}" data-aos="${applyAosClasses(index)}">
          <a href="https://www.youtube.com/watch?v=${video.id}" data-width="1280" data-toggle="lightbox" data-title="${title}" data-gallery="gallery">
            <img src="${thumbnail}" alt="${title}" class="img-fluid">
          </a>
        </div>
      `;

      if (index === 0) {
        $('#video-gallery').html(videoElement);
      } else if (index === 1) {
        $('#video-gallery-2').html(videoElement);
      } else if (index === 2) {
        $('#video-gallery-3').html(videoElement);
      }
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
