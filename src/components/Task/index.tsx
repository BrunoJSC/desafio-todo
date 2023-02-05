import { useId } from "react";

import { Trash } from "phosphor-react";
import styles from "./Task.module.css";

interface TaskProps {
  id: number;
  value: string;
  checked: boolean;
  onChangeCheckbox: (task: number) => void;
  onHandleDelete: (task: number) => void;
}

export function Task({
  value,
  id,
  checked,
  onHandleDelete,
  onChangeCheckbox,
}: TaskProps) {
  function onDeletedTask(id: number) {
    onHandleDelete(id);
  }

  function onChangebox(id: number) {
    onChangeCheckbox(id);
  }

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="checkbox"
        checked={checked}
        onChange={() => onChangebox(id)}
      />
      <p className={checked === true ? styles.selected : styles.unSelected}>
        {value}
      </p>
      <button onClick={() => onDeletedTask(id)}>
        <Trash size={20} />
      </button>
    </div>
  );
}
