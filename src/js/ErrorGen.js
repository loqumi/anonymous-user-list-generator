import { faker } from "@faker-js/faker";
import { ACCOUNT_FIELDS } from "../constants/constants.js";

const getRandomAccountField = () =>
  ACCOUNT_FIELDS[(ACCOUNT_FIELDS.length * Math.random()) << 0];

const removeRandomCharError = (s, randomCharPosition) =>
  s.replace(s[randomCharPosition], "");

const addRandomCharError = (s, randomCharPosition) =>
  s.slice(0, randomCharPosition) +
  faker.random.alphaNumeric() +
  s.slice(randomCharPosition);

const swapError = (s, randomCharPosition) => {
  const listOfChars = s.split("");

  const isGreaterThanLengthOfString = randomCharPosition >= s.length;
  const charToBeReplacedPosition = isGreaterThanLengthOfString
    ? randomCharPosition - 1
    : randomCharPosition + 1;
  const [leftChar, rightChar] = [
    listOfChars[randomCharPosition],
    listOfChars[charToBeReplacedPosition],
  ];
  listOfChars[randomCharPosition] = rightChar;
  listOfChars[charToBeReplacedPosition] = leftChar;
  return listOfChars.join("");
};

const getRandomError = (s, fieldLength) => {
  let result = "";
  const maxErrorsFns = 3;
  const randomErrorFn = (Math.random() * maxErrorsFns) << 0;
  const randomCharPosition = (Math.random() * s.length) << 0;

  const isGreaterThanOriginal = s.length > fieldLength;
  const isLowerThanOriginal = s.length < fieldLength;

  if (isGreaterThanOriginal) {
    result = removeRandomCharError(s, randomCharPosition);
  } else if (isLowerThanOriginal) {
    result = addRandomCharError(s, randomCharPosition);
  } else {
    switch (randomErrorFn) {
      case 0:
        result = removeRandomCharError(s, randomCharPosition);
        break;

      case 1:
        result = addRandomCharError(s, randomCharPosition);
        break;

      case 2:
      default:
        result = swapError(s, randomCharPosition);
        break;
    }
  }
  return result;
};

export const generateErrorsForRecord = (errorsCount, account) => {
  const user = {
    id: account.id.value,
    fullName: `${account.name.first} ${account.name.last}`,
    location: `${account.location.city} ${account.location.postcode} ${account.location.street.name}`,
    phone: account.phone,
  };
  let changedAccountData = Object.assign({}, user);
  for (let i = 0; i < errorsCount; i++) {
    const randomField = getRandomAccountField();
    const fieldLength = user[randomField].length;
    changedAccountData[randomField] = getRandomError(
      changedAccountData[randomField],
      fieldLength
    );
  }
  return changedAccountData;
};
