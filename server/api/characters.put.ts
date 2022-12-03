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
    const res = await sheets.spreadsheets.batchUpdate({
        auth: auth,
        spreadsheetId: process.env.DB_ID,
        requestBody: {
          "requests": [{
            "updateCells": {
              "rows": [{"values": [
                {"userEnteredValue": {"stringValue": name}},
                {"userEnteredValue": {"stringValue": preview}},
                {"userEnteredValue": {"numberValue": difficulty}},
                {"userEnteredValue": {"stringValue": description}},
                {"userEnteredValue": {"stringValue": image}},
                {"userEnteredValue": {"stringValue": JSON.stringify(talents)}},
                {"userEnteredValue": {"stringValue": JSON.stringify(abilities)}},
              ]}],
              "start": {
                "sheetId": 0,
                "rowIndex": id,
                "columnIndex": 0,
              },
              fields: '*'
            }
          }]
        }
      })
    return res.status
})
