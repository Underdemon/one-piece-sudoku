import React, {useEffect, useState} from 'react';
import strawHat from '../assets/straw_hat.svg';

const Background = () => {
    const [svgs, setSVGs] = useState([]);
    const maxVelocity = 0.125;
    const decelerationFactor = 0.995; // deceleration factor closer to 1 for gradual deceleration
    const accelerationDuration = 3000;

    useEffect(() => {
        const svgSize = 50;
        const gap = 100; // increase the gap to reduce the number of SVGs
        const numCols = Math.floor(window.innerWidth / (svgSize + gap));
        const numRows = Math.floor(window.innerHeight / (svgSize + gap));
        const numSVGs = numCols * numRows;

        // Initialize SVGs with fixed positions and reduced velocities
        const initialSVGs = [];
        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numCols; col++) {
                initialSVGs.push({
                    x: col * (svgSize + gap) + gap,
                    y: row * (svgSize + gap) + gap,
                    vx: (Math.random() - 0.5) * 0.25,
                    vy: (Math.random() - 0.5) * 0.25,
                    startTime: Date.now() // Track the start time
                });
            }
        }
        setSVGs(initialSVGs);

        const checkCollision = (svg1, svg2) => {
            const dx = svg1.x - svg2.x;
            const dy = svg1.y - svg2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            return distance < svgSize;
        };

        const applyForce = (x, y) => {
            const forceRadius = 500;
            setSVGs((prevSVGs) => {
                return prevSVGs.map((svg) => {
                    const dx = svg.x - x;
                    const dy = svg.y - y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < forceRadius) {
                        const force = (forceRadius - distance) / forceRadius;
                        const angle = Math.atan2(dy, dx);
                        svg.vx += Math.cos(angle) * force;
                        svg.vy += Math.sin(angle) * force;
                        svg.startTime = Date.now(); // reset the start time on collision
                    }

                    return svg;
                });
            });
        };

        const updatePositions = () => {
            setSVGs((prevSVGs) => {
                const newSVGs = prevSVGs.map((svg) => {
                    let {x, y, vx, vy, startTime} = svg;

                    x += vx;
                    y += vy;

                    // handle wall collisions
                    if (x <= 0 || x >= window.innerWidth - svgSize) vx = -vx;
                    if (y <= 0 || y >= window.innerHeight - svgSize) vy = -vy;

                    // gradually deceleration if velocity exceeds max & 3 seconds passed
                    const speed = Math.sqrt(vx * vx + vy * vy);
                    const elapsedTime = Date.now() - startTime;
                    if (speed > maxVelocity && elapsedTime > accelerationDuration) {
                        vx *= decelerationFactor;
                        vy *= decelerationFactor;
                    }

                    return {x, y, vx, vy, startTime};
                });

                // handle SVG collisions
                for (let i = 0; i < newSVGs.length; i++) {
                    for (let j = i + 1; j < newSVGs.length; j++) {
                        if (checkCollision(newSVGs[i], newSVGs[j])) {
                            [newSVGs[i].vx, newSVGs[j].vx] = [newSVGs[j].vx, newSVGs[i].vx];
                            [newSVGs[i].vy, newSVGs[j].vy] = [newSVGs[j].vy, newSVGs[i].vy];
                        }
                    }
                }

                return newSVGs;
            });

            // requestAnimationFrame(updatePositions);
        };

        // requestAnimationFrame(updatePositions);

        const handleClick = (event) => {
            const x = event.clientX;
            const y = event.clientY;
            applyForce(x, y);
        };

        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('click', handleClick);
            cancelAnimationFrame(updatePositions);
        };
    }, []);

    return (
        <div className="background">
            {svgs.map((svg, index) => (
                <img
                    key={index}
                    src={strawHat}
                    alt="Straw Hat"
                    className="straw-hat"
                    style={{position: 'absolute', left: svg.x, top: svg.y, filter: 'invert(1)'}}
                />
            ))}
        </div>
    );
};

export default Background;