import React, {useState, useEffect} from 'react';
import axios from 'axios';

import List from './List';
import Badge from './Badge';

import {ReactSVG} from 'react-svg'
import AddSVG from '../assets/img/add.svg';
import CloseSVG from '../assets/img/close.svg';


const AddList = ({colors, onAddList}) => {
    const [visiblePopup, setVisiblePopup] = useState(false);
    const [seletedColor, selectColor] = useState(3);
    const [isLoading, setIsLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (Array.isArray(colors)) {
            selectColor(colors[0].id);
        }
    }, [colors]);

    const onClose = () => {
        setVisiblePopup(false);
        setInputValue('');
        selectColor(colors[0].id);
    };

    const addList = () => {
        if (!inputValue) {
            alert('Введите название списка');
            return;
        }
        setIsLoading(true);
        axios
            .post('http://localhost:3001/lists', {
                name: inputValue,
                colorId: seletedColor
            })
            .then(({data}) => {
                const color = colors.filter(elem => elem.id === seletedColor)[0];
                const listObj = {...data, color, tasks: []};
                onAddList(listObj);
                onClose();
            })
            .catch(() => {
                alert('Ошибка при добавлении списка!');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <div className="add-list">
            <List
                onClick={() => setVisiblePopup(true)}
                items={[
                    {
                        className: 'list__add-button',
                        icon: (
                            <ReactSVG src={AddSVG}/>
                        ),
                        name: 'Добавить список'
                    }
                ]}
            />
            {visiblePopup && (
                <div className="modal">

                    <div className="add-list__popup">
                        <ReactSVG src={CloseSVG}
                                  onClick={onClose}
                                  className="add-list__popup-close-btn"/>

                        <input
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
                            className="field"
                            type="text"
                            placeholder="Название списка"
                        />

                        <div className="add-list__popup-colors">
                            {colors.map(color => (
                                <Badge
                                    onClick={() => selectColor(color.id)}
                                    key={color.id}
                                    color={color.name}
                                    activeClass={seletedColor === color.id && 'active'}
                                />
                            ))}
                        </div>
                        <button onClick={addList} className="button">
                            {isLoading ? 'Добавление...' : 'Добавить'}
                        </button>
                    </div>

                </div>
            )}
        </div>
    );
};

export default AddList;
