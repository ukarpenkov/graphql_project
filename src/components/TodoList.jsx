import { VStack } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";

import TodoItem from "./TodoItem";
import TotalCount from "./TotalCount";
import { useMutation, useQuery } from "@apollo/client";
import { ALL_TODOS, REMOVE_TODO, UPDATE_TODO } from "../apollo/todos";

const TodoList = () => {
  const { loading, error, data } = useQuery(ALL_TODOS);
  const [toggleTodo, { error: updateError }] = useMutation(UPDATE_TODO);
  const [removeTodo, { error: removeError }] = useMutation(REMOVE_TODO, {
    update(cache, { data: { removeTodo } }) {
      const { todos } = cache.readQuery({ query: ALL_TODOS });
      cache.writeQuery({
        query: ALL_TODOS,
        data: { todos: todos.filter((t) => t.id !== removeTodo.id) },
      });
    },
  });

  if (loading) return <Spinner />;
  if (error) return <h3>Error: {error.message}</h3>;

  return (
    <>
      <VStack spacing={2} mt={4}>
        {data.todos.map((todo) => (
          <TodoItem
            key={todo.id}
            {...todo}
            onToggle={toggleTodo}
            onDelete={removeTodo}
          />
        ))}
      </VStack>
      <TotalCount />
    </>
  );
};

export default TodoList;
