import React from 'react';
import classNames from 'classnames';


const Badge = ({color, onClick, activeClass}) => (
    <i
        onClick={onClick}
        className={classNames('badge', {[`badge--${color}`]: color}, activeClass)}
    ></i>
);

export default Badge;
