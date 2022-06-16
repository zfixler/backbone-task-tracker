import Backbone from 'backbone';
import { Task } from '../models/Task';

// Collection is a group of models with a defined API endpoint

export const TaskList = Backbone.Collection.extend({
  model: Task,
  url: '/api/tasks',
});
