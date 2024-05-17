import BoxComponent from "@/components/BoxComponent";
export default function Home() {
  return (
    <div className="flex gap-20 flex-col justify-center font-bold items-center w-screen h-screen">
      <h1 className="text-4xl">Simulador de Pendulo</h1>
        <BoxComponent/>      
    </div>
  );
}
