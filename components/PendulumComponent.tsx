import React, { useState, useEffect, useRef } from 'react';

interface PendulumProps {
  amplitudeDegrees: number;
  periodSeconds: number;
  time: number; // Tiempo opcional en segundos
}

function Pendulum({ amplitudeDegrees, periodSeconds, time }: PendulumProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
    const verticalAngleShow = ((amplitudeDegrees * Math.PI) / 180)*Math.sin((2*Math.PI)* (1 / (periodSeconds)*time))
    const horizontalAngleShow = ((amplitudeDegrees * Math.PI) / 180)*Math.cos((2*Math.PI)* (1 / (periodSeconds)*time))
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const originX = width / 2;
    const originY = 50;

    // Convertir grados a radianes
    const amplitude = (amplitudeDegrees * Math.PI) / 180;

    // Calcular la frecuencia a partir del período (en milisegundos)
    const frequency = 1 / (periodSeconds * 1000);

    // Longitud estática del péndulo
    const length = 150;

    function draw(currentTime: number) {
      // Limpiar el lienzo
      if (ctx) {
        ctx.clearRect(0, 0, width, height);
      }

      // Calcular el ángulo usando la función sinusoidal o el tiempo proporcionado
      const angle = time !== undefined
        ? amplitude * Math.sin(time * 1000 * frequency) // Usar tiempo proporcionado
        : amplitude * Math.sin(currentTime * frequency); // Usar tiempo actual

      // Dibujar la línea del péndulo
      const bobX = originX + length * Math.sin(angle);
      const bobY = originY + length * Math.cos(angle);
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(originX, originY);
        ctx.lineTo(bobX, bobY);
        ctx.stroke();
      }

      // Dibujar la bola
      if (ctx) {
        ctx.beginPath();
        ctx.arc(bobX, bobY, 20, 0, 2 * Math.PI);
        ctx.fill();
      }

      // Solicitar el próximo frame si no se proporcionó tiempo
      if (time === undefined) {
        requestAnimationFrame(draw);
      }
    }

    requestAnimationFrame(draw);
  }, [amplitudeDegrees, periodSeconds, time]);

  return (
    <section className='flex items-center gap-3 flex-col'>
        <h2 className='text-lg'>Pendulo</h2>
        <canvas ref={canvasRef} width={300} height={300} />
        <p><b>Angulo Vertical: </b>{verticalAngleShow.toFixed(2)} Rad. <br />
        <b>Angulo Horizontal:</b> {horizontalAngleShow.toFixed(2)} Rad.</p>
    </section>
    )
}

export default Pendulum;