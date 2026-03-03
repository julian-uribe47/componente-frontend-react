import { useMemo, useState } from "react";
import "./App.css";

export default function App() {
  const [origen, setOrigen] = useState("Pereira");
  const [destino, setDestino] = useState("Bogotá");
  const [tipoServicio, setTipoServicio] = useState("Compartida");

  const [largo, setLargo] = useState(100); // cm
  const [ancho, setAncho] = useState(60);  // cm
  const [alto, setAlto] = useState(80);    // cm
  const [peso, setPeso] = useState(45);    // kg
  const [cantidad, setCantidad] = useState(1);

  // Cálculo: volumen m³ = (cm³)/1.000.000
  const resultado = useMemo(() => {
    const l = Number(largo) || 0;
    const a = Number(ancho) || 0;
    const h = Number(alto) || 0;
    const c = Number(cantidad) || 0;
    const p = Number(peso) || 0;

    const volumenUnitarioM3 = (l * a * h) / 1_000_000;
    const volumenTotalM3 = volumenUnitarioM3 * c;

    // Un ejemplo simple de “estimado” solo para la evidencia
    // (No es tarifa real)
    const base = tipoServicio === "Directa" ? 180000 : 90000;
    const variableVol = Math.round(volumenTotalM3 * 55000);
    const variablePeso = Math.round(p * 800);
    const estimado = base + variableVol + variablePeso;

    return {
      volumenUnitarioM3,
      volumenTotalM3,
      estimado,
    };
  }, [largo, ancho, alto, cantidad, peso, tipoServicio]);

  const onSubmit = (e) => {
    e.preventDefault();
    alert("✅ Cálculo realizado. (Demo para evidencia AA4 EV03)");
  };

  return (
    <div className="page">
      <header className="topbar">
        <div className="brand">
          {/* Logo */}
          <img className="brandLogo" src="/logo.png" alt="Logo" />
          <div className="brandText">
            <h1> Componente frontend del proyecto formativo y 
proyectos de clase</h1>
            <p>Módulo Frontend (React + Vite) • Evidencia AA4 EV03</p>
          </div>
        </div>

        <div className="badge">
          <span className="dot" />
          <span>Demo</span>
        </div>
      </header>

      <main className="grid">
        {/* Panel izquierdo: datos generales */}
        <section className="card">
          <div className="cardHeader">
            <h2>Datos del servicio</h2>
            <p>Completa lo básico para simular una cotización.</p>
          </div>

          <div className="formGrid">
            <label className="field">
              <span>Ciudad origen</span>
              <input value={origen} onChange={(e) => setOrigen(e.target.value)} placeholder="Ej: Pereira" />
            </label>

            <label className="field">
              <span>Ciudad destino</span>
              <input value={destino} onChange={(e) => setDestino(e.target.value)} placeholder="Ej: Bogotá" />
            </label>

            <label className="field">
              <span>Tipo de servicio</span>
              <select value={tipoServicio} onChange={(e) => setTipoServicio(e.target.value)}>
                <option>Compartida</option>
                <option>Directa</option>
              </select>
            </label>

            <div className="infoBox">
              <h3>Resumen</h3>
              <ul>
                <li><b>Origen:</b> {origen}</li>
                <li><b>Destino:</b> {destino}</li>
                <li><b>Servicio:</b> {tipoServicio}</li>
              </ul>
              <small>
                * Pantalla de prueba: estructura, componentes, estados, eventos, estilos y responsive.
              </small>
            </div>
          </div>
        </section>

        {/* Panel derecho: formulario cálculo */}
        <section className="card">
          <div className="cardHeader">
            <h2>Cálculo rápido (cubicaje)</h2>
            <p>Ejemplo de formulario con estado, validación simple y resultado.</p>
          </div>

          <form onSubmit={onSubmit} className="calcForm">
            <div className="row3">
              <label className="field">
                <span>Largo (cm)</span>
                <input type="number" min="0" value={largo} onChange={(e) => setLargo(e.target.value)} />
              </label>
              <label className="field">
                <span>Ancho (cm)</span>
                <input type="number" min="0" value={ancho} onChange={(e) => setAncho(e.target.value)} />
              </label>
              <label className="field">
                <span>Alto (cm)</span>
                <input type="number" min="0" value={alto} onChange={(e) => setAlto(e.target.value)} />
              </label>
            </div>

            <div className="row3">
              <label className="field">
                <span>Peso (kg)</span>
                <input type="number" min="0" value={peso} onChange={(e) => setPeso(e.target.value)} />
              </label>
              <label className="field">
                <span>Cantidad</span>
                <input type="number" min="1" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
              </label>

              <div className="field">
                <span>Resultado</span>
                <div className="resultBox">
                  <div className="resultLine">
                    <span>Volumen unitario:</span>
                    <b>{resultado.volumenUnitarioM3.toFixed(3)} m³</b>
                  </div>
                  <div className="resultLine">
                    <span>Volumen total:</span>
                    <b>{resultado.volumenTotalM3.toFixed(3)} m³</b>
                  </div>
                  <div className="resultLine total">
                    <span>Estimado:</span>
                    <b>${resultado.estimado.toLocaleString("es-CO")} COP</b>
                  </div>
                </div>
              </div>
            </div>

            <div className="actions">
              <button className="btnPrimary" type="submit">
                Calcular / Guardar
              </button>
              <button
                className="btnGhost"
                type="button"
                onClick={() => {
                  setOrigen("Pereira");
                  setDestino("Bogotá");
                  setTipoServicio("Compartida");
                  setLargo(100);
                  setAncho(60);
                  setAlto(80);
                  setPeso(45);
                  setCantidad(1);
                }}
              >
                Limpiar
              </button>
            </div>

          </form>
        </section>
      </main>

      <footer className="footer">
        <span>© 2026 • SENA</span>
        <span className="pill">React</span>
      </footer>
    </div>
  );
}