import React    from "react"
import Actions  from "../Actions"
import Address  from "./AddressLine"
import { pure } from "recompose"

import { NAMES, CSS_CLASSES } from "../constants/Categories"

const ResultListElement = ({highlight, entry, onClick, onMouseEnter, onMouseLeave}) => {
  var clz = highlight ? 'highlight-entry ' : '';
  clz = clz + CSS_CLASSES[entry.categories && entry.categories[0]];
  return (
    <li
      className     = { clz }
      onClick       = { (ev) => { ev.preventDefault(); onClick(entry.id) }}
      onMouseEnter  = { (ev) => { ev.preventDefault(); onMouseEnter(entry.id) }}
      onMouseLeave  = { (ev) => { ev.preventDefault(); onMouseLeave(entry.id) }} >
      <div className = "pure-g">
        <div className = "pure-u-23-24">
          <div>
            <span className="category">
              { NAMES[entry.categories && entry.categories[0]] }
            </span>
          </div>
          <div>
            <span className="title">{entry.title}</span>
          </div>
          <div>
            <span className= "subtitle">{entry.description}</span>
          </div>
          { (entry.street || entry.zip || entry.city)
              ? <Address { ...entry } />
              : null
          }
          {
            (entry.tags.length > 0)
              ? <div className="tags">
                  <ul >
                  { entry.tags.map(t => <li>{t}</li>) }
                  </ul>
                </div>
              : null
          }
        </div>
        <div className = "pure-u-1-24 chevron">
          <i className = "fa fa-chevron-right" />
        </div>
      </div>
    </li>)
}

const ResultList = ({ entries, highlight, onClick, onMouseEnter, onMouseLeave}) => {
  const results = entries.map( e =>
    <ResultListElement
      entry        = { e            }
      key          = { e.id         }
      highlight    = { highlight.indexOf(e.id) >= 0 }
      onClick      = { onClick      }
      onMouseEnter = { onMouseEnter }
      onMouseLeave = { onMouseLeave } />)
  return ( 
    <div className= "result-list">
    {
      (results.length > 0)
        ? <ul>{results}</ul>
        : <p className= "no-results">
            <i className= "fa fa-frown-o" />
            <span>Es konnten keine Einträge gefunden werden</span>
          </p>
    }
    </div>)
}

module.exports = pure(ResultList)
