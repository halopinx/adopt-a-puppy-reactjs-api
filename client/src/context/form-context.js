import { createContext, useContext, useState } from "react";

const FormContext = createContext({
    isSubmitted: false,
    setIsSubmitted: () => {}
})

export const useFormContext = () => useContext(FormContext);

const FormContextProvider = ({ children}) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    
    return (
        <FormContext.Provider value={{ isSubmitted, setIsSubmitted }}>
            { children }
        </FormContext.Provider>
    )
}

export default FormContextProvider;