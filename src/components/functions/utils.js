export const getlabelandvalue = (data) => {
  const retData = [];
  data.map((m) =>
    retData.push({
      value: m,
      label: m,
    })
  );
  return retData;
};

export const getTypes = (data) => {
  const retData = [];
  data.map((m) =>
    retData.push({
      value: m.trainingType,
      label: m.trainingType,
    })
  );
  return retData;
};

export const getTodayFormat = () => {
  const date = new Date();

  return date.toISOString().split("T")[0];
};

export const generateRandomString = (length) => {
  const characters =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
export const sendEmail = () => {
  const recipient = "anasszeroual09@gmail.com"; // Replace with the recipient's email address
  const subject = "Subject of the email"; // Replace with the subject of the email
  const body = "Body of the email"; // Replace with the body of the email

  window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
};
