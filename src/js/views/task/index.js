const Backbone = require('backbone');
import Template from './template.hbs';
import './styles.scss';

// The task view is rendered each time a task model is created and attached to the DOM

export const TaskView = Backbone.View.extend({
  tagName: 'li',
  template: Template,
  events: {
    'click .toggle': 'toggleComplete',
    'click .delete': 'clear',
    'click .expand': 'expandEdit',
    'click #save-edit': 'updateModel',
  },
  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
  },
  render: function () {
    this.$el.html(this.template(this.model.attributes));
    return this;
  },
  toggleComplete: function () {
    this.model.toggle();
  },
  expandEdit: function () {
    this.$('.edit-wrapper').toggleClass('expand-edit');
  },
  updateModel: function () {
    const title = this.$('#title-edit').val();
    if (!title) return;
    const comments = this.$('#comments-edit').val();
    this.model.save({ title: title, comments: comments });
  },
  clear: function () {
    this.model.destroy();
  },
});
