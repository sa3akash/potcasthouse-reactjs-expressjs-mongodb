import React, {useState} from 'react'
import StepName from '../Steps/StepName/StepName'
import StepAvater from "../Steps/StepAvater/StepAvater"

const steps = {
  1: StepName,
  2: StepAvater,
}

const ActivatePage = () => {
  const [step, setStep] = useState(1)

  const Component = steps[step];


  const onNext = ()=> {
    setStep(step + 1)
  }
  return (
    <Component onNext={onNext} />
  )
}

export default ActivatePage