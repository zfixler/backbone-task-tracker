import { TaskList } from './collections/TaskList';
import { TaskListView } from './views/list';
import '../sass/main.scss';

const List = new TaskList();
const App = new TaskListView({collection: List});

List.fetch();