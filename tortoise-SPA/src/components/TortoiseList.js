import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../bootstrap.css';

class TortoiseList extends Component {
  constructor () {
    super()
    this.state = {
      tortoises: []
    }
  }
  deleteTortoise(id){
    axios.delete('http://localhost:8000/api/tortoises/'+id).then(response => {
        alert("Tortoise has been removed")
        window.location.reload();
    })
  }
  componentDidMount () {
    axios.get('http://localhost:8000/api/tortoises').then(response => {
        this.setState({
        tortoises: response.data
      })
    })
  }

  render () {
    var index = 1;
    const tortoises  = Object.values(this.state.tortoises)
    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <div className='card'>
              <div className='card-header'>Tortoises</div>
              <div className='card-body'>
                <ul className='list-group list-group-flush'>
                {
                  <table>
                    <thead>
                    <tr>
                      <th>#</th>
                      <th>Length</th>
                      <th>Weight</th>
                      <th>Result</th>
                      <th>Min(g)</th>
                      <th>Avg(g)</th>
                      <th>Max(g)</th>
                      <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody style={{display: "table-row-group", "verticalAlign": "middle"}}>
                      {
                      tortoises.map(tortoise => 
                      <tr>
                        <td>{index++}</td>
                        <td>{tortoise.length}</td>
                        <td>{tortoise.weight}</td>
                        <td>{tortoise.result}</td>
                        <td>{tortoise.min}</td>
                        <td>{tortoise.avg}</td>
                        <td>{tortoise.max}</td>
                        <td><button className='btn btn-danger' onClick={()=>this.deleteTortoise(tortoise.id)}>Delete</button></td>
                      </tr>)
                      }
                    </tbody>
                  </table>
                }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TortoiseList