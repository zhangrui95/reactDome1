import React, { Component, PropTypes } from 'react'

class LinkCell extends Component {

    render(){
        const {id,width,classes,links} = this.props;
        const children = links.map(function(link,i){
            return <a key={id+'_link_'+i} data-key={link.key} href={link.url}>{link.name}</a>;
        });
        return (
            <td width={width} className={classes}>
                {children}
            </td>
        )
    }

}

LinkCell.propTypes = {
    width: PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
    classes: PropTypes.oneOfType([PropTypes.object,PropTypes.string]),
    links: PropTypes.array
};

export default LinkCell;