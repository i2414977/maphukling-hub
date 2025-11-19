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
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h1>Richiesta Adesione Associazione</h1>
      
      {message && <div style={{ 
        padding: 10, 
        margin: '10px 0', 
        background: message.includes('✅') ? '#d4edda' : '#f8d7da',
        border: `1px solid ${message.includes('✅') ? '#c3e6cb' : '#f5c6cb'}`
      }}>{message}</div>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <input type="text" name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} required 
            style={{ width: '100%', padding: 8 }} />
        </div>
        
        <div style={{ marginBottom: 10 }}>
          <input type="text" name="cognome" placeholder="Cognome" value={formData.cognome} onChange={handleChange} required 
            style={{ width: '100%', padding: 8 }} />
        </div>

        <div style={{ marginBottom: 10 }}>
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required 
            style={{ width: '100%', padding: 8 }} />
        </div>

        {/* Aggiungi altri campi qui */}

        <div style={{ marginBottom: 10 }}>
          <label>
            <input type="checkbox" name="consensoTrattamentoDati" checked={formData.consensoTrattamentoDati} onChange={handleChange} required />
            Consenso trattamento dati (obbligatorio)
          </label>
        </div>

        <button type="submit" disabled={loading} style={{ width: '100%', padding: 10, background: '#0070f3', color: 'white', border: 'none' }}>
          {loading ? 'Invio in corso...' : 'Invia Richiesta'}
        </button>
      </form>
    </div>
  );
}