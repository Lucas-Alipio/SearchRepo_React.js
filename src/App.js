import Search from './components/Search'
import styles from './components/Styles.module.css'
import logo from './images/explore.png'


function App() {
  return (
    <div className={styles.control}>
      <div className={styles.control_logo}>
        <img src={logo} alt="logo" width="300px"/>
      </div>
      <div>
        <h1>Procure Repositórios no GitHub.</h1>
      </div>
      <Search />
    </div>

  )
}

export default App;