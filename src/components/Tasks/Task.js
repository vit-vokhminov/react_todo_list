import React from 'react';

import {ReactSVG} from 'react-svg'
import CheckSVG from '../../assets/img/check.svg';
import EditSVG from '../../assets/img/edit.svg';
import RemoveSVG from '../../assets/img/remove.svg';


const Task = ({id, text, completed, list, onRemove, onEdit, onComplete}) => {
    const onChangeCheckbox = e => {
        onComplete(list.id, id, e.target.checked);
    };

    return (
        <div key={id} className="tasks__items-row">
            <div className="checkbox">
                <input
                    onChange={onChangeCheckbox}
                    id={`task-${id}`}
                    type="checkbox"
                    checked={completed}
                />
                <label htmlFor={`task-${id}`}>
                    <ReactSVG src={CheckSVG}/>
                </label>
            </div>
            <p>{text}</p>
            <div className="tasks__items-row-actions">
                <div onClick={() => onEdit(list.id, {id, text})}>
                    <ReactSVG src={EditSVG}/>
                </div>
                <div onClick={() => onRemove(list.id, id)}>
                    <ReactSVG src={RemoveSVG}/>
                </div>
            </div>
        </div>
    );
};

export default Task;
