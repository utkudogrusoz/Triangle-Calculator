import React, {useState, useEffect, useRef} from 'react';
import './App.css'; // CSS dosyası eklendi

function App() {
    const [height, setHeight] = useState(100);
    const [alpha, setAlpha] = useState(60);
    const [area, setArea] = useState(0);
    const [enableHeight, setEnableHeight] = useState(true);
    const [enableAlpha, setEnableAlpha] = useState(true);
    const canvasRef = useRef(null);

    const calculateArea = () => {
        const beta = 90 - alpha;
        const base = height / Math.tan(beta * (Math.PI / 180));
        const triangleArea = 0.5 * height * base;
        setArea(triangleArea.toFixed(0));
    };

    const drawTriangle = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const beta = 90 - alpha;
        const base = height / Math.tan(beta * (Math.PI / 180));
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(10, canvas.height - 10);
        ctx.lineTo(10 + base, canvas.height - 10);
        ctx.lineTo(10, canvas.height - 10 - height);
        ctx.closePath();
        ctx.stroke();
        ctx.font = '14px Arial';
        ctx.fillText(`Height: ${height} cm`, 20, canvas.height - 30);
        ctx.fillText(`Base: ${base.toFixed(0)} cm`, 20 + base / 2, canvas.height - 10);
        ctx.fillText(`Alpha: ${alpha}°`, 20, canvas.height - 10 - height / 2);
    };

    useEffect(() => {
        calculateArea();
        drawTriangle();
    }, [alpha, height]);

    return (
        <div className="App">
            <h2>Triangle Area Calculator</h2>
            <div>
                <button style={{backgroundColor: enableAlpha && !enableHeight ? "lightblue" : "lightgrey"}}
                        className={`button ${enableAlpha ? 'active' : ''}`} onClick={() => {
                    setEnableAlpha(true);
                    setEnableHeight(false);
                }}>Enable Alpha
                </button>
                <button style={{backgroundColor: !enableAlpha && enableHeight ? "lightblue" : "lightgrey"}}
                        className={`button ${enableHeight ? 'active' : ''}`} onClick={() => {
                    setEnableAlpha(false);
                    setEnableHeight(true);
                }}>Enable Height
                </button>
                <button style={{backgroundColor: enableAlpha && enableHeight ? "lightblue" : "lightgrey"}}
                        className={`button ${enableAlpha && enableHeight ? 'active' : ''}`} onClick={() => {
                    setEnableAlpha(true);
                    setEnableHeight(true);
                }}>Enable Both
                </button>
            </div>
            <label>
                Alpha Angle: {alpha} degrees
                <input
                    type="range"
                    min="0"
                    max="60"
                    step="15"
                    value={alpha}
                    onChange={(e) => setEnableAlpha && setAlpha(Number(e.target.value))}
                    disabled={!enableAlpha}
                />
            </label>
            <br/>
            <label>
                Height: {height} cm
                <input
                    type="range"
                    min="1"
                    max="300"
                    value={height}
                    onChange={(e) => setEnableHeight && setHeight(Number(e.target.value))}
                    disabled={!enableHeight}
                />
            </label>
            <br/>
            <p>Area: {area} cm<sup>2</sup></p>
            <canvas ref={canvasRef} width={400} height={300}></canvas>
        </div>
    );
}

export default App;


/*import React, { useState, useEffect, useRef } from 'react';
import './App.css'; // Yeni CSS dosyasını ekledik

function App() {
    const [height, setHeight] = useState(100);
    const [alpha, setAlpha] = useState(60); // Başlangıçta alfa açısı 60 derece
    const [area, setArea] = useState(0);
    const canvasRef = useRef(null);

    // Alanı hesaplamak için bir yardımcı fonksiyon
    const calculateArea = () => {
        const beta = 90 - alpha; // Beta açısı alfa'nın tamamlayıcısıdır
        const base = height / Math.tan(beta * (Math.PI / 180)); // Taban uzunluğu hesaplanır
        const triangleArea = 0.5 * height * base;
        setArea(triangleArea.toFixed(0)); // Alanı virgülden sonra iki basamaklı olarak ayarla


    };

    // Üçgeni ve boyutlarını göstermek için bir yardarm fonksiyon
    const drawTriangle = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const beta = 90 - alpha; // Beta açısı alfa'nın tamamlayıcısıdır
        const base = height / Math.tan(beta * (Math.PI / 180)); // Taban uzunluğu hesaplanır
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(10, canvas.height - 10);
        ctx.lineTo(10 + base, canvas.height - 10);
        ctx.lineTo(10, canvas.height - 10 - height);
        ctx.closePath();
        ctx.stroke();

        // Üçgenin boyutlarını ve açılarını göster
        ctx.font = '14px Arial';
        ctx.fillText(`Height: ${height} cm`, 20, canvas.height - 30);
        ctx.fillText(`Base: ${base.toFixed(0)} cm`, 20 + base / 2, canvas.height - 10);
        ctx.fillText(`Alpha: ${alpha}°`, 20, canvas.height - 10 - height / 2);
    };

    // Alfa açısı veya yükseklik değiştiğinde alanı ve üçgeni yeniden hesapla ve çiz
    useEffect(() => {
        calculateArea();
        drawTriangle();
    }, [alpha, height]);

    return (
        <div className="App">
            <h2>Triangle Area Calculator</h2>
            <label>
                Alpha Angle: {alpha} degrees
                <input
                    type="range"
                    min="1"
                    max="89"
                    value={alpha}
                    onChange={(e) => setAlpha(Number(e.target.value))}
                />
            </label>
            <br />
            <label>
                Height: {height} cm
                <input
                    type="range"
                    min="1"
                    max="300"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                />
            </label>
            <br />
            <p>Area: {area} cm<sup>2</sup></p>
            <canvas ref={canvasRef} width={400} height={300}></canvas>
        </div>
    );
}

export default App;
*/