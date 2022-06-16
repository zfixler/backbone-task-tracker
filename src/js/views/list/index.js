import Backbone from 'backbone';
import ListTemplate from './template.hbs';
import { TaskView } from '../task';
import './styles.scss';

// The list view is rendered to #root and renders based upon the collection

export const TaskListView = Backbone.View.extend({
  el: '#root',
  template: ListTemplate,
  initialize: function () {
    this.listenTo(this.collection, 'sync change', this.render);
  },
  render: function () {
    this.$el.html(this.template());
    this.input = this.$('#task-input');

    const list = this.$('#task-list').empty();
    const completedList = this.$('#task-list-completed').empty();

    this.collection.each((model) => {
      const view = new TaskView({ model: model });

      // If a task is completed, prepend to completedList
      if (model.get('completed')) {
        completedList.prepend(view.render().el);
        return;
      }

      list.prepend(view.render().el);
    });
  },
  events: {
    'click #task-save': 'createOnClick',
    'keypress #task-input': 'createOnEnter',
  },
  createOnEnter: function (e) {
    if (!this.input.val()) return;
    if (e.keyCode !== 13) return;
    this.collection.create({ title: this.input.val() });
    this.input.val('');
  },
  createOnClick() {
    if (!this.input.val()) return;
    this.collection.create({ title: this.input.val() });
    this.input.val('');
  },
});
