export interface Todo {
    title: string;
    completed: boolean;
}

export interface TodoList {
    id?: string;
    name: string;
    color: string;
    todos: Todo[];
}