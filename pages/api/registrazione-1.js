import dbConnect from '../../lib/mongodb';
import User from '../../models/User';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();

    const {
      nome, cognome, luogoNascita, dataNascita, provinciaNascita,
      codiceFiscale, residenza, provinciaResidenza, indirizzo, cap,
      telefono, cellulare, email, documentoIdentita, numeroDocumento,
      consensoFoto, consensoTrattamentoDati
    } = req.body;

    // Verifica email esistente
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email già registrata'
      });
    }

    // Crea nuovo socio
    const newUser = new User({
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
      consensoFoto,
      consensoTrattamentoDati
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: 'Richiesta di adesione inviata con successo!'
    });

  } catch (error) {
    console.error('Errore registrazione:', error);
    res.status(500).json({
      success: false,
      message: 'Errore durante la registrazione'
    });
  }
}