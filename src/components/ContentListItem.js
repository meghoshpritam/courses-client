import React from 'react';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import style from './ContentListItem.module.scss';

export default function ContentListItem({ title, description, type, time }) {
  return (
    <div className={style.container}>
      <div>{title}</div>
      <div>
        <PlayCircleFilledIcon color="primary" />
      </div>
      <div>{description}</div>
      <div>{time}</div>
      <div>{type}</div>
    </div>
  );
}
