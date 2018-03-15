import React from 'react'
import AutoCompleteItem from './AutoCompleteItem'
import InputItem from './InputItem'
import SelectItem from './SelectItem'
import DateItem from './DateItem'
import DateRangeItem from './DateRangeItem'
import DateRange2Item from './DateRange2Item'
import SingleCheckBoxItem from './SingleCheckBoxItem'
const types = {
    AutoCompleteItem,
    InputItem,
    SelectItem,
    DateItem,
    DateRangeItem,
    DateRange2Item,
    SingleCheckBoxItem
};

function element(type,props,children) {
    return React.createElement(types[type],props,children)
}

export default element;