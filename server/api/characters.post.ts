import {google} from 'googleapis'

export default defineEventHandler(async (event) => {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.DB_KEY),
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    })
    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });
    const range = process.env.DB_RANGE
    const body = await readBody(event)
    let { name, preview, difficulty, description, image, talents, abilities } = body.character as Character
    if(!name || !preview || !difficulty || !description || !image || !talents?.length || !abilities?.length ) return 'Не все поля были заполнены'
    const test = [[
        name,
        preview,
        JSON.stringify(difficulty),
        description,
        image,
        JSON.stringify(talents),
        JSON.stringify(abilities)
    ]]
    const res = await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.DB_ID,
        range: range,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
            "majorDimension": 'ROWS',
            "range": range,
            "values": test
        }
      });
    return res.status
})
