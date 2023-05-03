import Tool from "./Tool";

class Line extends Tool {
    constructor(canvas, socket, id) {
        super(canvas, socket, id);
        this.listen()
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    }

    mouseUpHandler(e) {
        this.mouseDown = false
        this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.id,
            figure: {
                type: 'line',
                currentX: this.currentX,
                currentY: this.currentY,
                x: e.pageX - e.target.offsetLeft,
                y: e.pageY - e.target.offsetTop,
                strokeColor: this.ctx.strokeStyle
            }
        }))
    }

    mouseDownHandler(e) {
        this.mouseDown = true
        this.ctx.beginPath()
        this.currentX = e.pageX - e.target.offsetLeft
        this.currentY = e.pageY - e.target.offsetTop
        this.ctx.moveTo(this.currentX, this.currentY)
        this.saved = this.canvas.toDataURL()
    }

    mouseMoveHandler(e) {
        if (e.offsetX <= 1 || e.offsetX >= 899) { this.mouseDown = false; return; }
        if (e.offsetY <= 1 || e.offsetY >= 699) { this.mouseDown = false; return; }
        if (this.mouseDown) {
            this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
        }
    }

    draw(x, y) {
        const img = new Image()
        img.src = this.saved
        img.onload = async function () {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            this.ctx.moveTo(this.currentX, this.currentY)
            this.ctx.lineTo(x, y)
            this.ctx.stroke()
        }.bind(this)
    }

    static staticDraw(ctx, currentX, currentY, x, y, strokeColor) {
        ctx.strokeStyle = strokeColor;
        ctx.beginPath()
        ctx.moveTo(currentX, currentY)
        ctx.lineTo(x, y)
        ctx.stroke()
        ctx.beginPath()
    }
}

export { Line }