import {google} from 'googleapis'
import ArrFiller from '~~/utils/arrFiller'

export default defineEventHandler(async (event) => {
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.DB_KEY),
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  })
  const { max } = getQuery(event)
  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });
  const range = process.env.DB_RANGE
  const data:Character[] = []
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.DB_ID,
    range,
  }).then(res => res.data.values)
  response?.map((element) => (
    data.push({name: element[0], preview: element[1], difficulty: JSON.parse(element[2]), description: element[3], image: element[4], talents: JSON.parse(element[5]), abilities: JSON.parse(element[6])})
  ))
  if(!max || Array.isArray(max) || !Number.isInteger(parseFloat(max))) return data
  return ArrFiller<Character>(data, parseFloat(max))
})
