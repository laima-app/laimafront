const src = 'https://localhost:9999/widget/'
const style = {
    position: 'fixed',
    bottom: '15px',
    right: '0',
    width: '250px',
    height: '50px',
    zIndex: '2147483647',
    overflow: 'hidden'
}
const ifr = document.createElement('iframe')
ifr.setAttribute('id', 'laima-frame')
ifr.setAttribute('src', src)
ifr.setAttribute('allowfullscreen', true)
ifr.setAttribute('allowtransparency', true)
ifr.setAttribute('scrolling', false)
ifr.setAttribute('frameborder', '0')
document.body.appendChild(ifr)
for (let item in style) {
    ifr.style[item] = style[item]
}
const messageReceived = event => {
    const data = event.data
    if (data.status) {
        const el = document.querySelector("#laima-frame")
        if (data.status === 'active') {
            el.style.width = '100vw'
            el.style.height = '100vh'
            setTimeout(() => {
                el.style.bottom = 0
            }, 400)
        }
        else if (data.status === 'closed') {
            setTimeout(() => {
                el.style.bottom = style.bottom
                el.style.height = style.height
                el.style.width = style.width
            }, 300)
        }
    }
}
window.addEventListener("message", messageReceived, false)
setTimeout(() => {
    document.querySelector('#laima-frame').contentWindow.postMessage(
        { hostname: document.location.hostname }, '*'
    )
}, 2000)