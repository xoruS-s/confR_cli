import React from 'react';

const PagesArea = (...props) => {
    return (
        <div className={'pages_area'}>
            {
                props.page_table !== 1 ?
                    <input
                        type={'button'}
                        value={'<'}
                        name={'left'}
                        onClick={props.set_page}
                        className={'arr_input'}
                    />
                    :
                    <input
                        type={'button'}
                        value={'<'}
                        name={'left'}
                        onClick={props.set_page}
                        className={'arr_input'}
                        disabled
                    />
            }

            <input
                type={'button'}
                className={'page_view'}
                value={props.page_table}
            />

            {
                props.page_table !== props.count_pages ?
                    <input
                        type={'button'}
                        value={'>'}
                        name={'right'}
                        onClick={props.set_page}
                        className={'arr_input'}
                    />
                    :
                    <input
                        type={'button'}
                        value={'>'}
                        name={'right'}
                        onClick={props.set_page}
                        className={'arr_input'}
                        disabled
                    />
            }
        </div>
    );
};

export default PagesArea;
