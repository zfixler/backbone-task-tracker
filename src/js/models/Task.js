import Backbone from 'backbone';

// The model defines the structure of each data object stored per task

export const Task = Backbone.Model.extend({
  defaults: {
    title: '',
    comments: '',
    completed: false,
    dateCreated: new Date().toISOString(),
  },
  toggle: function () {
    this.save({ completed: !this.get('completed') });
  },
});
