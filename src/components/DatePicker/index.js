import React, { Component } from "react";
// import { jsx } from "@emotion/react";
import moment from "moment";
import * as chrono from "chrono-node";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/appointmentActions";

import Select from "react-select";
import { components as SelectComponents } from "react-select";

const createOptionForDate = d => {
    const date = moment.isMoment(d) ? d : moment(d);
    return {
        date,
        value: date.toDate(),
        label: date.calendar(null, {
            sameDay: '[Today] (Do MMM YYYY)',
            nextDay: '[Tomorrow] (Do MMM YYYY)',
            nextWeek: '[Next] dddd (Do MMM YYYY)',
            lastDay: '[Yesterday] (Do MMM YYYY)',
            lastWeek: '[Last] dddd (Do MMM YYYY)',
            sameElse: 'Do MMMM YYYY',
        }),
    };
};

const defaultOptions = ['today', 'tomorrow'].map( i =>
    createOptionForDate(chrono.parseDate(i))
);

const createCalendarOptions = (date = new Date()) => {
    // $FlowFixMe
    const daysInMonth = Array.apply(null, {
        length: moment(date).daysInMonth(),
    }).map((x, i) => {
        const d = moment(date).date(i + 1);
        if(moment().add(-1, 'days').toDate() > createOptionForDate(d).value)
            return { ...createOptionForDate(d), display: 'calendar', isDisabled: true };
        else
            return { ...createOptionForDate(d), display: 'calendar' };
    });
    return {
        label: moment(date).format('MMMM YYYY'),
        options: daysInMonth
    };
};

defaultOptions.push(createCalendarOptions());

const suggestions = [
    'sunday',
    'saturday',
    'friday',
    'thursday',
    'wednesday',
    'tuesday',
    'monday',
    'december',
    'november',
    'october',
    'september',
    'august',
    'july',
    'june',
    'may',
    'april',
    'march',
    'february',
    'january',
    'yesterday',
    'tomorrow',
    'today',
].reduce((acc, str) => {
    for (let i = 1; i < str.length; i++) {
        acc[str.substr(0, i)] = str;
    }
    return acc;
}, {});

const suggest = str =>
    str
        .split(/\b/)
        .map(i => suggestions[i] || i)
        .join('');

const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const daysHeaderStyles = {
    marginTop: '5px',
    paddingTop: '5px',
    paddingLeft: '2%',
    borderTop: '1px solid #eee',
};
const daysHeaderItemStyles = {
    color: '#999',
    cursor: 'default',
    display: 'block',
    fontSize: '75%',
    fontWeight: '500',
    display: 'inline-block',
    width: '12%',
    margin: '0 1%',
    textAlign: 'center',
};
const daysContainerStyles = {
    paddingTop: '5px',
    paddingLeft: '2%',
};

const Group = props => {
    const {
        Heading,
        getStyles,
        children,
        label,
        innerProps,
        headingProps,
        cx,
        theme,
    } = props;
    return (
        <div aria-label={label} css={getStyles('group', props)} {...innerProps}>
            <Heading theme={theme} getStyles={getStyles} cx={cx} {...headingProps}>
                {label}
            </Heading>
            <div style={daysHeaderStyles}>
                {days.map((day, i) => (
                    <span key={`${i}-${day}`} 
                    style={daysHeaderItemStyles}
                    // style={{backgroundColor: "red"}}
                    >
                        {day}
                    </span>
                ))}
            </div>
            <div style={daysContainerStyles}>{children}</div>
        </div>
    );
};

const getOptionStyles = defaultStyles => ({
    ...defaultStyles,
    display: 'inline-block',
    width: '12%',
    margin: '0 1%',
    textAlign: 'center',
    borderRadius: '4px'
});

const Option = props => {
    const { data, getStyles, innerRef, innerProps } = props;
    if (data.display === 'calendar') {
        const defaultStyles = getStyles('option', props);
        const styles = getOptionStyles(defaultStyles);
        if (data.date.date() === 1) {
            const indentBy = data.date.day();
            if (indentBy) {
                styles.marginLeft = `${indentBy * 14 + 1}%`;
            }
            // console.log(innerProps);
        }
        return (
            <span {...innerProps} 
                style={styles} 
                // style={{backgroundColor: "red"}}
                ref={innerRef}>
                {data.date.format('D')}
            </span>
        );
    } else return <SelectComponents.Option {...props} />;
};

class DatePicker extends Component {
    state = {
        options: defaultOptions,
    };
    
    handleChange = e => {
        this.props.collectAppDate(e.date.format("YYYY-MM-DD"));
        
        setTimeout(() => {
            this.props.prepareTimeOptions(this.props.selectedDate, this.props.busyTimes);
            this.props.setTimeOptions(this.props.test1);
        }, 2000);
    };

    
    render() {
        const { value } = this.props;
        const { options } = this.state;

        return (
            <>
                <Select
                    {...this.props}
                    components={{ Group, Option }}
                    filterOption={null}
                    isMulti={false}
                    isOptionSelected={(o, v) => v.some(i => i.date.isSame(o.date, 'day'))}
                    maxMenuHeight={380}
                    onChange={this.handleChange}
                    options={options}
                    value={value}
                />
            </>
        );
    }
};

const mapStateToProps = state => {
    return {
        selectedDate: state.appointmentReducer.selectedDate,
        busyTimes: state.appointmentReducer.busyTimes,
        test1: state.appointmentReducer.test1
    };
};

const mapDispatchToProps = dispatch => {
    return {
        collectAppDate: (selectedDate) => dispatch(actions.collectAppDate(selectedDate)),
        prepareTimeOptions: (timeOptions, busyTimes) => dispatch(actions.prepareTimeOptions(timeOptions, busyTimes))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DatePicker);