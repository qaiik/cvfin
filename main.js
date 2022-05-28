function getPixelColor(canvas,x,y) {
   return Array.from(canvas.getContext("2d").getImageData(x,y,1,1).data)
}
