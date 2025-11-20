import dbConnect from '../../lib/mongodb';
import User from '../../models/User';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();

    const {
      // DATI ANAGRAFICI ESISTENTI
      nome, cognome, luogoNascita, dataNascita, provinciaNascita,
      codiceFiscale, residenza, provinciaResidenza, indirizzo, cap,
      telefono, cellulare, email, documentoIdentita, numeroDocumento,
      
      // NUOVI CAMPI PER CONSENSI
      sottoscritto,
      autorizzaFoto,
      nonAutorizzaFoto,
      impegnoNoUsoCommerciale,
      accettaSottoposizione,
      accettaDirittiDoveri,
      consensoTrattamentoDati
    } = req.body;

    // Verifica campi obbligatori
    if (!consensoTrattamentoDati) {
      return res.status(400).json({
        success: false,
        message: 'Il consenso al trattamento dati è obbligatorio'
      });
    }

    if (!sottoscritto) {
      return res.status(400).json({
        success: false,
        message: 'Il campo "sottoscritto" è obbligatorio'
      });
    }

    // Verifica se email già registrata
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email già registrata'
      });
    }

    // Verifica se codice fiscale già registrato
    const existingCF = await User.findOne({ codiceFiscale });
    if (existingCF) {
      return res.status(400).json({
        success: false,
        message: 'Codice Fiscale già registrato'
      });
    }

    // Crea nuovo socio
    const newUser = new User({
      // DATI ANAGRAFICI
      nome,
      cognome,
      luogoNascita,
      dataNascita: new Date(dataNascita),
      provinciaNascita,
      codiceFiscale,
      residenza,
      provinciaResidenza,
      indirizzo,
      cap,
      telefono,
      cellulare,
      email,
      documentoIdentita,
      numeroDocumento,
      
      // NUOVI CAMPI CONSENSI
      sottoscritto,
      autorizzaFoto: autorizzaFoto || false,
      nonAutorizzaFoto: nonAutorizzaFoto || false,
      impegnoNoUsoCommerciale: impegnoNoUsoCommerciale || false,
      accettaSottoposizione: accettaSottoposizione || false,
      accettaDirittiDoveri: accettaDirittiDoveri || false,
      consensoTrattamentoDati,

      // META-DATI
      dataRichiesta: new Date(),
      stato: 'in_attesa',
      tipoSocio: 'ordinario'
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: 'Richiesta di adesione inviata con successo!',
      userId: newUser._id
    });

  } catch (error) {
    console.error('Errore registrazione:', error);
    res.status(500).json({
      success: false,
      message: 'Errore durante la registrazione'
    });
  }
}