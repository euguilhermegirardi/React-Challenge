import React from 'react'

const FormContext = React.createContext()

function FormProvider(props) {
  const [userData, setUserData] = React.useState([])
  const value = [userData, setUserData]
  return <FormContext.Provider value={value} {...props} />
}

function useInputValues() {
  const contextValues = React.useContext(FormContext)
  if(!contextValues) {
    throw new Error('useInputValues must be used within a CountProvider')
  }
  return contextValues
}

const RESET_STATE = {
  name: '',
  surname: '',
  phone: '',
  errors: []
}

function InputForm() {
  const [, setUserData] = useInputValues()

  const [contextValues] = useInputValues()

  const [state, setState] = React.useState({
    name: 'Guilherme',
    surname: 'Girardi',
    phone: '0833800000',
    errors: []
  })

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]:event.target.value })
  }

  const validate = (state) => {
    const errors = []
    !state.name && errors.push("Name is required")
    !state.surname && errors.push("Surname is required")
    !state.phone && errors.push("Phone is required")
    setUserData({ ...state, errors: errors })
    return errors.length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if(validate(state)) {
      setUserData(state)
      setState(RESET_STATE)
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">
        Name:
        <input type="text" name="name" value={state.name} onChange={handleChange} />
      </label>
      <br/>
      <br/>
      <label htmlFor="surname">
        Surname:
        <input type="text" name="surname" value={state.surname} onChange={handleChange} />
      </label>
      <br/>
      <br/>
      <label htmlFor="phone">
        Phone:
        <input type="text" name="phone" value={state.phone} onChange={handleChange} />
      </label>
      <br />
      <br />
      {contextValues.errors && contextValues.errors.length > 0 && contextValues.errors.map((err,i) => (
        <p key={i}>{err}</p>
      ))}
      <button submit="submit">Save</button>
    </form>  
  )
}

function RegisteredUser() {
  const [contextValues] = useInputValues()

  return (
    <div 
      style={{
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-around',
        width: '80%'
      }}
    >
      <div>
        <label htmlFor="name">
          Name:
          <span style={{marginLeft: '10px'}}>
            {
              contextValues.name !== '' &&
              (
                contextValues.errors &&
                contextValues.errors.length === 0
              ) ? contextValues.name : null}
          </span>
        </label>
      </div>
      <div>
        <label htmlFor="surname">
          Surname:
          <span style={{marginLeft: '10px'}}>
            {
              contextValues.surname !== '' && 
              (
                contextValues.errors &&
                contextValues.errors.length === 0
              ) ? contextValues.surname : null}
          </span>
        </label>
      </div>
      <div>
        <label htmlFor="phone">
          Phone:
          <span style={{marginLeft: '10px'}}>
            {
              contextValues.phone !== '' && 
              (
                contextValues.errors &&
                contextValues.errors.length === 0 
              ) ? contextValues.phone : null}
          </span>
        </label>
      </div>
    </div>
  )
}

function Form() {
  return (
    <FormProvider>
      <InputForm />
      <RegisteredUser />
    </FormProvider>
  )
}

export default Form