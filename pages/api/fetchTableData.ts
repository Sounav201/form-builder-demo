import conn from "../../utils/db";

function getQuestions(data) {
  let questions = [];
  data.map((item) => {
    questions.push(item.question);
  });
  return questions;
}

function modelData(data) {
  let responseData = data[0].Response_data;

  let questions = getQuestions(responseData);
  //Extract the Object entries from the data
  // let entries = Object.entries(responseData);
  //console.log('Entries : ', entries);
  const formattedResponses = data.map((response) => {
    const formattedResponse = {
      Responseid: response.Responseid,
      created_at: response.created_at,
    };

    response.Response_data.forEach((item) => {
      formattedResponse[item.question] = item.answer;
    });

    return formattedResponse;
  });

  //console.log(formattedResponses);
  return { responses:formattedResponses, questions };
}

export default async function handler(req, res) {
  try {
    // const {responseID, formID, user,responseData,created_at} = req.body;
    const { formID } = req.body;
    console.log("formID : ", formID);
    var query = `SELECT * from public."Response" WHERE "Form_id"='${formID}'`;

    console.log(query);

    const results = await conn.query(query);

    if (results.rowCount > 0) {
      console.log("All form submissions fetched from DB! ");
      const dataToreturn = modelData(results.rows);
      console.log(dataToreturn);
      res.status(200).json({ message: "ok", data: dataToreturn });
    } else {
      console.log("No form submissions found in DB! ", results.rowCount);
      res.status(200).json({ message: "ok", data: [] });
    }
  } catch (error) {
    console.log("Error: ", error);
    res
      .status(404)
      .json({ message: "Something went wrong! Please check console" });
  }
}
