import { createContext} from "react";

const FormContext = createContext({
    isSubmitted: false,
    setIsSubmitted: () => {}
})

export default FormContext;