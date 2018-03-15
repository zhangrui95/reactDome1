import React from 'react'
import BannerCounterBox from './BannerCounterBox'
import BannerCounterItem from './BannerCounterItem'
import BannerImgBox from './BannerImgBox'
import BannerImgItem from './BannerImgItem'

const types = {
    BannerCounterBox,
    BannerImgBox,
    BannerCounterItem,
    BannerImgItem
};

function element(type,props,children) {
    return React.createElement(types[type],props,children)
}

export default element;