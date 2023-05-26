import conn from "../../utils/db";

function getQuestions(data) {
  let questions = [];
  data.map((item) => {
    questions.push({id:item.id,question:item.question});
  });
  return questions;
}

function modelData(data,formDataArray) {

  let formData = formDataArray[0]?.Form_data;
  //console.log('formData : ', formData)
  console.log('response data : ', data[0].Response_data);
  let questions = getQuestions(formData);
  console.log('questions : ', questions);
  const formattedResponses = data.map((response) => {
    const formattedResponse = {
      Responseid: response.Responseid,
      created_at: response.created_at,
    };
    
    response.Response_data.forEach((item) => {
      // Get matching question from questions array
      const matchingQuestion = questions.find((question) => question.id === item.questionID);

      if (matchingQuestion) {
        formattedResponse[matchingQuestion.question] = item.answer;
      } else {
        // Add new question with null value
        formattedResponse[item.question] = null;
      }
    });

    // Add any new questions that were not in the response
    questions.forEach((question) => {
      if (!formattedResponse.hasOwnProperty(question.question)) {
        formattedResponse[question.question] = null;
      }
    });

    return formattedResponse;
  });

  
  console.log('Formatted responses',formattedResponses);
  return { responses:formattedResponses, questions };
}

export default async function handler(req, res) {
  try {
    // const {responseID, formID, user,responseData,created_at} = req.body;
    const { formID } = req.body;
    var query = `SELECT * from public."Response" WHERE "Form_id"='${formID}'`;

 //   console.log(query);

    const results = await conn.query(query);

    if (results.rowCount > 0) {
      console.log("All form submissions fetched from DB! ");
      var query2 = `SELECT * from public."Form" WHERE "Formid" = '${formID}'`;
      const formDataresults = await conn.query(query2);
      const dataToreturn = modelData(results.rows,formDataresults.rows);
      console.log('Data to return : ',dataToreturn);
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
