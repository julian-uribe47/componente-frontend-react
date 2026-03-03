import { useState } from "react";

/**
 * Módulo sencillo: Cotización rápida
 * Evidencia React básica
 */
function App() {

  // Estado del formulario
  const [form, setForm] = useState({
    origin: "",
    destination: "",
    item: ""
  });

  // Estado de la lista
  const [quotes, setQuotes] = useState([]);

  // Maneja cambios en inputs
  function handleChange(event) {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value
    });
  }

  // Agrega cotización
  function handleSubmit(event) {
    event.preventDefault();

    // Validación básica
    if (!form.origin || !form.destination || !form.item) {
      alert("Todos los campos son obligatorios");
      return;
    }

    const newQuote = {
      id: Date.now(), // clave única
      ...form
    };

    setQuotes([newQuote, ...quotes]);

    // Limpiar formulario
    setForm({
      origin: "",
      destination: "",
      item: ""
    });
  }

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto" }}>
      <h2>Proyecto React - Cotización Rápida</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="origin"
          placeholder="Ciudad origen"
          value={form.origin}
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="destination"
          placeholder="Ciudad destino"
          value={form.destination}
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="item"
          placeholder="Enser principal"
          value={form.item}
          onChange={handleChange}
        />
        <br /><br />

        <button type="submit">Agregar</button>
      </form>

      <hr />

      <h3>Listado de Cotizaciones</h3>

      {quotes.length === 0 ? (
        <p>No hay registros aún.</p>
      ) : (
        <ul>
          {quotes.map((quote) => (
            <li key={quote.id}>
              {quote.origin} → {quote.destination} | {quote.item}
            </li>
          ))}
        </ul>
      )}

    </div>
  );
}

export default App;