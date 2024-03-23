import c from "./AddTrainingFrom.module.css"

const AddTrainingForm=p=>{

return(
    <div className={c.formCAdmin}>
          <h1 className={c.title}>Add training to 890</h1>
          <form className={c.form} >
            <div className={c["form-group"]}>
              <label htmlFor="userName">userName</label>
              <input
                required
                name="userName"
                id="userName"
                type="text"
                placeholder="enter userName"
                style={{ textTransform: "none" }}
              />
            </div>
            <div className={c["form-group"]}>
              <label htmlFor="password">password</label>
              <input
                required
                name="password"
                id="password"
                type="text"
                placeholder="enter password"
              />
            </div>
            <div className={c["form-group"]}>
              <label htmlFor="password">password</label>
              <input
                required
                name="password"
                id="password"
                type="text"
                placeholder="enter password"
              />
            </div>
            <div className={c["form-group"]}>
              <label htmlFor="password">password</label>
              <input
                required
                name="password"
                id="password"
                type="text"
                placeholder="enter password"
              />
            </div>
           
            
            <button type="submit" className={c["form-submit-btn"]}>
              Submit
            </button>
          </form>
        </div>
)
}

export default AddTrainingForm;