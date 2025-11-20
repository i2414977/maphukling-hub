import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  // DATI ANAGRAFICI
  nome: { type: String, required: true },
  cognome: { type: String, required: true },
  luogoNascita: { type: String, required: true },
  dataNascita: { type: Date, required: true },
  provinciaNascita: { type: String, required: true },
  codiceFiscale: { type: String, required: true },
  residenza: { type: String, required: true },
  provinciaResidenza: { type: String, required: true },
  indirizzo: { type: String, required: true },
  cap: { type: String, required: true },
  telefono: String,
  cellulare: String,
  email: { type: String, required: true, unique: true },
  documentoIdentita: { type: String, required: true },
  numeroDocumento: { type: String, required: true },
    // NUOVI CAMPI PER CONSENSI
  sottoscritto: { type: String, required: true }, // "Il/La sottoscritto/a"
  autorizzaFoto: { type: Boolean, default: false },
  nonAutorizzaFoto: { type: Boolean, default: false },
  impegnoNoUsoCommerciale: { type: Boolean, default: false },
  accettaSottoposizione: { type: Boolean, default: false },
  accettaDirittiDoveri: { type: Boolean, default: false },
  consensoTrattamentoDati: { type: Boolean, required: true },
  
  // CONSENSI
  consensoFoto: { type: Boolean, default: false },
  consensoTrattamentoDati: { type: Boolean, required: true },
  
  // DATI ASSOCIATIVI
  dataRichiesta: { type: Date, default: Date.now },
  stato: { type: String, default: 'in_attesa' }
}, {
  timestamps: true
});

export default mongoose.models.User || mongoose.model('User', userSchema);