import React, { useEffect, useRef, useState } from 'react';
import { observer } from "mobx-react-lite";
import { Modal, Button } from "react-bootstrap";
import { useParams } from "react-router-dom"
import { Brush, Rect, Circle, Eraser, Line } from "shared/tools";
import { clearCanvas } from 'shared/utils/clearCanvas';
import { uploadImage } from 'shared/utils/uploadImg';
import Alert from 'react-bootstrap/Alert';
import canvasState from "store/canvasState";
import toolState from "store/toolState";
import axios from 'axios'
import '../styles/canvas.scss'


const Canvas = observer(() => {
    const canvasRef = useRef()
    const usernameRef = useRef()
    const [modal, setModal] = useState(true)
    const [userConnected, setUserConnected] = useState(false);
    const [userConnectedName, setUserConnectedName] = useState();
    const params = useParams()
    useEffect(() => {
        canvasState.setCanvas(canvasRef.current)
        let ctx = canvasRef.current.getContext('2d')
        axios.get(`http://localhost:${import.meta.env.VITE_APP_PORT}/image?id=${params.id}`)
            .then(response => {
                const img = new Image()
                img.src = response.data
                img.onload = () => {
                    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
                    ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height)
                }
            })
    }, [])

    useEffect(() => {
        if (canvasState.username) {
            const socket = new WebSocket(`ws://localhost:${import.meta.env.VITE_APP_PORT}/`);
            canvasState.setSocket(socket)
            canvasState.setSessionId(params.id)
            toolState.setTool(new Brush(canvasRef.current, socket, params.id))
            socket.onopen = () => {
                socket.send(JSON.stringify({
                    id: params.id,
                    username: canvasState.username,
                    method: "connection"
                }))
            }
            socket.onmessage = (event) => {
                let msg = JSON.parse(event.data)
                switch (msg.method) {
                    case "connection":
                        setUserConnected(true);
                        setUserConnectedName(msg.username);
                        setTimeout(() => {
                            setUserConnected(false);
                        }, 3000);
                        break
                    case "draw":
                        drawHandler(msg)
                        break
                }
            }
        }
    }, [canvasState.username])

    useEffect(() => {
        usernameRef.current.focus();
    }, [])

    const drawHandler = (msg) => {
        const figure = msg.figure
        const ctx = canvasRef.current.getContext('2d')
        switch (figure.type) {
            case "brush":
                Brush.draw(ctx, figure.x, figure.y, figure.color)
                break
            case "rect":
                Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height, figure.color, figure.strokeColor)
                break
            case "circle":
                Circle.staticDraw(ctx, figure.x, figure.y, figure.r, figure.color, figure.strokeColor)
                break
            case "eraser":
                Eraser.draw(ctx, figure.x, figure.y, figure.color)
                break
            case "line":
                Line.staticDraw(ctx, figure.currentX, figure.currentY, figure.x, figure.y, figure.strokeColor)
                break
            case "clear":
                clearCanvas(ctx);
                break
            case "upload":
                uploadImage(figure.file, ctx);
                break
            case "finish":
                ctx.beginPath()
                break
        }
    }


    const mouseDownHandler = () => {
        canvasState.pushToUndo(canvasRef.current.toDataURL())
    }
    const mouseUpHandler = () => {
        axios.post(`http://localhost:${import.meta.env.VITE_APP_PORT}/image?id=${params.id}`, { img: canvasRef.current.toDataURL() })
            .then(response => (response))
    }

    const connectHandler = () => {
        canvasState.setUsername(usernameRef.current.value)
        setModal(false)
    }

    return (
        <div className="canvas">
            <Modal show={modal} onHide={() => { }} centered size='sm'>
                <Modal.Header >
                    <Modal.Title>Введите ваше имя</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input style={{ 'width': 'fit-content' }} type="text" ref={usernameRef} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => connectHandler()}>
                        Войти
                    </Button>
                </Modal.Footer>
            </Modal>
            {
                userConnected &&
                <Alert show={userConnected} style={{ width: "300px", position: 'absolute', left: "50%", transform: "translateX(-50%)", marginTop: "15px" }} variant="success" className='fixed-top'>
                    <Alert.Heading>User {userConnectedName} Connected!</Alert.Heading>
                </Alert>

            }
            <canvas onMouseDown={mouseDownHandler} onMouseUp={mouseUpHandler} ref={canvasRef} width={900} height={700} />
        </div >
    );
});

export { Canvas };
