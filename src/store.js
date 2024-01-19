import create from 'zustand';

let id = 0;
export const useStore = create((set) => ({
  todos: [],
  addTodo: (todo) => set((state) => ({ todos: [...state.todos, { ...todo, id: id++ }] })),
  updateTodo: (id, updatedTodo) =>
    set((state) => ({
      todos: state.todos.map((todo) => (todo.id === id ? { ...todo, ...updatedTodo } : todo)),
    })),
  deleteTodo: (id) => set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) })),
}));