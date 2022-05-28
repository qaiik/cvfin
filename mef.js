function canvas(w = 300, h = 150) {
    let r = document.createElement("canvas")
    r.height = h
    r.width = w
    return r
}

function points(startx, starty, w, h) {
    return [
        [startx, starty],
        [startx + w, starty],
        [startx + w, starty + h],
        [startx, starty + h]
    ]
}


function getPixelColor(canvas, x, y) {
    return Array.from(canvas.getContext("2d").getImageData(x, y, 1, 1).data)
}

function gpc(canvas, x, y, sx, sy) {
    return Array.from(canvas.getContext("2d").getImageData(x, y, sx, sy).data)
}

function gap(canvas) {
    return gpc(canvas, 0, 0, canvas.width, canvas.height)
}

function gx(index, w = 300, h = 150, nx = 5, ny = 5) {
    let fpd = []
    for (let i = 0; i < w; i += nx) {
        for (let ii = 0; ii < h; ii += ny) {
            fpd.push([i, ii])
        }
    }

    return fpd[index]
}

// function genPixels(canvas,nx=5,ny=5) {
//    let ctx = canvas.getContext("2d")
//    let fpd = []
//    for (let i = 0; i < canvas.width; i+=nx) {
//     for (let ii = 0; ii < canvas.height; ii+=ny) {
//         fpd.push(Array.from(ctx.getImageData(i,ii,nx,ny).data))
//     }
//    }
//    return fpd
// }

function chunk(n, c) {
    return n.reduce((n, r, t) => {
        const o = Math.floor(t / c);
        return n[o] = [].concat(n[o] || [], r), n
    }, [])
}


function findImg(parent, canvas, ih, iw) {
    if (parent.tagName !== "CANVAS") {
        console.log("parent argument must be canvas. use canvas.content.drawImage on a new canvas to convert img to canvas.")
    }
    if (canvas.tagName === "IMG") {
        console.log("canvas argument must be type canvas. use canvas.context.drawImage on a new canvas to convert img to canvas.")
    }
    let allPixels = gap(parent)
    let cp = gap(canvas)
    let chunks = chunk(allPixels, ih * iw * 4)
    let ind = String(chunks).indexOf(String([cp]))
    if (ind !== -1) {
      let start = gx(ind, parent.width, parent.height, iw, ih)
      return points(start[0], start[1], iw, ih)
    }
    return false
}
