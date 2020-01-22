import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class AdminPanel extends Component {
    handleGetAllSpan=()=>{
        document.querySelectorAll('span').forEach(el=>{
           console.log(el.textContent)
        })
    }


    handleSendEnglishData = (contentObj) => {

        let translateObj = {}
        let count = 0
        for (let [key, val] of Object.entries(contentObj)) {
            let inputValue = document.querySelectorAll('input')[count].value
            count += 1
            translateObj[key] = inputValue
        }
        fetch('/sendEnglishData', {
            method: "POST",
            headers: new Headers({ "Content-type": "application/json" }),
            body: JSON.stringify(translateObj)
        })

    }

  

    handleSendRussianData = (contentObj) => {
        let translateObj = {}
        let count = 0
        for (let [key, val] of Object.entries(contentObj)) {
            let inputValue = document.querySelectorAll('input')[count].value
            count += 1
            translateObj[key] = inputValue
        }

        fetch('/sendRussianData', {
            method: "POST",
            headers: new Headers({ "Content-type": "application/json" }),
            body: JSON.stringify(translateObj)
        })
    }

    render() {

        const texts = this.props.bigObj
        const virtualTexts = this.props.virtualBigObj
        const adminPanelContent = [];

        for (let [key, val] of Object.entries(virtualTexts)) {
            let textsValue = texts[key]
            let textsValueArr = textsValue.split(' ')
            let textWithoutNoClosedTags = val.split(' ')
            textsValueArr.forEach(element => {
                if (element === "") {
                    textsValueArr.splice(textsValueArr.indexOf(element), 1)
                }
            });
            textWithoutNoClosedTags.forEach(element => {
                if (element === "") {
                    textWithoutNoClosedTags.splice(textWithoutNoClosedTags.indexOf(element), 1)
                }
            });
            if (textWithoutNoClosedTags === textsValueArr) {
                adminPanelContent.push(
                    <div className="input-group input-group-sm mb-3" key={key}>
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-sm">{val}</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                    </div>
                )
            }
            else {
                textsValueArr.forEach(element => {
                    if (textWithoutNoClosedTags[textsValueArr.indexOf(element)] !== element && textWithoutNoClosedTags[textsValueArr.indexOf(element) + 1] !== textsValueArr[textsValueArr.indexOf(element) + 1]) {
                        textsValueArr.splice(textsValueArr.indexOf(element), 1)
                    }
                })
                let arraysCount = 0
                let changedValArr = []
                let smallArrs = []

                textsValueArr.forEach(element => {
                    let index = textsValueArr.indexOf(element)
                    if (element.slice(-1) === '0') {
                        changedValArr.push(smallArrs)
                        smallArrs = []
                        smallArrs.push(element)
                        changedValArr.push(smallArrs)
                        smallArrs = []
                    }
                    else {
                        smallArrs.push(element)
                        if (index === textsValueArr.length - 1) {
                            changedValArr.push(smallArrs)
                        }

                    }
                })
                let arrForVal = []
                changedValArr.forEach(element=>{
                    if(element.length===1 && element[0].slice(-1)==='0'){
                        let tag =()=>{
                            // let tagVal = document.createElement(element[0].slice(0,element.length-2))
                            // let tagText = document.createTextNode(textWithoutNoClosedTags[textsValueArr.indexOf(element)])
                            // tagVal.appendChild(tagText)
                            // tagVal.style.color = "red"
                            // return tagVal
                            return React.createElement(
                                `strong`,
                                {
                                    className:"another"
                                },
                                textWithoutNoClosedTags[textsValueArr.indexOf(element[0])]
                            )
                            
                        }
                        arrForVal.push(tag())
                    }
                    else{
                        let tag =()=>{
                                
                            // let tagVal = document.createElement(element[0].slice(0,element.length-2))
                            // let tagText = document.createTextNode(textWithoutNoClosedTags[textsValueArr.indexOf(element)])
                            // tagVal.appendChild(tagText)
                            // tagVal.style.color = "red"
                            // return tagVal
                            return React.createElement(
                                'p',
                                {
                                    className:"any"
                                },
                                element.join(' ')
                            )
                            
                        }
                        arrForVal.push(tag())
                    }
                })
           
                adminPanelContent.push(
                    <div className="input-group input-group-sm mb-3" key={key}>
                    <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-sm"> {arrForVal} </span>
                    </div>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
                )

            }
        }
let arr = []
let div = document.createElement('div');
let text = document.createTextNode("Any")
div.appendChild(text)
let a = div
let any = ()=>{
    return (
        {a}
    )
}
arr.push(any())

arr.push(document.createElement('div').appendChild(document.createTextNode("Any")))





        return (
            <div>
                {adminPanelContent}
                <button className="btn btn-success" onClick={() => { this.handleSendEnglishData(texts) }}>Translate to english</button>
                <button className="btn btn-success" style={{ margin: "20px" }} onClick={() => { this.handleSendRussianData(texts) }}>Translate to russian</button>
                <Link to='/main'><button className="btn btn-success"> Go to main page </button></Link>
                <button onClick={()=>{this.handleGetAllSpan()}}>GetSpans</button>
            </div>
        )
    }
}