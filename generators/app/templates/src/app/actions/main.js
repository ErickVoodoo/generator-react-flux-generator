import AppDispatcher from '../dispatchers/main';

export default {
  actionStart: (data, type) => {
    AppDispatcher.handleAction({
      data: data,
      type: type,
    });
  },
};
