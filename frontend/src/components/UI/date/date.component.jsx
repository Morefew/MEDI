import PropTypes from 'prop-types';
import moment from 'moment';
import { DateCard, Day, DayNumber, Month } from './date.styles';

const Date = ({ date, onSelectDate, selected }) => {
    const day = moment.utc(date).format('ddd');
    const dayNumber = moment.utc(date).format('DD');
    const month = moment.utc(date).format('MMM');
    const fullDate = moment.utc(date).format('YYYY-MM-DD');

    return (
        <DateCard
            onClick={() => onSelectDate(fullDate)}
            selected={selected === fullDate}
        >
            <Month selected={selected === fullDate}>{month}</Month>
            <DayNumber selected={selected === fullDate}>{dayNumber}</DayNumber>
            <Day selected={selected === fullDate}>{day.toUpperCase()}</Day>
        </DateCard>
    );
};

Date.propTypes = {
    date: PropTypes.any.isRequired,
    onSelectDate: PropTypes.func.isRequired,
    selected: PropTypes.string,
};

export default Date;
