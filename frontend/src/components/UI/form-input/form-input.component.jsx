import PropTypes from 'prop-types'
import { FormInputLabel, Input, Group } from './form-input.styles'

const FormInput = ({ label, ...otherProps }) => {
    return (
        <Group>
            <Input id={otherProps.name} {...otherProps} />
            {label && (
                <FormInputLabel shrink={otherProps.value} htmlFor={otherProps.name}>
                    {label}
                </FormInputLabel>
            )}
        </Group>
    )
}

FormInput.propTypes = {
    label: PropTypes.string,
    otherProps: PropTypes.object,
}

export default FormInput;