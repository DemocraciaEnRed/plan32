import load from '@segment/load-script'
import fit from 'fit.js'
import waitUntil from 'wait-until'

export default function youtubeVideo (container) {
  if (window.YT && window.YT.Player) {
    init(container)
  } else {
    load('https://www.youtube.com/iframe_api', function (err) {
      if (err) throw err
      waitUntil()
        .interval(300)
        .times(3000)
        .condition(() => window.YT && window.YT.Player)
        .done(function () { init(container) })
    })
  }
}

function init (container) {
  const id = container.dataset.youtubeVideo

  if (!id) throw new Error('[data-youtube-video] param missing.')

  container.classList.add('stopped')
  container.classList.add('loading')
  container.classList.add('muted')

  if (window.getComputedStyle(container).position === 'static') {
    container.style.position = 'relative'
  }

  const video = document.createElement('div')
  const wrapper = video.cloneNode('div')
  const iframe = video.cloneNode('div')
  const muteBtn = video.cloneNode('div')

  video.classList.add('video')
  wrapper.classList.add('video-wrapper')
  muteBtn.classList.add('video-mute-btn')

  video.appendChild(wrapper)
  wrapper.appendChild(iframe)

  container.insertBefore(video, container.firstChild)
  container.appendChild(muteBtn)

  window.requestAnimationFrame(function () {
    fit(wrapper, video, {cover: true, watch: true})
  })

  const player = new window.YT.Player(iframe, {
    videoId: id,
    playerVars: {
      autoplay: 1,
      controls: 0,
      loop: 1,
      playsinline: 0,
      rel: 0,
      showinfo: 0,
      theme: 'dark',
      suggestedQuality: 'highres',
      playlist: [id]
    },
    events: {
      onReady: function () {
        mute()
        container.classList.remove('loading')
        if (window.YT.PlayerState.CUED === player.getPlayerState()) loadMobile()
      },
      onStateChange: onPlayerStateChange
    }
  })

  let loopInterval
  function onStart () {
    loopInterval = setInterval(function () {
      player.seekTo(0)
    }, Math.round(player.getDuration() * 1000) - 500)
    container.classList.remove('loading')
    container.classList.add('playing')
  }

  function onStop () {
    clearInterval(loopInterval)
    container.classList.add('loading')
    container.classList.remove('playing')
  }

  function onPlayerStateChange (evt) {
    const state = player.getPlayerState()
    if (window.YT.PlayerState.PLAYING === state) {
      onStart()
    } else {
      onStop()
    }
  }

  function mute () {
    player.mute()
    container.classList.add('muted')
  }

  function unmute () {
    player.unMute()
    container.classList.remove('muted')
  }

  muteBtn.addEventListener('click', function () {
    player.isMuted() ? unmute() : mute()
  })

  function loadMobile () {
    container.classList.add('mobile')
    player.destroy()
    wrapper.removeAttribute('style')
    const embed = document.createElement('iframe')
    embed.src = `https://www.youtube.com/embed/${id}`
    wrapper.appendChild(embed)
  }
}
