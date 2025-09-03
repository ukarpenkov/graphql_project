import { useState } from "react";
import { Button, FormControl, Input } from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { ADD_TODO } from "../apollo/todos";

const AddTodo = () => {
  const [text, setText] = useState("");
  const [AddTodo, { error }] = useMutation(ADD_TODO);

  const handleAddTodo = () => {
    if (text.trim().length) {
      AddTodo({
        variables: {
          title: text,
          user_id: "123",
          completed: false,
        },
      });
      setText("");
    }
  };

  const handleKey = (event) => {
    if (event.key === "Enter") handleAddTodo();
  };

  if (error) return <h3>Error: {error.message}</h3>;
  return (
    <FormControl display={"flex"} mt={6}>
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleKey}
      />
      <Button onClick={handleAddTodo}>Add todo</Button>
    </FormControl>
  );
};

export default AddTodo;
