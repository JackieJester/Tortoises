import axios from 'axios'
import React, { Component } from 'react'

var bigdecimal = require("bigdecimal");

    class NewTortoise extends Component {
      constructor (props) {
        super(props)
        this.state = {
          length: '',
          weight: '',
          errors: []
        }
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleCreateNewTortoise = this.handleCreateNewTortoise.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
      }

       factors = {
        min: {
            mult: '0.3625',
            exp: '2.6425',
        },
        max: {
            mult: '0.3354',
            exp: '2.7976',
        },
        avg: {
            mult: '0.3424',
            exp: '2.7315',
        }
    };
    
     factorize(l, mult, exp) {
        return (
            new bigdecimal.BigDecimal(mult)
                .multiply(new bigdecimal.BigDecimal(
                    Math.pow(
                        l,
                        exp
                    )
                ))
        ).toString();
    }
    
     computeFactors(length) {
        let l = parseFloat(length);
        let min = this.factorize(l, this.factors.min.mult, this.factors.min.exp)
        let max = this.factorize(l, this.factors.max.mult, this.factors.max.exp)
        let avg = this.factorize(l, this.factors.avg.mult, this.factors.avg.exp)
        // console.log('called compute factors', {l, min, max, avg});
    
        return { min, max, avg };
    }
    
     testos(length, weight) {
        let { min, max, avg } = this.computeFactors(length)
    
        let resultMap = ['UNDERWEIGHT', 'OPTIMAL WEIGHT','ABOVE OPTIMAL WEIGHT', 'OVERWEIGHT']

        let w = parseFloat(weight)
        var resultString = ""
        if (w < parseFloat(min)) {
          resultString = resultMap[0]
        }

        else if (w <= parseFloat(avg)) {
          resultString = resultMap[1]
        }
    
        else if (w <= parseFloat(max)) {
          resultString = resultMap[2]
        }
    
        else 
          {resultString = resultMap[3]}
      return {"result": resultString, "min": min,"max": max,"avg": avg}
    }

      handleFieldChange (event) {
        this.setState({
          [event.target.name]: event.target.value
        })
      }


      handleCreateNewTortoise (event) {
        event.preventDefault()

        var tortoiseData = this.testos(this.state.length, this.state.weight)
        console.log(tortoiseData)
        const tortoise = {
          length: this.state.length,
          weight: this.state.weight,
          result: tortoiseData.result,
          min: tortoiseData.min,
          avg: tortoiseData.avg,
          max: tortoiseData.max
        }
        console.log(tortoise)
        if (window.confirm(tortoise.result))
            {
              window.location.href = "/show";
            }
        axios.post('http://localhost:8000/api/tortoises', tortoise)
          .then(response => {
           console.log(response)
          })
          .catch(error => {
            this.setState({
              errors: error.response.data.errors
            })
          })
      }

      hasErrorFor (field) {
        return !!this.state.errors[field]
      }

      renderErrorFor (field) {
        if (this.hasErrorFor(field)) {
          return (
            <span className='invalid-feedback'>
              <strong>{this.state.errors[field][0]}</strong>
            </span>
          )
        }
      }

      render () {
        return (
          <div className='container py-4'>
            <div className='row justify-content-center'>
              <div className='col-md-6'>
                <div className='card'>
                  <div className='card-header'>Add a new tortoise</div>
                  <div className='card-body'>
                    <form onSubmit={this.handleCreateNewTortoise}>
                      <div className='form-group'>
                        <label htmlFor='length'>Length</label>
                        <input
                          id='length'
                          type='text'
                          className={`form-control ${this.hasErrorFor('length') ? 'is-invalid' : ''}`}
                          name='length'
                          value={this.state.length}
                          onChange={this.handleFieldChange}
                        />
                        {this.renderErrorFor('length')}
                      </div>
                      <div className='form-group'>
                        <label htmlFor='weight'>Weight</label>
                        <input
                          id='weight'
                          className={`form-control ${this.hasErrorFor('weight') ? 'is-invalid' : ''}`}
                          name='weight'
                          rows='10'
                          value={this.state.weight}
                          onChange={this.handleFieldChange}
                        />
                        {this.renderErrorFor('weight')}
                      </div>
                      <button className='btn btn-primary'>Add</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    }

    export default NewTortoise