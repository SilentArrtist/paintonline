import { SettingBar, Toolbar, Canvas } from "widgets";
import '../styles/main.scss'
const Main = () => {
    return (
        <>
            <SettingBar />
            <div className="main">
                <Toolbar />
                <Canvas />
            </div>

        </>
    );
};

export { Main };