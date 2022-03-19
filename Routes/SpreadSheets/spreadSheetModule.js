import { google } from "googleapis";

export class SpreadSheets {
  constructor(token, scopes, spreadsheetId, range) {
    this.token = token;
    this.scopes = scopes;
    this.spreadsheetId = spreadsheetId;
    this.range = range;
  }

  async #getSpreadsheetObject() {
    const auth = new google.auth.GoogleAuth({
      keyFile: this.token,
      scopes: this.scopes,
    });

    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });
    return [auth, googleSheets];
  }

  async getMetaData() {
    const [auth, googleSheets] = await this.#getSpreadsheetObject();
    const metaData = await googleSheets.spreadsheets.get({
      auth,
      spreadsheetId: this.spreadsheetId,
    });

    return metaData;
  }

  async getTitlesSheets() {
    const [auth, googleSheets] = await this.#getSpreadsheetObject();
    const metaData = await googleSheets.spreadsheets.get({
      auth,
      spreadsheetId: this.spreadsheetId,
    });
    const titles = metaData.data.sheets.map((item) => item.properties.title);

    return titles;
  }

  async getDataByTitle(title, dimension = "COLUMNS") {
    const [auth, googleSheets] = await this.#getSpreadsheetObject();
    const values = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId: this.spreadsheetId,
      majorDimension: dimension,
      range: `${title}!${this.range}`,
    });

    return values.data;
  }
}
