import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

export default defineEventHandler(async (event) => {
  // Read data from mocdata.json
  const dataPath = resolve("mocdata.json");
  const data = JSON.parse(readFileSync(dataPath, "utf-8"));

  // Get data sent from the form
  const body = await readBody(event);

  // Create a new contact object
  const newContact = {
    id: data.length > 0 ? Math.max(...data.map(item => item.id)) + 1 : 1, // Generate a new unique ID
    fullname: body.fullName,
    age: body.age,
  };

  // Add the new contact to the beginning of the list
  data.unshift(newContact);

  // Write the updated data back to mocdata.json
  writeFileSync(dataPath, JSON.stringify(data, null, 2));

  return { success: true };
});
