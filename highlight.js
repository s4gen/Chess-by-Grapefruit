const highlight = document.getElementById('highlight')
const highlightCtx = highlight.getContext('2d')

highlight.tile = function ([x, y], color) {
    highlightCtx.fillStyle = color
    highlightCtx.fillRect(x * 150, y * 150, 150, 150)
}

highlight.clear = () => {
    highlightCtx.clearRect(0, 0, 1200, 1200)
}

export { highlight, highlightCtx }