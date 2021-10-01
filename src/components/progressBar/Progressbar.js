import React, { useState, useEffect } from "react";

import "./style.css";

export default function ProgressBar({ width, percent }) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        setValue(percent * width);
    }, [value, setValue, width, percent]);

    return (
        <div>
            <div className="progress-div" style={{ width: width }}>
                <div style={{ width: `${value}px` }} className="progress" />
            </div>
        </div>
    );
}
