const express = require('express');
const { google } = require('googleapis');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Change CLIENT_ID, CLIENT_SECRET and REDIRECT_URI
const CLIENT_ID = 'YOUR_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET';
const REDIRECT_URI = 'YOUR_REDIRECT_URI';
const SPREADSHEET_ID = '1QmunGnQZ-z_gITz8K4YAVWTiJQjvAnCd1PP3_WUCEVg'; // ID

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

// 
oauth2Client.setCredentials({
    refresh_token: 'YOUR_REFRESH_TOKEN'
});

const sheets = google.sheets({ version: 'v4', auth: oauth2Client });

app.use(bodyParser.json());

app.post('/submit-email', async (req, res) => {
    const email = req.body.email;
    try {
        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: 'Sheet1!A:A', // 
            valueInputOption: 'RAW',
            resource: {
                values: [[email]], // 
            },
        });
        res.status(200).send('Email добавлен в таблицу!');
    } catch (error) {
        console.error('Ошибка при добавлении email:', error);
        res.status(500).send('Ошибка при добавлении email.');
    }
});

// 
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
