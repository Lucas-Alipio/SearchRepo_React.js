import React from 'react'
import styles from './Styles.module.css'
import {v4 as uuidv4} from 'uuid'

// "repository_url": "https://api.github.com/repos/{owner}/{repo}"

function Search () {

    const [inputValue, setInputValue] = React.useState("")
    const [error, setError] = React.useState(false)
    const [repos, setRepos] = React.useState([])
    

    React.useEffect(() => {
        if(!inputValue) {
            console.log("No input value, returning early")
            return
        }
        
        //make API calss
        fetch("https://api.github.com/repos/" + inputValue)
            .then(response => {
                return response.json()
            })
            .then(repo => {
                if(repo.message !== 'Not Found') {
                    //add new repo to list 'repos'
                    const newRepo = repos.concat({repo, id: uuidv4() })
                    setRepos(newRepo)
                }
                
                //clean inputValue
                setInputValue('')
            }).catch(err => {
                console.log(err)
                setError(true)
            })

    }, [inputValue])

    console.log(repos)

    const searchChange = (evt) => {
        evt.preventDefault()
        setInputValue(evt.target.elements.search.value)
    }

    return (
        <div>
            <form onSubmit={searchChange}>
                <div>
                    <input 
                        type="text" 
                        name="search"
                        placeholder="Digite usuário/nome_do_repositório"/>
                </div>
                <div>
                    <button>Pesquisar</button>
                </div>
            </form>

            {error && (
                <div>
                    Unexpected Error Occurred fetching Data. Please Try Again Later!
                </div>
            )}
            
            <div className={styles.control_list}>
                {repos.map((item) => (
                    <ul>

                        <li key={item.id}>
                            <img src={item.repo.owner.avatar_url} alt='' width='10%' />
                        </li>

                        <li key={item.id}>
                            Repo:{item.repo.name}
                        </li>

                        <li key={item.id}>
                            Descrição:{item.repo.description}
                        </li>

                        <li key={item.id}>
                            Forks:{item.repo.forks}
                        </li>
                    
                    </ul>
                ))}
                
            </div>
        </div>
    )
}

export default Search