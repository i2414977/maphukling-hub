import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    nome: '', cognome: '', luogoNascita: '', dataNascita: '', provinciaNascita: '',
    codiceFiscale: '', residenza: '', provinciaResidenza: '', indirizzo: '', cap: '',
    telefono: '', cellulare: '', email: '', documentoIdentita: '', numeroDocumento: '',
    consensoFoto: false, consensoTrattamentoDati: false
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/registrazione', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (data.success) {
        setMessage('✅ Richiesta inviata con successo!');
        setFormData({
          nome: '', cognome: '', luogoNascita: '', dataNascita: '', provinciaNascita: '',
          codiceFiscale: '', residenza: '', provinciaResidenza: '', indirizzo: '', cap: '',
          telefono: '', cellulare: '', email: '', documentoIdentita: '', numeroDocumento: '',
          consensoFoto: false, consensoTrattamentoDati: false
        });
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (error) {
      setMessage('❌ Errore di connessione');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>MODULO DI RICHIESTA ADESIONE</h1>
      <h2 style={{ textAlign: 'center', color: '#666', fontSize: '1.2em' }}>ASSOCIAZIONE "MACHIG PHUKPA CHOKHOR LING"</h2>
      
      {message && <div style={{ 
        padding: 10, 
        margin: '10px 0', 
        background: message.includes('✅') ? '#d4edda' : '#f8d7da',
        border: `1px solid ${message.includes('✅') ? '#c3e6cb' : '#f5c6cb'}`,
        borderRadius: 5,
        color: message.includes('✅') ? '#155724' : '#721c24', // AGGIUNGI QUESTA RIGA
        fontWeight: 'bold', // AGGIUNGI QUESTA RIGA
        textAlign: 'center' // AGGIUNGI QUESTA RIGA
      }}>{message}</div>}

      <form onSubmit={handleSubmit} style={{ backgroundColor: '#f9f9f9', padding: 20, borderRadius: 8 }}>
        {/* DATI ANAGRAFICI */}
        <fieldset style={{ border: '1px solid #ddd', padding: 15, marginBottom: 20 }}>
          <legend style={{ fontWeight: 'bold', color: '#333' }}>Dati Anagrafici</legend>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
            <div>
              <input type="text" name="nome" placeholder="Nome *" value={formData.nome} onChange={handleChange} required 
                style={{ width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4 }} />
            </div>
            <div>
              <input type="text" name="cognome" placeholder="Cognome *" value={formData.cognome} onChange={handleChange} required 
                style={{ width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4 }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 10 }}>
            <div>
              <input type="text" name="luogoNascita" placeholder="Luogo di Nascita *" value={formData.luogoNascita} onChange={handleChange} required 
                style={{ width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4 }} />
            </div>
            <div>
              <input type="date" name="dataNascita" placeholder="Data di Nascita *" value={formData.dataNascita} onChange={handleChange} required 
                style={{ width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4 }} />
            </div>
            <div>
              <input type="text" name="provinciaNascita" placeholder="Provincia *" value={formData.provinciaNascita} onChange={handleChange} required 
                style={{ width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4 }} />
            </div>
          </div>

          <div style={{ marginBottom: 10 }}>
            <input type="text" name="codiceFiscale" placeholder="Codice Fiscale *" value={formData.codiceFiscale} onChange={handleChange} required 
              style={{ width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4 }} />
          </div>
        </fieldset>

        {/* RESIDENZA */}
        <fieldset style={{ border: '1px solid #ddd', padding: 15, marginBottom: 20 }}>
          <legend style={{ fontWeight: 'bold', color: '#333' }}>Residenza</legend>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
            <div>
              <input type="text" name="residenza" placeholder="Comune di Residenza *" value={formData.residenza} onChange={handleChange} required 
                style={{ width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4 }} />
            </div>
            <div>
              <input type="text" name="provinciaResidenza" placeholder="Provincia *" value={formData.provinciaResidenza} onChange={handleChange} required 
                style={{ width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4 }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 10, marginBottom: 10 }}>
            <div>
              <input type="text" name="indirizzo" placeholder="Indirizzo completo *" value={formData.indirizzo} onChange={handleChange} required 
                style={{ width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4 }} />
            </div>
            <div>
              <input type="text" name="cap" placeholder="CAP *" value={formData.cap} onChange={handleChange} required 
                style={{ width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4 }} />
            </div>
          </div>
        </fieldset>

        {/* CONTATTI */}
        <fieldset style={{ border: '1px solid #ddd', padding: 15, marginBottom: 20 }}>
          <legend style={{ fontWeight: 'bold', color: '#333' }}>Contatti</legend>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
            <div>
              <input type="tel" name="telefono" placeholder="Telefono" value={formData.telefono} onChange={handleChange} 
                style={{ width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4 }} />
            </div>
            <div>
              <input type="tel" name="cellulare" placeholder="Cellulare" value={formData.cellulare} onChange={handleChange} 
                style={{ width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4 }} />
            </div>
          </div>

          <div style={{ marginBottom: 10 }}>
            <input type="email" name="email" placeholder="Email *" value={formData.email} onChange={handleChange} required 
              style={{ width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4 }} />
          </div>
        </fieldset>

        {/* DOCUMENTO */}
        <fieldset style={{ border: '1px solid #ddd', padding: 15, marginBottom: 20 }}>
          <legend style={{ fontWeight: 'bold', color: '#333' }}>Documento di Identità</legend>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 10, marginBottom: 10 }}>
            <div>
              <select name="documentoIdentita" value={formData.documentoIdentita} onChange={handleChange} required
                style={{ width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4 }}>
                <option value="">Tipo Documento *</option>
                <option value="carta_identita">Carta d'Identità</option>
                <option value="patente">Patente</option>
                <option value="passaporto">Passaporto</option>
              </select>
            </div>
            <div>
              <input type="text" name="numeroDocumento" placeholder="Numero Documento *" value={formData.numeroDocumento} onChange={handleChange} required 
                style={{ width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4 }} />
            </div>
          </div>
        </fieldset>

        {/* CONSENSI */}
        <fieldset style={{ border: '1px solid #ddd', padding: 15, marginBottom: 20 }}>
          <legend style={{ fontWeight: 'bold', color: '#333' }}>Consensi</legend>
          
          <div style={{ marginBottom: 15 }}>
            <label style={{ display: 'block', marginBottom: 8 }}>
              <input type="checkbox" name="consensoFoto" checked={formData.consensoFoto} onChange={handleChange} 
                style={{ marginRight: 8 }} />
              Autorizzo l'Associazione all'utilizzo di foto scattate e/o riprese video effettuate durante eventi e manifestazioni
            </label>
          </div>

          <div style={{ marginBottom: 10 }}>
            <label style={{ display: 'block', marginBottom: 8 }}>
              <input type="checkbox" name="consensoTrattamentoDati" checked={formData.consensoTrattamentoDati} onChange={handleChange} required 
                style={{ marginRight: 8 }} />
              Consenso al trattamento dei dati personali (obbligatorio) *
            </label>
          </div>
        </fieldset>

        <button type="submit" disabled={loading} 
          style={{ 
            width: '100%', 
            padding: 12, 
            background: loading ? '#ccc' : '#0070f3', 
            color: 'white', 
            border: 'none', 
            borderRadius: 4,
            fontSize: '16px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}>
          {loading ? 'Invio in corso...' : 'INVIA RICHIESTA DI ADESIONE'}
        </button>
      </form>

      <div style={{ marginTop: 20, textAlign: 'center', color: '#666', fontSize: '0.9em' }}>
        <p>I campi contrassegnati con * sono obbligatori</p>
      </div>
    </div>
  );
}