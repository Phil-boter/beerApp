import { useState } from "react";

export default function useColorGenerator() {
    const [color, setColor] = useState();

    function randomBackgroundColor() {
        var x = Math.floor(Math.random() * 256);
        var y = Math.floor(Math.random() * 256);
        var z = Math.floor(Math.random() * 256);
        var bgColor = "rgb(" + x + "," + y + "," + z + ")";
        console.log(bgColor);
        setColor(bgColor);
    }
    return [color, randomBackgroundColor];
}
