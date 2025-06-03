const vertexShader = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const fragmentShader = `
    uniform float time;
    uniform vec2 resolution;
    uniform vec3 color1;
    uniform vec3 color2;
    varying vec2 vUv;

    void main() {
        vec2 uv = vUv;
        vec2 aspectCorrectedUv = uv;
        float aspectRatio = resolution.x / resolution.y;
        
        if (aspectRatio > 1.0) {
            aspectCorrectedUv.x = uv.x * aspectRatio - (aspectRatio - 1.0) / 2.0;
        } else {
            aspectCorrectedUv.y = uv.y / aspectRatio - (1.0 / aspectRatio - 1.0) / 2.0;
        }

        float waveHeight1 = 0.2 + sin(aspectCorrectedUv.x * 5.0 + time * 0.4) * 0.05;
        float waveHeight2 = 0.3 + sin(aspectCorrectedUv.x * 6.0 + time * 0.5 + 1.0) * 0.06;
        float waveHeight3 = 0.4 + sin(aspectCorrectedUv.x * 7.0 + time * 0.6 + 2.0) * 0.07;
        float waveHeight4 = 0.5 + sin(aspectCorrectedUv.x * 8.0 + time * 0.7 + 3.0) * 0.08;
        float waveHeight5 = 0.6 + sin(aspectCorrectedUv.x * 9.0 + time * 0.8 + 4.0) * 0.09;
        float waveHeight6 = 0.7 + sin(aspectCorrectedUv.x * 10.0 + time * 0.9 + 5.0) * 0.1;

        vec3 finalColor;

        if (aspectCorrectedUv.y < waveHeight1) {
            finalColor = mix(color1 * 0.6, color1 * 0.9, smoothstep(waveHeight1 - 0.05, waveHeight1 + 0.05, aspectCorrectedUv.y));
        } else if (aspectCorrectedUv.y < waveHeight2) {
            finalColor = mix(color1 * 0.8, color1 * 1.1, smoothstep(waveHeight2 - 0.05, waveHeight2 + 0.05, aspectCorrectedUv.y));
        } else if (aspectCorrectedUv.y < waveHeight3) {
            finalColor = mix(color1, color2 * 0.9, smoothstep(waveHeight3 - 0.05, waveHeight3 + 0.05, aspectCorrectedUv.y));
        } else if (aspectCorrectedUv.y < waveHeight4) {
            finalColor = mix(color1 * 1.1, color2 * 0.8, smoothstep(waveHeight4 - 0.05, waveHeight4 + 0.05, aspectCorrectedUv.y));
        } else if (aspectCorrectedUv.y < waveHeight5) {
            finalColor = mix(color2 * 0.9, color2 * 1.1, smoothstep(waveHeight5 - 0.05, waveHeight5 + 0.05, aspectCorrectedUv.y));
        } else if (aspectCorrectedUv.y < waveHeight6) {
            finalColor = mix(color2 * 1.1, color2 * 1.2, smoothstep(waveHeight6 - 0.05, waveHeight6 + 0.05, aspectCorrectedUv.y));
        } else {
            finalColor = color2 * 1.3;
        }

        float noise = fract(sin(dot(uv, vec2(12.9898, 78.233 + time))) * 43758.5453);
        finalColor += noise * 0.01;
        
        gl_FragColor = vec4(finalColor, 1.0);
    }
`; 