import {createActions} from 'utils/createActions';

const actions = createActions({
  SHOW_SLIDER: (imageId) => ({current: imageId, show: true}),
  HIDE_SLIDER: () => ({current: undefined, show: false}),
});

export const {showSlider, hideSlider} = actions;
