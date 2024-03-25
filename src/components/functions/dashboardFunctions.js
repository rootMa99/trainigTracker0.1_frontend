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
  const { trainingType, trainingTitle, category, department } = d;

  const hasTrainingType = trainingType !== "";
  const hasTrainingTitle = trainingTitle !== "";
  const hasCategory = category !== "";
  const hasDepartment = department !== "";

  const filterFunctions = [
    hasTrainingType && ((item) => item.trainingType === trainingType),
    hasTrainingTitle && ((item) => item.trainingTitle === trainingTitle),
    hasCategory &&
      ((item) => item.employeeRests.some((rest) => rest.category === category)),
    hasDepartment &&
      ((item) =>
        item.employeeRests.some((rest) => rest.department === department)),
  ].filter(Boolean);

  if (filterFunctions.length === 0) {
    return data;
  }

  return data.filter((item) => filterFunctions.every((fn) => fn(item)));
};
export const extractedArray = (data) => {
  const rd = [];
  data.forEach((e) => {
    if (e.employeeRests.length > 0) {
      e.employeeRests.forEach((es) => {
        const exta = { ...e, es };
        delete exta.employeeRests;
        rd.push(exta);
      });
    }
  });
  return rd;
};

export const getHoursByCategory = (d, type) => {
  const rd = [];
  for (const i in d) {
    if (rd.length === 0) {
      rd.push({
        cat: d[i].es[type],
        nbh: d[i].dph,
      });
      continue;
    }
    const index = rd.findIndex((f) => f.cat === d[i].es[type]);
    if (index === -1) {
      rd.push({
        cat: d[i].es[type],
        nbh: d[i].dph,
      });
    } else {
      rd[index].nbh += d[i].dph;
    }
  }
  return rd;
};

export const getfiltredArrayV2 = (data, d) => {
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
    return data.filter((item) => item.es.department === d.department);
  }
  if (
    d.trainingType === "" &&
    d.trainingTitle === "" &&
    d.category !== "" &&
    d.department === ""
  ) {
    return data.filter((item) => item.es.category === d.category);
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
        item.trainingTitle === d.trainingTitle && item.escategory === d.category
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
        item.es.department === d.department
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
        item.es.department === d.department
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
        item.trainingType === d.trainingType && item.es.category === d.category
    );
  }
  if (
    d.trainingType === "" &&
    d.trainingTitle === "" &&
    d.category !== "" &&
    d.department !== ""
  ) {
    return data.filter(
      (item) =>
        item.es.category === d.category && item.es.department === d.department
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
        item.es.category === d.category
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
        item.es.department === d.department
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
        item.es.department &&
        item.es.category === d.category
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
        item.es.department === d.department &&
        item.es.category === d.category
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
        item.es.department === d.department &&
        item.es.category === d.category
    );
  }
};

export const destractArray = (data) => {
  const rd = [];
  for (const i in data) {
    const obj = data[i];
    if (rd.length === 0) {
      rd.push({
        ddb: obj.ddb,
        ddf: obj.ddf,
        dph: obj.dph,
        eva: obj.eva,
        formatteur: obj.formatteur,
        modalite: obj.modalite,
        prestataire: obj.prestataire,
        trainingId: obj.trainingId,
        trainingTitle: obj.trainingTitle,
        trainingType: obj.trainingType,
        employeeRests: [obj.es],
      });
      continue;
    }
    const index = rd.findIndex(
      (f) => f.trainingId === obj.trainingId
    );
    if(index===-1){
      rd.push({
        ddb: obj.ddb,
        ddf: obj.ddf,
        dph: obj.dph,
        eva: obj.eva,
        formatteur: obj.formatteur,
        modalite: obj.modalite,
        prestataire: obj.prestataire,
        trainingId: obj.trainingId,
        trainingTitle: obj.trainingTitle,
        trainingType: obj.trainingType,
        employeeRests: [obj.es],
      });
    }else{
      rd[index].employeeRests.push(obj.es)
    }
  }
  return rd
};
