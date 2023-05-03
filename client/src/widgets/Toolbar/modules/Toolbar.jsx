import React from 'react';
import toolState from "store/toolState";
import { Brush, Rect, Line, Circle, Eraser } from "shared/tools";
import canvasState from "store/canvasState";

import BrushIcon from 'shared/assets/svg/Brush.jsx'
import CircleIcon from 'shared/assets/svg/Circle.jsx'
import EraserIcon from 'shared/assets/svg/Eraser.jsx'
import LineIcon from 'shared/assets/svg/Line.jsx'
import TrashIcon from 'shared/assets/svg/Trash.jsx'
import RectIcon from 'shared/assets/svg/Rect.jsx'
import UndoIcon from 'shared/assets/svg/Undo.jsx'
import RedoIcon from 'shared/assets/svg/Redo.jsx'
import UploadIcon from 'shared/assets/svg/Upload.jsx'
import SaveIcon from 'shared/assets/svg/Save.jsx'
import '../styles/toolbar.scss'

const Toolbar = () => {

    const changeColor = e => {
        toolState.setStrokeColor(e.target.value)
        toolState.setFillColor(e.target.value)
    }

    const download = () => {
        const dataUrl = canvasState.canvas.toDataURL()
        const a = document.createElement('a')
        a.href = dataUrl
        a.download = canvasState.sessionid + ".jpg"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }

    const upload = (element) => {

        const file = element.target.files[0];

        const fileExt = file.name.split('.').pop();
        const arr = ['jpg', 'jpeg', 'png'];
        if (!arr.includes(fileExt)) {
            alert(`Extension ${fileExt} not supported!`)
            return;
        }
        let url = URL.createObjectURL(file);
        canvasState.socket.send(JSON.stringify({
            method: 'draw',
            id: canvasState.sessionid,
            figure: {
                type: 'upload',
                file: url
            }
        }))
    }

    const clean = () => {

        canvasState.socket.send(JSON.stringify({
            method: 'draw',
            id: canvasState.sessionid,
            figure: {
                type: 'clear',
            }
        }))
    }



    return (
        <div className="toolbar">
            <div className="toolbar__btn brush" onClick={() => toolState.setTool(new Brush(canvasState.canvas, canvasState.socket, canvasState.sessionid))}>
                <BrushIcon />
            </div>
            <div className="toolbar__btn" onClick={() => toolState.setTool(new Rect(canvasState.canvas, canvasState.socket, canvasState.sessionid))}>
                <RectIcon />
            </div>
            <div className="toolbar__btn" onClick={() => toolState.setTool(new Circle(canvasState.canvas, canvasState.socket, canvasState.sessionid))} >
                <CircleIcon />
            </div>
            <div className="toolbar__btn" onClick={() => toolState.setTool(new Eraser(canvasState.canvas, canvasState.socket, canvasState.sessionid))} >
                <EraserIcon />
            </div>
            <div className="toolbar__btn" onClick={() => toolState.setTool(new Line(canvasState.canvas, canvasState.socket, canvasState.sessionid))} >
                <LineIcon />
            </div>
            <div className="toolbar__btn" onClick={clean} >
                <TrashIcon />
            </div>
            <input onChange={e => changeColor(e)} style={{ marginLeft: 10 }} type="color" />
            <>
                <div className='toolbar__btns undo_redo'>
                    <div className="toolbar__btn" onClick={() => canvasState.undo()} >
                        <UndoIcon />
                    </div>
                    <div className="toolbar__btn" onClick={() => canvasState.redo()} >
                        <RedoIcon />
                    </div>
                </div>

                <div className="toolbar__btn upload">
                    <label className='icon' htmlFor="icon_load">
                        <UploadIcon />
                        <input
                            className="img_load"
                            id='icon_load'
                            type="file"
                            onChange={(e) => upload(e)}
                        />
                    </label>
                </div>
                <div className="toolbar__btn save" onClick={() => download()}>
                    <SaveIcon />
                </div>
            </>
        </div >
    );
};

export { Toolbar };
