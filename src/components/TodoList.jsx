import { VStack } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";

import TodoItem from "./TodoItem";
import TotalCount from "./TotalCount";
import { useQuery } from "@apollo/client";
import { ALL_TODOS } from "../apollo/todos";

const TodoList = () => {
  const { loading, error, data } = useQuery(ALL_TODOS);

  if (loading) return <Spinner />;
  if (error) return <h3>Error: {error.message}</h3>;

  return (
    <>
      <VStack spacing={2} mt={4}>
        {data.todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </VStack>
      <TotalCount />
    </>
  );
};

export default TodoList;
