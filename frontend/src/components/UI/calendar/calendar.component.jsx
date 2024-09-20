import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { DateSection, ScrollWrapper } from './calendar.styles';
import Date from '../date/date.component';

const Calendar = ({ onSelectDate, selected }) => {
    const [dates, setDates] = useState([]);

    const getDates = () => {
        const _dates = [];
        let date = moment.utc().startOf('isoWeek');
        for (let i = 0; i < 6; i++) {
            // Solo añade de lunes a sábado
            if (date.isoWeekday() !== 7) {
                _dates.push(date.clone());
            }
            date.add(1, 'days')
        }
        setDates(_dates);
    };

    useEffect(() => {
        getDates();
    }, []);

    return (
        <DateSection>
            <ScrollWrapper>
                {dates.map((date, index) => (
                    <Date
                        key={index}
                        date={date}
                        onSelectDate={onSelectDate}
                        selected={selected}
                    />
                ))}
            </ScrollWrapper>
        </DateSection>
    );
};

Calendar.propTypes = {
    onSelectDate: PropTypes.func.isRequired,
    selected: PropTypes.string,
};

export default Calendar;
