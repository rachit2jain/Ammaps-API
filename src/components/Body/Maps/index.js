import React, { Component } from 'react';
import AmCharts from "@amcharts/amcharts3-react";
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import {populationFinder} from "../../../api/api"

class Maps extends Component {
    constructor(props){
        super(props);
        this.state = {
            regionFlag:true,
            selectedValue:"",
            chartFlag:false
        }
        this.showChart = this.showChart.bind(this);
    }
    showChart(e){
    //    / console.log(e.mapObject.title);
        populationFinder(e.mapObject.title)
        .then(response=>{
            console.log(response.data.total_population[1].population);
            this.setState({chartFlag:true});
        })
        .catch(error=>{
            console.log(error);
        });
        
    }
    render() {
        var continents = {
            africa: ["AO", "BF", "BI", "BJ", "BW", "CD", "CF", "CG", "CI", "CM", "DJ", "DZ", "EG", "ER", "ET", "GA", "GH", "GM", "GN", "GQ", "GW", "KE", "LR", "LS", "LY", "MA", "MG", "ML", "MR", "MW", "MZ", "NA", "NE", "NG", "RW", "SD", "SL", "SN", "SO", "SS", "SZ", "TD", "TG", "TN", "TZ", "UG", "ZA", "ZM", "ZW", "EH", "KM", "GO", "JU", "SH", "ST", "YT", "BV", "CV", "SC"],
            asia: ["AE", "AF", "BD", "BN", "BT", "CN", "ID", "IL", "IN", "IQ", "IR", "JO", "JP", "KG", "KH", "KP", "KR", "KW", "KZ", "LA", "LB", "LK", "MM", "MN", "MY", "NP", "OM", "PH", "PK", "PS", "QA", "SA", "SY", "TH", "TJ", "TL", "TM", "TW", "UZ", "VN", "YE", "HK", "MV", "BH", "SG"],
            europe: ["AL", "AM", "AT", "AZ", "BA", "BE", "BG", "BY", "CH", "CY", "CZ", "DE", "DK", "EE", "ES", "FI", "FR", "GB", "GE", "GR", "HR", "HU", "IE", "IS", "IT", "LT", "LU", "LV", "MD", "ME", "MK", "NL", "NO", "PL", "PT", "RO", "RS", "SE", "SI", "SJ", "SK", "TR", "UA", "RU", "VA", "MT", "MC", "XK", "LI", "IM", "GI", "FO", "AD", "AX", "GG", "SM"],
            americas: ["BS", "BZ", "CA", "CR", "CU", "DO", "GL", "GT", "HN", "HT", "JM", "MX", "NI", "PA", "PR", "SV", "US", "AG", "AW", "BB", "BL", "GD", "KN", "LC", "MQ", "TC", "VG", "AI", "BM", "DM", "PM", "GP", "KY", "MF", "MS", "SX", "TT", "VC", "VI", "BQ", "CW","AR", "BO", "BR", "CL", "CO", "EC", "FK", "GF", "GY", "PE", "PY", "SR", "UY", "VE", "GS"]
        };
          /**
           * Format areas array for all continents
           */
        var areas = [];
        
        for (var x in continents[this.state.selectedValue]) {
            areas.push({
                id: continents[this.state.selectedValue][x],
                color:"#67b7dc"
            });
        }
        var config = {
            "type": "map",
            "theme": "light",

            "dataProvider": {
                "map": "worldLow",
                "areas":areas
            },
            "areasSettings": {
            "selectable":false,
                "autoZoom": true,
                "selectedColor": "#CC0000"
            },
            "smallMap": {},
            "export": {
                "enabled": true,
                "position": "bottom-right"
            },
            "listeners":[{
                    "event":"clickMapObject",
                    "method": (e)=>{this.showChart(e)}
            }]
        }
        var chartConfig ={
            "type": "gauge",
            "bands": [{
                "color": "#eee",
                "startValue": 0,
                "endValue": 100,
                "radius": "100%",
                "innerRadius": "85%"
            }],
            "allLabels": [{
                "text": "First option",
                "x": "49%",
                "y": "5%",
                "size": 15,
                "bold": true,
                "color": "#84b761",
                "align": "right"
            }]
        }
        var chart = {
            "type": "pie",
            "theme": "light",
            "dataProvider": [ {
              "title": "New",
              "value": 4852
            }, {
              "title": "Returning",
              "value": 9899
            } ],
            
        }
        if(this.state.regionFlag && !this.state.chartFlag){
            return (
                <div>
                    <Select
                        name="form-field-name"
                        value={this.state.selectedValue}
                        onChange={(e) => this.setState({ selectedValue: e ? e.value : "" , regionFlag:0})}
                        options={[
                            { value: 'africa', label: 'Africa' },
                            { value: 'asia', label: 'Asia' },
                            { value: 'americas', label: 'Americas' },
                            { value: 'europe', label: 'Europe' }
                        ]}
                    />
                </div>
            );
        }
        else if(!this.state.regionFlag && !this.state.chartFlag){
            console.log("Fuck me");
            console.log(this.state.selectedValue);
            return (
                <div>
                   <AmCharts.React style={{ width: "100%", height: "500px" }} options={config}/>
                   <h1>Hello</h1>
                </div>    
            );
        }
        else{
            console.log(this.state.selectedValue);
            console.log("Here");
            return (
                <div>
                    <AmCharts.React style={{ width: "100%", height: "500px" }} options={chartConfig}/>
                </div>    
            );
        }
        
    }
}
export default Maps;