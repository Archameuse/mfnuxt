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
    if(!body.id) return 'ID Персонажа не был указан'
    const id = Number.parseInt(body.id)

    const res = await sheets.spreadsheets.batchUpdate({
        auth: auth,
        spreadsheetId: process.env.DB_ID,
        requestBody: {
          "requests": [{
            "deleteDimension": {
              "range": {
                "sheetId": 0,
                "dimension": "ROWS",
                "startIndex": body.id,
                "endIndex": body.id + 1
              }
            }
          }]
        }
      })
    return res.status
})
