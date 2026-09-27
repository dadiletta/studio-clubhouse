// A YouTube background that never covers the photograph unless it is playing:
// blocked, still loading, on a phone or under reduced motion, you see the photo.
// How it works, step by step: the README's "How the video hero works".

(function () {
  const stage = document.querySelector('[data-hero-video]');
  if (!stage) return;

  const id = stage.dataset.video;
  if (!id) return;

  // THE CLIP: data-start and data-end, in seconds, on the same element. It loops
  // between them. No data-end plays to the end and starts again.
  const start = Number(stage.dataset.start) || 0;
  const end = Number(stage.dataset.end) || 0;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const narrow = window.matchMedia('(max-width: 767px)').matches;

  if (reduced || narrow) return;

  const probe = new Image();
  probe.onload = loadPlayer;
  // No handler needed for failure: the photograph is already on the page.
  probe.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

  function loadPlayer() {
    // YouTube's script calls this function by name once it has loaded.
    window.onYouTubeIframeAPIReady = addVideo;
    const api = document.createElement('script');
    api.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(api);
  }

  function addVideo() {
    const slot = document.createElement('div');
    stage.appendChild(slot);

    // The player replaces `slot` with an <iframe>, which styles.css sizes.
    new YT.Player(slot, {
      host: 'https://www.youtube-nocookie.com',
      videoId: id,
      playerVars: {
        autoplay: 1,
        mute: 1, // Browsers refuse to autoplay anything audible. This is why.
        start: start,
        controls: 0,
        playsinline: 1, // iOS otherwise takes the video fullscreen.
        rel: 0,
        disablekb: 1,
        iv_load_policy: 3, // no pop-up annotations
      },
      events: { onReady: onReady, onStateChange: onStateChange },
    });
  }

  function onReady(event) {
    const frame = event.target.getIframe();
    frame.title = 'Background video';
    // Decorative, so hidden from screen readers and out of the tab order.
    frame.setAttribute('aria-hidden', 'true');
    frame.tabIndex = -1;
  }

  // YouTube shows its own pause button for a few seconds after every start and
  // jump, so the video stays hidden until it has gone.
  const SETTLE = 4000; // milliseconds

  let started = false;

  function onStateChange(event) {
    if (event.data !== YT.PlayerState.PLAYING || started) return;
    started = true;

    const player = event.target;
    const last = end || player.getDuration() - 1;
    setTimeout(() => stage.classList.add('is-playing'), SETTLE);

    // THE LOOP: fade to the photograph just before the clip ends, jump back while
    // hidden, fade in again. The end screen of suggested videos never shows.
    setInterval(() => {
      const now = player.getCurrentTime();
      if (now >= last - 1.5) stage.classList.remove('is-playing');
      if (now >= last) {
        player.seekTo(start, true);
        setTimeout(() => stage.classList.add('is-playing'), SETTLE);
      }
    }, 250);
  }
})();
