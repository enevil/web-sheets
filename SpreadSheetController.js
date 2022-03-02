import { Association, Datetime, Person } from "./schemes.js";
import { SpreadSheets } from "./spreadSheetModule.js";

const SERVICE_ACCOUNT_FILE = "token.json";
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
// const SPREADSHEET_ID = "1rifenl8dOo5QkMzT0qKmRH2N0zLARlPxLaqm95q3Nd8";
const SPREADSHEET_ID = "1UT5OQ0f34UNJjBEAQl-_L0DG7yBdpkrEEK9gFeTRmEc";
const RANGE = "B2:I250";

const spreadSheets = new SpreadSheets(
  SERVICE_ACCOUNT_FILE,
  SCOPES,
  SPREADSHEET_ID,
  RANGE
);

class SpreadSheetController {
  async livesearch(req, res) {
    try {
      const search = req.query.search || "";
      const similarNames = await Person.find({
        name: { $regex: search, $options: "i" },
      }).limit(10);
      res.send({ persons: similarNames });
    } catch (e) {
      res.status(400).json({ message: "livesearch error", e });
    }
  }

  async getPerson(req, res) {
    try {
      const personId = req.query.personId;
      const person_data = { name: "", workShifts: [] };
      if (personId) {
        const person = await Person.findById(personId);
        for (let associationId of person.dates) {
          const association = await Association.findById(associationId);
          const date = await Datetime.findById(association.date);
          const item = {
            shiftTime: association.shiftTime,
            shiftProp: association.shiftProp,
            date: date.date,
          };
          person_data.name = person.name;
          person_data.workShifts.push(item);
        }
      }

      res.send(person_data);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "getPerson error", e });
    }
  }

  async getSidePersons(req, res) {
    try {
      const currentDate = req.query.date;
      const findDate = await Datetime.findOne({ date: currentDate });
      const persons = { persons: [] };
      if (findDate) {
        for (let associationId of findDate.persons) {
          const association = await Association.findById(associationId);
          const person = await Person.findById(association.person);

          persons.persons.push({
            _id: person.id,
            name: person.name,
            workShift: association.shiftTime + " " + association.shiftProp,
          });
        }
      }

      res.send(persons);
    } catch (e) {
      res.status(400).json({ message: "getSidePersons error", e });
    }
  }

  async updateOnePage(req, res) {
    try {
      const timer = Date.now();
      const titles = await getValidTitles();
      for (let title of titles) {
        console.log("Начал обработку - ", title);
        const dataPage = await structureDataByTitle(title);
        deleteCurrentAssociatons(dataPage);
        for (let dataCell of dataPage) {
          await insertDataCell(dataCell);
        }
        console.log("Отработал страницу - ", title);
        break; // ONLY ONE PAGEd
      }
      console.log(Date.now() - timer);
      res.status(200).json({ message: "Успешно обновил одну страницу" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "updateOnePage error", e });
    }
  }

  async loadAllData(req, res) {
    try {
      const titles = await getValidTitles();
      for (let title of titles.slice(0, 5)) {
        console.log("Начал обработку - ", title);
        const dataPage = await structureDataByTitle(title);

        for (let dataCell of dataPage) {
          await insertDataCell(dataCell);
        }
        console.log("Отработал страницу - ", title);
      }
      res
        .status(200)
        .json({ message: "Успешно обновил все валидные страницы" });
    } catch (e) {
      res.status(400).json({ message: "loadAllData error", e });
    }
  }
}

async function deleteCurrentAssociatons(page) {
  const sortedPage = page.sort((a, b) => a.date - b.date);
  const datesToDelete = await Datetime.find({
    date: {
      $gte: new Date(sortedPage[0].date),
      $lt: new Date(+sortedPage[sortedPage.length - 1].date + 86400000),
    },
  });
  const indexesDates = datesToDelete.map((i) => i.id);
  const associationsToDelete = await Association.find({
    date: { $in: indexesDates },
  });
  associationsToDelete.forEach((i) => deleteOneAssociaton(i.id));
}

async function deleteOneAssociaton(id) {
  const association = await Association.findById(id);
  await Datetime.findByIdAndUpdate(association.date, {
    $pull: { persons: association.id },
  });
  await Person.findByIdAndUpdate(association.person, {
    $pull: { dates: association.id },
  });
  await Association.findByIdAndRemove(association.id);
}

async function insertDataCell(dataCell) {
  const date =
    (await Datetime.findOne({ date: dataCell.date })) ||
    new Datetime({ date: dataCell.date });
  const person =
    (await Person.findOne({ name: dataCell.person })) ||
    new Person({ name: dataCell.person });
  const association =
    (await Association.findOne({ person: person, date: date })) ||
    new Association({
      person: person,
      date: date,
      shiftTime: dataCell.shiftTime,
      shiftProp: dataCell.shiftProp,
    });
  association.shiftTime = dataCell.shiftTime;
  association.shiftProp = dataCell.shiftProp;
  if (!date.persons.includes(association.id)) date.persons.push(association);
  if (!person.dates.includes(association.id)) person.dates.push(association);

  await date.save();
  await person.save();
  await association.save();
}

// MIDDLEWARE

async function getValidTitles() {
  const titles = await spreadSheets.getTitlesSheets();
  const ruMonthes = [
    "январь",
    "февраль",
    "март",
    "апрель",
    "май",
    "июнь",
    "июль",
    "август",
    "сентябрь",
    "октябрь",
    "ноябрь",
    "декабрь",
  ];
  const validTitles = titles.filter((item) => {
    return ruMonthes.includes(item.split(" ")[0].toLowerCase());
  });
  return validTitles;
}

async function structureDataByTitle(title) {
  const dateExp = new RegExp("^[0-3][0-9]\\.[0-1][0-9]$");
  const timeExp = new RegExp("(([\\d]\\d)|\\d)-((\\d\\d)|\\d)");
  const structureData = [];

  await spreadSheets.getDataByTitle(title).then((data) => {
    const persons = data.values[0];
    const workShift = data.values.slice(1);
    let currentDate = null;

    workShift.forEach((column) => {
      column.forEach((cell, index) => {
        if (currentDate && cell.trim())
          if (persons[index].trim()) {
            structureData.push({
              date: new Date(
                +`20${title.trim().split(" ")[1]}`,
                +currentDate.trim().split(".")[1] - 1,
                +currentDate.trim().split(".")[0]
              ),
              person: persons[index].trim().toLowerCase(),
              shiftTime: cell.trim().match(timeExp)
                ? cell.trim().match(timeExp)[0]
                : "",
              shiftProp: cell.trim().match(timeExp)
                ? cell.trim().replace(cell.trim().match(timeExp)[0], "")
                : cell.trim(),
            });
          }
        if (dateExp.test(cell)) currentDate = cell;
      });
    });
  });
  return structureData;
}

export default new SpreadSheetController();
