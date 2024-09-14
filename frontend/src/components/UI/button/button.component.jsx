import PropTypes from 'prop-types';
import { ButtonContainer, ButtonText, Spinner } from './button.styles';

const Button = ({ title, buttonType = 'main', style, loading = false, ...rest }) => {
    return (
        <ButtonContainer buttonType={buttonType} style={style} {...rest}>
            {loading ? (
                <Spinner buttonType={buttonType} />
            ) : (
                <ButtonText buttonType={buttonType}>{title}</ButtonText>
            )}
        </ButtonContainer>
    );
};

Button.propTypes = {
    title: PropTypes.string.isRequired,
    buttonType: PropTypes.oneOf(['main', 'inverted']),
    loading: PropTypes.bool,
    style: PropTypes.object,
};

export default Button;
