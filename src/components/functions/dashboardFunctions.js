export const getTotals = (data) => {
  let nbEmployee = 0;
  const nbSession = data.length;
  let totalHour = 0;

  data.forEach((element) => {
    totalHour += element.dph;
    nbEmployee += element.employeeRests.length;
  });

  return {
    nbEmployee,
    nbSession,
    totalHour,
  };
};
export const getfiltredArray = (data, d) => {
  if (
    d.trainingType === "" &&
    d.trainingTitle === "" &&
    d.category === "" &&
    d.department === ""
  ) {
    return data;
  }
  if (
    d.trainingType === "" &&
    d.trainingTitle === "" &&
    d.category === "" &&
    d.department !== ""
  ) {
    return data.filter((item) =>
      item.employeeRests.some((rest) => rest.department === d.department)
    );
  }
  if (
    d.trainingType === "" &&
    d.trainingTitle === "" &&
    d.category !== "" &&
    d.department === ""
  ) {
    return data.filter((item) =>
      item.employeeRests.some((rest) => rest.category === d.category)
    );
  }
  if (
    d.trainingTitle === "" &&
    d.trainingType !== "" &&
    d.category === "" &&
    d.department === ""
  ) {
    return data.filter((item) => item.trainingType === d.trainingType);
  }
  if (
    d.trainingType !== "" &&
    d.trainingTitle === "" &&
    d.category === "" &&
    d.department === ""
  ) {
    return data.filter((item) => item.trainingTitle === d.trainingTitle);
  }
  if (
    d.trainingType === "" &&
    d.trainingTitle !== "" &&
    d.category !== "" &&
    d.department === ""
  ) {
    return data.filter(
      (item) =>
        item.trainingTitle === d.trainingTitle &&
        item.employeeRests.some((rest) => rest.category === d.category)
    );
  }
  if (
    d.trainingType === "" &&
    d.trainingTitle !== "" &&
    d.category === "" &&
    d.department !== ""
  ) {
    return data.filter(
      (item) =>
        item.trainingTitle === d.trainingTitle &&
        item.employeeRests.some((rest) => rest.department === d.department)
    );
  }
  if (
    d.trainingType !== "" &&
    d.trainingTitle !== "" &&
    d.category === "" &&
    d.department === ""
  ) {
    return data.filter(
      (item) =>
        item.trainingTitle === d.trainingTitle &&
        item.trainingType === d.trainingType
    );
  }
  if (
    d.trainingType !== "" &&
    d.trainingTitle === "" &&
    d.category === "" &&
    d.department !== ""
  ) {
    return data.filter(
      (item) =>
        item.trainingType === d.trainingType &&
        item.employeeRests.some((rest) => rest.department === d.department)
    );
  }
  if (
    d.trainingType !== "" &&
    d.trainingTitle === "" &&
    d.category !== "" &&
    d.department === ""
  ) {
    return data.filter(
      (item) =>
        item.trainingType === d.trainingType &&
        item.employeeRests.some((rest) => rest.category === d.category)
    );
  }
  if (
    d.trainingType === "" &&
    d.trainingTitle === "" &&
    d.category !== "" &&
    d.department !== ""
  ) {
    return data.filter((item) =>
      item.employeeRests.some(
        (rest) =>
          rest.category === d.category && rest.department === d.department
      )
    );
  }
  if (
    d.trainingType !== "" &&
    d.trainingTitle !== "" &&
    d.category !== "" &&
    d.department === ""
  ) {
    return data.filter(
      (item) =>
        item.trainingType === d.trainingType &&
        item.trainingTitle === d.trainingTitle &&
        item.employeeRests.some((rest) => rest.category === d.category)
    );
  }
  if (
    d.trainingType !== "" &&
    d.trainingTitle !== "" &&
    d.category === "" &&
    d.department !== ""
  ) {
    return data.filter(
      (item) =>
        item.trainingType === d.trainingType &&
        item.trainingTitle === d.trainingTitle &&
        item.employeeRests.some((rest) => rest.department === d.department)
    );
  }
  if (
    d.trainingType !== "" &&
    d.trainingTitle === "" &&
    d.category !== "" &&
    d.department !== ""
  ) {
    return data.filter(
      (item) =>
        item.trainingType === d.trainingType &&
        item.employeeRests.some(
          (rest) =>
            rest.department === d.department && rest.category === d.category
        )
    );
  }
  if (
    d.trainingType === "" &&
    d.trainingTitle !== "" &&
    d.category !== "" &&
    d.department !== ""
  ) {
    return data.filter(
      (item) =>
        item.trainingTitle === d.trainingTitle &&
        item.employeeRests.some(
          (rest) =>
            rest.department === d.department && rest.category === d.category
        )
    );
  }
  if (
    d.trainingType !== "" &&
    d.trainingTitle !== "" &&
    d.category !== "" &&
    d.department !== ""
  ) {
    return data.filter(
      (item) =>
        item.trainingType === d.trainingType &&
        item.trainingTitle === d.trainingTitle &&
        item.employeeRests.some(
          (rest) =>
            rest.department === d.department && rest.category === d.category
        )
    );
  }
};


export const getfiltredArray2 = (data, d) => {
    const {
      trainingType,
      trainingTitle,
      category,
      department,
    } = d;
  
    const hasTrainingType = trainingType !== "";
    const hasTrainingTitle = trainingTitle !== "";
    const hasCategory = category !== "";
    const hasDepartment = department !== "";
  
    const filterFunctions = [
      hasTrainingType && ((item) => item.trainingType === trainingType),
      hasTrainingTitle && ((item) => item.trainingTitle === trainingTitle),
      hasCategory &&
        ((item) =>
          item.employeeRests.some((rest) => rest.category === category)),
      hasDepartment &&
        ((item) =>
          item.employeeRests.some((rest) => rest.department === department)),
    ].filter(Boolean);
  
    if (filterFunctions.length === 0) {
      return data;
    }
  
    return data.filter((item) =>
      filterFunctions.every((fn) => fn(item))
    );
  };