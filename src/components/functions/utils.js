export const getlabelandvalue = (data) => {
  const retData = [];
  if (data.length > 0) {
    data.map((m) =>
      retData.push({
        value: m,
        label: m,
      })
    );
  }
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

export const sendEmail = (email, subjects, bodys) => {
  const recipient = email;
  const subject = subjects;
  const body = bodys;

  window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
};

export const getNextWeekDates = () => {
  const currentDate = new Date();
  const currentDayOfWeek = currentDate.getDay();
  const daysUntilNextMonday = 8 - currentDayOfWeek;

  const nextMonday = new Date(
    currentDate.getTime() + daysUntilNextMonday * 24 * 60 * 60 * 1000
  );

  return nextMonday.toISOString().slice(0, 10);
};

export const getNextWeek = () => {
  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  const nextWeekStart = new Date(
    nextWeek.getFullYear(),
    nextWeek.getMonth(),
    nextWeek.getDate() - nextWeek.getDay() + 1
  );
  const nextWeekEnd = new Date(
    nextWeekStart.getTime() + 6 * 24 * 60 * 60 * 1000
  );

  const startDateFormatted = nextWeekStart.toISOString().split("T")[0];
  const endDateFormatted = nextWeekEnd.toISOString().split("T")[0];

  return {
    start: startDateFormatted,
    end: endDateFormatted,
  };
};

export const filtData = (data, fil) => {
  if (fil.qua.trim() === "" && fil.shift.trim() === "" && fil.sts === "") {
    return data;
  }
  if (fil.qua.trim() === "" && fil.shift.trim() !== "" && fil.sts === "") {
    return data.filter((f) => f.shift === fil.shift);
  }
  if (fil.qua.trim() !== "" && fil.shift.trim() === "" && fil.sts === "") {
    return data.filter((f) => f.qualification === fil.qua);
  }
  if (fil.qua.trim() === "" && fil.shift.trim() === "" && fil.sts !== "") {
    return data.filter((f) => f.status === fil.sts);
  }
  if (fil.qua.trim() !== "" && fil.shift.trim() !== "" && fil.sts === "") {
    return data.filter(
      (f) => f.shift === fil.shift && f.qualification === fil.qua
    );
  }
  if (fil.qua.trim() === "" && fil.shift.trim() !== "" && fil.sts !== "") {
    return data.filter((f) => f.shift === fil.shift && f.status === fil.sts);
  }
  if (fil.qua.trim() !== "" && fil.shift.trim() === "" && fil.sts !== "") {
    return data.filter(
      (f) => f.qualification === fil.qua && f.status === fil.sts
    );
  }
  if (fil.qua.trim() !== "" && fil.shift.trim() !== "" && fil.sts !== "") {
    return data.filter(
      (f) =>
        f.qualification === fil.qua &&
        f.status === fil.sts &&
        f.shift === fil.shift
    );
  }
};
