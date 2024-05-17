import React, { useEffect, useRef, useState } from 'react';

interface PendulumGraphProps {
  amplitudeDegrees: number;
  periodSeconds: number;
  time?: number;
}

function PendulumGraph({ amplitudeDegrees, periodSeconds, time }: PendulumGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const originY = height / 2;

    // Limpiar el canvas
    ctx.clearRect(0, 0, width, height);

    // Convertir grados a radianes
    const amplitude = (amplitudeDegrees * Math.PI) / 180;

    // Calcular la frecuencia a partir del período (en milisegundos)
    const frequency = 1 / (periodSeconds * 1000);

    // Longitud estática del péndulo
    const length = 100;

    // Dibujar la gráfica
    ctx.beginPath();
    ctx.moveTo(0, originY);
    for (let x = 0; x <= width; x++) {
      const t = x / width * periodSeconds * 1000;
      const angle = amplitude * Math.sin(t * frequency);
      const y = originY + length * Math.cos(angle);
      ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Calcular y mostrar el desplazamiento si se proporciona tiempo
    if (time !== undefined) {
      const finalAngle = amplitude * Math.sin(time * 1000 * frequency);


      // Dibujar el punto en el tiempo dado
      const x = time / periodSeconds * width;
      const y = originY + length * Math.cos(finalAngle); // Usar finalAngle
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fill();
    } else {

    }
  }, [amplitudeDegrees, periodSeconds, time]);

  return (
    <>
      <canvas ref={canvasRef} width={300} height={300} />
    </>
  );
}

export default PendulumGraph;