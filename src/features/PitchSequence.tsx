import {
    Box,
    Step,
    StepDescription,
    // StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    useSteps,
} from '@chakra-ui/react'

const PitchSequence = () => {
    const steps = [
        { title: 'Ball', description: '89.3 mph Sinker' },
        { title: 'Called Strike', description: '90 mph Sinker' },
        { title: 'Foul', description: '89.8 mph Four-Seam Fastball' },
        { title: 'In Play Out(s)', description: '84.4 mph Slider' },
    ]

    const { activeStep } = useSteps({
        index: 1,
        count: steps.length,
    })

    return (
        <Stepper index={activeStep} orientation='vertical' height='100px' gap='0' size="xs">
            {steps.map((step, index) => (
                <Step key={index}>
                    <StepIndicator>
                        <StepStatus
                            // complete={<StepIcon />}
                            incomplete={<StepNumber />}
                            active={<StepNumber />}
                        />
                    </StepIndicator>
                    <Box >
                        <StepTitle>{step.title}</StepTitle>
                        <StepDescription>{step.description}</StepDescription>
                    </Box>
                    <StepSeparator />
                </Step>
            ))}
        </Stepper>
    )
}
export default PitchSequence