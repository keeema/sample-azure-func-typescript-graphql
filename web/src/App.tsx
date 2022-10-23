import Logo from "@/assets/logo.png";
import HelloWorld from "@/components/HelloWorld/HelloWorld";

import styles from "./App.module.css";
import Todos from "./pages/todo/Todos";

export default function App() {
  return (
    <main className={styles.main}>
      <Todos />
    </main>
  );
}
