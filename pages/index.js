import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    // DATI ANAGRAFICI
    nome: '', cognome: '', luogoNascita: '', dataNascita: '', provinciaNascita: '',
    codiceFiscale: '', residenza: '', provinciaResidenza: '', indirizzo: '', cap: '',
    telefono: '', cellulare: '', email: '', documentoIdentita: '', numeroDocumento: '',
    
    // NUOVI CAMPI PER CONSENSI
    sottoscritto: '', // per "Il/La sottoscritto/a"
    autorizzaFoto: false,
    nonAutorizzaFoto: false,
    impegnoNoUsoCommerciale: false,
    accettaSottoposizione: false,
    accettaDirittiDoveri: false,
    consensoTrattamentoDati: false
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
        // Reset form
        setFormData({
          nome: '', cognome: '', luogoNascita: '', dataNascita: '', provinciaNascita: '',
          codiceFiscale: '', residenza: '', provinciaResidenza: '', indirizzo: '', cap: '',
          telefono: '', cellulare: '', email: '', documentoIdentita: '', numeroDocumento: '',
          sottoscritto: '',
          autorizzaFoto: false, nonAutorizzaFoto: false, impegnoNoUsoCommerciale: false,
          accettaSottoposizione: false, accettaDirittiDoveri: false, consensoTrattamentoDati: false
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
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>MODULO DI RICHIESTA ADESIONE</h1>
      <h2 style={{ textAlign: 'center', color: '#666', fontSize: '1.2em' }}>ASSOCIAZIONE "MACHIG PHUKPA CHOKHOR LING"</h2>
      
      {message && <div style={{ 
        padding: 10, 
        margin: '10px 0', 
        background: message.includes('✅') ? '#d4edda' : '#f8d7da',
        border: `1px solid ${message.includes('✅') ? '#c3e6cb' : '#f5c6cb'}`,
        borderRadius: 5,
        color: message.includes('✅') ? '#155724' : '#721c24',
        fontWeight: 'bold',
        textAlign: 'center'
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

        {/* DICHIARAZIONI E CONSENSI */}
        <fieldset style={{ border: '1px solid #ddd', padding: 20, marginBottom: 20 }}>
          <legend style={{ fontWeight: 'bold', color: '#333', fontSize: '16px' }}>Dichiarazioni e Consensi</legend>
          
          <div style={{ marginBottom: 20, lineHeight: '1.6' }}>
            <p>Avendo preso visione dello statuto dell'Associazione</p>
            
            <div style={{ textAlign: 'center', margin: '15px 0' }}>
              <strong>Chiede</strong>
            </div>
            
            <p>di poter aderire all'associazione <strong>"MACHIG PHUKPA CHOKHOR LING"</strong>, in qualità di Socio Ordinario.</p>
            
            <p>A tal fine effettua il versamento della quota associativa annuale pari a <strong>15 euro.</strong></p>
            
            <p>Dichiara di aver letto lo statuto e di attenersi ad eventuali regolamenti dell'Associazione oltre che alle deliberazioni adottate dagli organi sociali.</p>
          </div>

          <div style={{ marginBottom: 20 }}>
            <p><strong>Dichiara altresì:</strong></p>
            
            <p>a) di condividere le finalità dello Statuto e di voler contribuire, secondo le proprie capacità e disponibilità di tempo e mezzi, alla loro realizzazione;</p>
            <p>b) che verserà la quota associativa annuale, secondo le modalità stabilite dal Consiglio Direttivo;</p>
            
            <div style={{ margin: '15px 0' }}>
              <p>c) di 
                <label style={{ display: 'inline-flex', alignItems: 'center', margin: '0 10px', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    name="autorizzaFoto" 
                    checked={formData.autorizzaFoto} 
                    onChange={handleChange} 
                    style={{ marginRight: 5 }} 
                  />
                  autorizzare
                </label>
                o
                <label style={{ display: 'inline-flex', alignItems: 'center', margin: '0 10px', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    name="nonAutorizzaFoto" 
                    checked={formData.nonAutorizzaFoto} 
                    onChange={handleChange} 
                    style={{ marginRight: 5 }} 
                  />
                  non autorizzare
                </label>
                l'Associazione all'utilizzo di foto scattate e/o riprese video effettuate durante eventi e manifestazioni organizzate dall'Associazione stessa, limitatamente a: pubblicazioni sul sito dell'Associazione, stampa materiale pubblicitario a cura dell'Associazione, pubblicazione sulla stampa periodica locale;
              </p>
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <p><strong>inoltre:</strong></p>
            
            <div style={{ marginBottom: 15 }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  name="impegnoNoUsoCommerciale" 
                  checked={formData.impegnoNoUsoCommerciale} 
                  onChange={handleChange} 
                  style={{ marginRight: 10, marginTop: 3 }} 
                />
                <span>a) si impegna a non utilizzare il nome dell'Associazione "MACHIG PHUKPA CHOKHOR LING" e il materiale da essa prodotto ai fini associativi, per attività di carattere commerciale, imprenditoriale o, in ogni caso, aventi scopo di lucro;</span>
              </label>
            </div>

            <div style={{ marginBottom: 15 }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  name="accettaSottoposizione" 
                  checked={formData.accettaSottoposizione} 
                  onChange={handleChange} 
                  style={{ marginRight: 10, marginTop: 3 }} 
                />
                <span>b) prende atto che l'adesione come Socio sostenitore è subordinata all'accettazione, da parte del Consiglio Direttivo, come previsto dall'art. 3 dello Statuto;</span>
              </label>
            </div>

            <div style={{ marginBottom: 15 }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  name="accettaDirittiDoveri" 
                  checked={formData.accettaDirittiDoveri} 
                  onChange={handleChange} 
                  style={{ marginRight: 10, marginTop: 3 }} 
                />
                <span>c) in qualità di Socio, acquisirà i diritti e i doveri previsti dagli art. 4 e 5 dello Statuto.</span>
              </label>
            </div>
          </div>

          <div style={{ marginBottom: 20, padding: 15, backgroundColor: '#f8f9fa', borderRadius: 6 }}>
            <div style={{ marginBottom: 15 }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  name="consensoTrattamentoDati" 
                  checked={formData.consensoTrattamentoDati} 
                  onChange={handleChange} 
                  required 
                  style={{ marginRight: 10, marginTop: 3 }} 
                />
                <span>
                  <strong>Consenso al trattamento dei dati personali</strong> ai sensi dell'art. 23 D.lgs. 196 del 30/6/2003. 
                  I dati forniti, da chi presenta richiesta di adesione, vengono registrati nel libro soci e/o in appositi registri, 
                  predisposti su supporto cartaceo e/o elettronico dall'Associazione "MACHIG PHUKPA CHOKHOR LING", con sede in 
                  Barberino Tavarnelle, che ne è responsabile per il trattamento.
                </span>
              </label>
            </div>

            <div style={{ marginBottom: 15 }}>
              <p style={{ fontSize: '14px', lineHeight: '1.5', margin: '10px 0' }}>
                Per dati si intendono quelli forniti durante la registrazione quale associato e le successive modifiche e/o integrazioni 
                da parte dell'associato stesso. In conformità con l'art. 13 del D.lgs 30 giugno 2003, recante il Codice in materia di 
                protezione dei dati personali, si desidera informare il socio che i dati personali volontariamente forniti per aderire 
                all'Associazione suddetta, saranno trattati, da parte dell'Associazione stessa, adottando tutte le misure idonee a garantire 
                la sicurezza e la riservatezza nel rispetto della normativa sopra richiamata.
              </p>
              
              <p style={{ fontSize: '14px', lineHeight: '1.5', margin: '10px 0' }}>
                Il consenso al trattamento dei dati personali viene fornito con la richiesta di adesione; in assenza del consenso non è 
                possibile aderire all'Associazione, né fruire dei suoi servizi. L'indicazione di nome, data di nascita e recapiti 
                (indirizzo, telefono e mail) è necessaria per la gestione del rapporto associativo e per l'adempimento degli obblighi di legge. 
                Il conferimento degli altri dati è facoltativo. L'interessato può, in qualsiasi momento, decidere quali dati (non obbligatori) 
                lasciare nella disponibilità dell'Associazione e quali informazioni ricevere.
              </p>
              
              <p style={{ fontSize: '14px', lineHeight: '1.5', margin: '10px 0' }}>
                Titolare del trattamento è l'Associazione "MACHIG PHUKPA CHOKHOR LING", con sede a Barberino Tavarnelle. 
                Responsabile del trattamento è il Presidente Palmieri Massimiliano.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span>Il/La sottoscritto/a, ricevuta l'informativa ai sensi dell'art. 13 del D.lgs. 196/2003, dà il consenso al trattamento dei propri dati personali nella misura necessaria al raggiungimento degli scopi statutari e con le modalità indicate nell'informativa medesima.</span></div>
             <div>     
              <input 
                type="text" 
                name="sottoscritto" 
                placeholder="Nome e Cognome *" 
                value={formData.sottoscritto} 
                onChange={handleChange} 
                required 
                style={{ flex: 1, padding: 8, border: '1px solid #ccc', borderRadius: 4 }} 
              />
            </div>
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
