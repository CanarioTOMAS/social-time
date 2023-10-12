const { parse, format } = require('date-fns');

function convertToISO8601(argentinaDateString:any) {
  // Define el formato de fecha utilizado en Argentina
  const argentinaDateFormat = 'dd/MM/yyyy HH:mm';

  // Parsea la fecha en el formato argentino a un objeto Date
  const date = parse(argentinaDateString, argentinaDateFormat, new Date());

  // Formatea la fecha en formato ISO 8601
  const iso8601DateString = format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

  return iso8601DateString;
}

module.exports = convertToISO8601;