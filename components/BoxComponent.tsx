"use client"
import { useState } from "react";
import PendulumComponent from "./PendulumComponent";
import PendulumGraphComponent from "./PendulumGraphComponent";
export default function BoxComponent() {
    const [amplitude, setAmplitude] = useState(30);
    const [period, setPeriod] = useState(1.5);
    const [time, setTime] = useState(0.5);
  return (
    <div className=" flex w-6/12 h-8/12  shadow-2xl rounded-3xl">
        <section className="flex justify-around items-center w-full h-full">
        <section className="flex-col items-center">
            <article>
            <label htmlFor="amplitude"><b>Amplitud (grados): </b></label>
            <input
            type="number"
            className="w-32"
            id="amplitude"
            value={amplitude}
            onChange={(e) => setAmplitude(Math.min(Math.max(parseFloat(e.target.value), 1),))}
            min="1"
            />
            </article>
            <article>
            <label htmlFor="period"><b>Periodo (Segundos):</b> </label>
            <input
            className="w-32"
            type="number"
            id="period"
            value={period}
            onChange={(e) => setPeriod(Math.min(Math.max(parseFloat(e.target.value), 0.1)))}
            min="1"
            step="0.5"
            />
            </article>
            <article>
            <label htmlFor="time"><b>Tiempo (Segundo):</b> </label>
            <input
            type="number"
            className="w-32"
            id="time"
            value={time}
            onChange={(e) => setTime(Math.min(Math.max(parseFloat(e.target.value), 0.1)))}
            min="0"
            step="0.5"
            />
            </article>
      </section>
      <article className="ml-4 flex flex-col items-center">
            <PendulumComponent amplitudeDegrees={amplitude} periodSeconds={period} time={time}/>
            <PendulumGraphComponent amplitudeDegrees={amplitude} periodSeconds={period} time={time}/>
      </article>      
      </section>
    </div>
  );
}