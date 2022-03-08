import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

export default function App() {
  const [fetchedData, setFetchedData] = useState({})
  const [searchKeyword, setSearchKeyword] = useState('')
  const [filteredArray, setFilteredArray] = useState([])

  useEffect(() => {
    axios
      .get('https://api.publicapis.org/categories')
      .then(res => {
        setFetchedData(res.data)
      })
      .catch(err => {
        console.log(err)
        alert('Data fetching is not successful..')
      })
  }, [])

  useEffect(() => {
    const filteredDataArray = searchKeyword
      ? fetchedData?.categories?.filter(data => {
          return data.toLowerCase().includes(searchKeyword.toLowerCase())
        })
      : [...(fetchedData?.categories || [])]

    setFilteredArray(filteredDataArray)
  }, [searchKeyword, fetchedData])

  return (
    <div className="App">
      <div className="keyword-container">
        <div>Search keyword: </div>
        <div>
          <input
            onChange={e => {
              setSearchKeyword(e.target.value)
            }}
          />
        </div>
      </div>
      <div>
        {filteredArray.length ? (
          <table>
            <th>Categories</th>
            {filteredArray?.map(category => {
              return (
                <tr>
                  <td>{category}</td>
                </tr>
              )
            })}
          </table>
        ) : (
          <td>..No matched entry</td>
        )}
      </div>
    </div>
  )
}
