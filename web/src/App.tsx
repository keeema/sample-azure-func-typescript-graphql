import styles from "./App.module.css";
import Todos from "./pages/todo/Todos";

export default function App() {
  return (
    <main className={styles.main}>
      <Todos />
    </main>
  );
}
