import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cognome: { type: String, required: true },
  luogoNascita: { type: String, required: true },
  dataNascita: { type: Date, required: true },
  provinciaNascita: { type: String, required: true },
  codiceFiscale: { type: String, required: true, unique: true },
  residenza: { type: String, required: true },
  provinciaResidenza: { type: String, required: true },
  indirizzo: { type: String, required: true },
  cap: { type: String, required: true },
  telefono: String,
  cellulare: String,
  email: { type: String, required: true, unique: true },
  documentoIdentita: { type: String, required: true },
  numeroDocumento: { type: String, required: true },
  sottoscritto: { type: String, required: true },
  dataRichiesta: { type: Date, default: Date.now },
  tipoSocio: { type: String, default: 'ordinario' },
  stato: { type: String, default: 'in_attesa' },
  dataApprovazione: Date,
  numeroTessera: { type: Number, unique: true, sparse: true },
  dataEmissioneTessera: Date,
  statoTessera: { type: String, enum: ['da_emettere', 'emessa', 'inviata', 'scaduta'], default: 'da_emettere'},
  autorizzazioneFoto: { type: String, enum: ['autorizza', 'non_autorizza', 'non_specificato'], default: 'non_specificato'},
  impegnoNoUsoCommerciale: { type: Boolean, default: false },
  accettaSottoposizione: { type: Boolean, default: false },
  accettaDirittiDoveri: { type: Boolean, default: false },
  consensoTrattamentoDati: { type: Boolean, required: true },
  }, {
  timestamps: true
});

export default mongoose.models.User || mongoose.model('User', userSchema, 'soci_2026');
