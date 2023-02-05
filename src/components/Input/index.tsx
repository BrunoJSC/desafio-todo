import styles from "./Input.module.css";

import { ClipboardText, PlusCircle } from "phosphor-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Task } from "../Task";

interface InputProps {
  id: number;
  value: string;
  isSelected: boolean;
}

export function Input() {
  const taskId = Math.random() * 1000;
  const [tasks, setTasks] = useState<InputProps[]>([]);
  const [text, setText] = useState<string>("");

  function handleNewTask(event: ChangeEvent<HTMLInputElement>) {
    console.log(setText(event.target.value));
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const newTask: InputProps = {
      id: taskId,
      value: text,
      isSelected: false,
    };
    setTasks([...tasks, newTask]);
    window.localStorage.setItem("@app", JSON.stringify([...tasks, newTask]));
    setText("");
  }

  function onHandleDeleteTask(taskId: number) {
    const removeTask = tasks.filter((task) => task.id !== taskId);

    setTasks(removeTask);
  }

  function handleOnChange(taskId: number) {
    const completed = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          isSelected: !task.isSelected,
        };
      }
      return task;
    });
    setTasks(completed);
  }

  const sum = tasks.reduce(
    (acc: number, currentValue: InputProps) => (acc += currentValue.isSelected),
    0
  );

  useEffect(() => {
    const data = window.localStorage.getItem("@app");
    if (data !== null) {
      setTasks(JSON.parse(data));
      console.log(data);
    }
  }, []);

  // useEffect(() => {}, [tasks]);

  return (
    <>
      <form className={styles.box}>
        <input
          className={styles.input}
          value={text}
          onChange={handleNewTask}
          placeholder="Adicione uma nova tarefa"
        />

        <button onClick={handleSubmit} className={styles.button} type="submit">
          Criar
          <PlusCircle size={20} color="#fff" />
        </button>
      </form>
      <div className={styles.container}>
        <header>
          <div className={styles.create}>
            <strong>Tarefas criadas</strong>
            <span>{tasks.length}</span>
          </div>

          <div className={styles.done}>
            <strong>Concluídas</strong>
            <span>{`${sum} de ${tasks.length}`}</span>
          </div>
        </header>

        <div className={styles.boxTask}>
          {tasks.length > 0 ? (
            tasks.map((task) => {
              return (
                <Task
                  key={task.id}
                  id={task.id}
                  checked={task.isSelected}
                  value={task.value}
                  onChangeCheckbox={() => handleOnChange(task.id)}
                  onHandleDelete={onHandleDeleteTask}
                />
              );
            })
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <ClipboardText size={80} color="#333" />
              <h1>Você ainda não tem tarefas cadastradas</h1>

              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
