import React from 'react';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import style from './ContentListItem.module.scss';

export default function ContentListItem() {
  return (
    <div className={style.container}>
      <div>sdsj djksjdkjsd s fdkki erehrejkj dfkl hjdf dhfdhffhdfh hdjfhdh</div>
      <div>
        <PlayCircleFilledIcon />
      </div>
      <div>
        Descriptions hsjd shdjs Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta
        perferendis, repellendus velit labore aliquid quam?
      </div>
      <div>02:51</div>
      <div>Video</div>
    </div>
  );
}
