

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

  
  export const getTypes=data=>{
    const retData = [];
    data.map((m) =>
      retData.push({
        value: m.trainingType,
        label: m.trainingType,
      })
    );
    return retData;
  }

  export const getTodayFormat=()=>{

    const date= new Date();

    return date.toISOString().split('T')[0]

  }