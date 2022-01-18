import * as React from 'react';

import { PropertyPanePortal } from 'property-pane-portal';

import { ICustomPropertyPaneProps } from './ICustomPropertyPaneProps';
import { Provider, teamsTheme, teamsDarkTheme, teamsHighContrastTheme, FormDatepicker, FormSlider, FormDropdown, FormRadioGroup, OneDriveIcon, TeamsIcon, YammerIcon, PowerPointIcon, WordIcon, ExcelIcon } from '@fluentui/react-northstar';

import { SunIcon, MoonIcon } from './SVGIcons';

import './CheckboxDarkLight.css';
import './fieldset.css';
import './select-css.css';

export const CustomPropertyPane: React.FunctionComponent<ICustomPropertyPaneProps> = (props) => {

  // Teams themes
  let currentTheme;

  switch (props.properties["fieldsetCheckboxDarkLight"]) {
    case false: currentTheme = teamsTheme; break;
    case true: currentTheme = teamsDarkTheme; break;
    // case "Contrast": currentTheme = teamsHighContrastTheme; break;
    default: currentTheme = teamsTheme;
  }

  const familiesList = [
    { name: "Office", value: 'Office' },
    { name: "M365", value: 'M365' }
  ];
  const appsList = [
    { name: "Teams", value: 'Teams', parent: "M365" },
    { name: "OneDrive", value: 'OneDrive', parent: "M365" },
    { name: "Yammer", value: 'Yammer', parent: "M365" },
    { name: "Excel", value: 'Excel', parent: "Office" },
    { name: "PowerPoint", value: 'PowerPoint', parent: "Office" },
    { name: "Word", value: 'Word', parent: "Office" }
  ];

  return (
    <Provider theme={currentTheme}>
      <PropertyPanePortal context={props.context}>
        <fieldset data-property="fieldsetColorInput" >
          <label>Color Input</label>
          <div className="flexControl">
            <input
              type="color"
              value={props.properties["fieldsetColorInput"]}
              onChange={(e: any) => props.updateWebPartProperty("fieldsetColorInput", e.target.value)}
              onInput={(e: any) => props.updateWebPartProperty("fieldsetColorInput", e.target.value)}
            ></input>
            <text>
              &ensp;{props.properties["fieldsetColorInput"]}
            </text>
          </div>
        </fieldset>
        <fieldset data-property="fieldsetDatesInput" >
          <label>Date Input (Start, End)</label>
          <div className="flexControl">
            <input
              type="date"
              value={(props.properties["fieldsetDatesInput"]) ? props.properties["fieldsetDatesInput"][0] : ""}
              max={(props.properties["fieldsetDatesInput"]) ? props.properties["fieldsetDatesInput"][1] : ""}
              onChange={(e: any) => e.target.checkValidity() && props.updateWebPartProperty("fieldsetDatesInput", [e.target.value, props.properties["fieldsetDatesInput"][1]])}
            ></input>
            <input
              type="date"
              value={(props.properties["fieldsetDatesInput"]) ? props.properties["fieldsetDatesInput"][1] : ""}
              min={(props.properties["fieldsetDatesInput"]) ? props.properties["fieldsetDatesInput"][0] : ""}
              onChange={(e: any) => e.target.checkValidity() && props.updateWebPartProperty("fieldsetDatesInput", [props.properties["fieldsetDatesInput"][0], e.target.value])}
            ></input>
          </div>
        </fieldset>
        <fieldset data-property="fieldsetRangeInput" >
          <label>Range Input</label>
          <input
            type="range"
            value={(props.properties["fieldsetRangeInput"]) ? props.properties["fieldsetRangeInput"] : null}
            onChange={(e: any) => props.updateWebPartProperty("fieldsetRangeInput", e.target.value)}
            onInput={(e: any) => props.updateWebPartProperty("fieldsetRangeInput", e.target.value)}
          ></input>
        </fieldset>
        <fieldset data-property="fieldsetURLInput" >
          <label>SharePoint Online Site URL</label>
          <input
            type="url"
            value={(props.properties["fieldsetURLInput"]) ? props.properties["fieldsetURLInput"] : null}
            placeholder="https://tenant.sharepoint.com/sites/name"
            pattern="https://.*\.sharepoint.com/sites/.+"
            onChange={(e: any) => e.target.checkValidity() && props.updateWebPartProperty("fieldsetURLInput", e.target.value)}
          ></input>
        </fieldset>
        <fieldset data-property="fieldsetCheckboxDarkLight" >
          <label>Checkbox as Toggle Button</label>
          <label className="flexControl">
            <input
              type="checkbox"
              checked={props.properties["fieldsetCheckboxDarkLight"]}
              onChange={(e: any) => props.updateWebPartProperty("fieldsetCheckboxDarkLight", e.target.checked)}
            ></input>
            <div>
              <span>
              </span>
              <div>
                <SunIcon />
                <MoonIcon />
              </div>
            </div>
            <text>
              &ensp;{(props.properties["fieldsetCheckboxDarkLight"]) ? "Light" : "Dark"} Mode
            </text>
          </label>
        </fieldset>
        <fieldset data-property="fieldsetCheckbox" >
          <label>Checkbox</label>
          <div className="flexControl">
            <input
              type="checkbox"
              checked={props.properties["fieldsetCheckbox"]}
              onChange={(e: any) => props.updateWebPartProperty("fieldsetCheckbox", e.target.checked)}
            ></input>
            <span>
              &ensp;{(props.properties["fieldsetCheckbox"]) ? "Checked" : "Unchecked"}
            </span>
          </div>
        </fieldset>
        <fieldset data-property="fieldsetCascadingSelect" >
          <label>Cascading Select</label>
          <div className="flexControl">
            <select
              className='select-css'
              value={props.properties["fieldsetCascadingSelect"][0]}
              onChange={(e: any) => {
                props.updateWebPartProperty("fieldsetCascadingSelect", [e.target.value, ""]);
              }
              }
            >
              <option value="">Select Family...</option>
              {familiesList
                .map(item => <option value={item.value}>{item.name}</option>)}
            </select>
            <select
              className='select-css'
              value={props.properties["fieldsetCascadingSelect"][1]}
              onChange={(e: any) => props.updateWebPartProperty("fieldsetCascadingSelect", [props.properties["fieldsetCascadingSelect"][0], e.target.value])}
            >
              <option value="">Select App...</option>
              {(props.properties["fieldsetCascadingSelect"]) && appsList
                .filter(i => i.parent == props.properties["fieldsetCascadingSelect"][0])
                .map(item => <option value={item.value}>{item.name}</option>)}
            </select>
          </div>
        </fieldset>
      </PropertyPanePortal>
    </Provider>
  );
};