export function uploadImage(file, ctx) {
    let img = new Image();
    img.onload = function () {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.drawImage(img, 0, 0);
    }
    img.src = file;
}