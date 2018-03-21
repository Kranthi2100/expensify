import moment from 'moment';
export const filters = {
    text: '',
    sortBy: '',
    startDate: undefined,
    endDate: undefined
};

export const altFilters = {
    text: 'netfix',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
};