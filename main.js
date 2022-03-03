let output = document.getElementById("output")
let cantype = true
let started = false
let start = 0;
let clicks = 0;
let duration = 30 * 1000
let trailingSpace = false

document.addEventListener("keypress", e => {
    if (!started) {
        animation()
        started = true
        start = performance.now()
        output.innerText = ""
        setTimeout(() => {
            cantype = false
            output.innerText = `${(clicks / (duration / 1000) ).toFixed(2)} CPS`
        }, duration)
    }
    if (started && cantype) {
        clicks += 1
        if (e.key === " ") {
            trailingSpace = true
        } else if (trailingSpace) {
            trailingSpace = false
            output.innerText += " " + e.key
        } else {
            output.innerText += e.key
        }
    }
})

document.addEventListener("keydown", e => {
    if (e.key === "Backspace" || e.key === "Delete") {
        output.innerText = output.innerText.slice(0, -1)
    }
})

let animation = () => {
    if (started) {
        let now = performance.now()
        let percent = 100 - ((now - start) / duration) * 100
        document.documentElement.setAttribute("style", `--percent: ${percent}%`)
    }
    requestAnimationFrame(animation)
}